const { createModule } = require('graphql-modules');
const { ItemResolver } = require('./item.resolver');
const { Item } = require('./item.type');


const ItemModule = createModule({
  id: 'item-module',
  dirname: __dirname,
  typeDefs: [Item],
  resolvers: [ItemResolver]
});


module.exports = {
    ItemModule
}
