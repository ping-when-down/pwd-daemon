"use strict";

/* * * * * */
/* NOTIFICATIONS */
/* * */

/* * */
/* IMPORTS */
const config = require("config");
const logger = require("./logger");
const PushNotifications = require("@pusher/push-notifications-server");

exports.notify = async (host, title, body) => {
  // Setup instance
  const pushNotifications = new PushNotifications({
    instanceId: config.get("pusher-instance-id"),
    secretKey: config.get("pusher-secret-key"),
  });

  // Notify
  await pushNotifications
    .publishToInterests([host], {
      apns: {
        aps: {
          alert: {
            title: title,
            body: body ? body : "",
          },
          badge: 0,
          sound: "default",
        },
      },
      fcm: {
        notification: {
          title: "Hello",
          body: "Hello, world!",
        },
      },
    })
    .then((publishResponse) => {
      logger("Notification sent (id: ", publishResponse.publishId + ")");
    })
    .catch((error) => {
      logger("Error:", error);
    });
};
