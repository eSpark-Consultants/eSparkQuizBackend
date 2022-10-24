
const { createModule } = require('graphql-modules');
const { UserResolver } = require('./user.resolver');
const { User } = require('./user.type');

const UserModule = createModule({
  id: 'user-module',
  dirname: __dirname,
  typeDefs: [User],
  resolvers: [UserResolver]
});


module.exports = {
    UserModule
}
