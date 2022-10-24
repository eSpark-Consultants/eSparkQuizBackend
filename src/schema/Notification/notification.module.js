const { createModule } = require('graphql-modules');
const { NotificationResolver } = require('./notification.resolver');
const { Notification } = require('./notification.type');

const NotificationModule = createModule({
  id: 'notification-module',
  dirname: __dirname,
  typeDefs: [Notification],
  resolvers: [NotificationResolver]
});

module.exports = {
  NotificationModule
}
