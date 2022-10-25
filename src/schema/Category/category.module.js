const { createModule } = require('graphql-modules');
const { CategoryResolver } = require('./category.resolver');
const { Category } = require('./category.type');


const CategoryModule = createModule({
  id: 'category-module',
  dirname: __dirname,
  typeDefs: [Category],
  resolvers: [CategoryResolver]
});


module.exports = {
    CategoryModule
}
