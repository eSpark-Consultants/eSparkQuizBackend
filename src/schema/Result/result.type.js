const { gql } = require("graphql-modules");

const Result = gql`
  # scalar JSON
  # scalar JSONObject

  type Result {
    id: Int
    userId: Int
    User: User
    totalScore: Int
    questions: [Question]
    createdAt: Date
    updatedAt: Date
  }

  type Question {
    question: String
    options: [String]
    answer: String
    selectedAnswer: String
  }

  type ResultArrayResponse {
    status: Boolean
    message: String
    data: [Result]
    error: String
  }

  type ResultResponse {
    status: Boolean
    message: String
    data: Result
    error: String
  }

  input where {
    userId: Int
  }

  input QuestionInput {
    question: String
    options: [String]
    answer: String
    selectedAnswer: String
  }
  type Query {
    getAllResults(where: where): ResultArrayResponse
    getOneResult(id: Int): ResultResponse
  }

  type Mutation {
    createResult(
      userId: Int!
      # totalScore: Int!
      questions: [QuestionInput!]!
    ): ResultResponse
  }
`;

module.exports = {
  Result,
};
