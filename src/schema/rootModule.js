const { createApplication } = require('graphql-modules');
const { ResultModule } = require('./Result/result.module');
const { UserModule } = require('./User/user.module')

const application = createApplication({
  modules: [
      UserModule,
      ResultModule
      // NotificationModule,
  ],
});

module.exports = {
    application
}
