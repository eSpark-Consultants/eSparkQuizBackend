const { createApplication } = require('graphql-modules');
const { UserModule } = require('./User/user.module')
const {NotificationModule} = require("./Notification/notification.module");

const application = createApplication({
  modules: [
      UserModule,
      // NotificationModule,
  ],
});

module.exports = {
    application
}
