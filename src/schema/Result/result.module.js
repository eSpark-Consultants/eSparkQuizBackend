const { createModule } = require('graphql-modules');
const { ResultResolver } = require('./result.resolver');
const { Result } = require('./result.type');

const ResultModule = createModule({
  id: 'result-module',
  dirname: __dirname,
  typeDefs: [Result],
  resolvers: [ResultResolver]
});

module.exports = {
  ResultModule
}
