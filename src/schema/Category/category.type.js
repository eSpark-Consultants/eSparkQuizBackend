const { gql } = require("graphql-modules");

const Category = gql`
  scalar Date

  type Category {
    id: Int
    name: String
    image: String
    Item: [Item]
    createdAt: Date
    updatedAt: Date
  }

  type CategoryResponse {
    status: Boolean
    message: String
    data: Category
    error: String
  }

  type CategoryArrayResponse {
    status: Boolean
    message: String
    data: [Category]
    error: String
  }

  type Query {
    getAllCategories: CategoryArrayResponse
    getCategoryById(id: Int!): CategoryResponse
  }

  type Mutation {
    addNewCategory(name: String!, image: String!): CategoryResponse
    updateCategory(id: Int!, name: String, image: String): CategoryResponse
    deleteCategory(id: Int!): CategoryResponse
  }
`;

module.exports = {
  Category,
};
