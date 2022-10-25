
const { createModule } = require('graphql-modules');
const { orderResolver } = require('./order.resolver');
const { Order } = require('./order.type');

const OrderModule = createModule({
  id: 'order-module',
  dirname: __dirname,
  typeDefs: [Order],
  resolvers: [orderResolver]
});


module.exports = {
  OrderModule
}
