require("dotenv").config();
const admin = require("firebase-admin");

const Notification = {
  async send(usertokens, data, title, description) {
    console.log("usertokens, data, title, description", usertokens, data, title, description)
    const message = {
      notification: { title: title, body: description },
      data: data,
      tokens: usertokens,
    };
    try {
      const result = await admin.messaging().sendMulticast(message);
      console.log("result SendNotificationToMutliUsers", result);
    } catch (error) {
      console.log("error  SendNotificationToMutliUsers", error);
    }
  },
};


module.exports = Notification;
