const { createApplication } = require('graphql-modules');
const { UserModule } = require('./User/user.module')
const {NotificationModule} = require("./Notification/notification.module");
const { CategoryModule } = require('./Category/category.module');
const { ItemModule } = require('./Item/item.module');

const application = createApplication({
  modules: [
      UserModule,
      CategoryModule,
      ItemModule
      // NotificationModule,
  ],
});

module.exports = {
    application
}
