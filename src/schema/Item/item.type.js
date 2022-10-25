const { gql } = require("graphql-modules");

const Item = gql`
  scalar Date

  type Item {
    id: Int
    name: String
    image: String
    price: Int
    categoryId: Int
    Category: Category
    # OrderItems: [OrderItems]
    createdAt: Date
    updatedAt: Date
  }

  type ItemResponse {
    status: Boolean
    message: String
    data: Item
    error: String
  }

  type ItemArrayResponse {
    status: Boolean
    message: String
    data: [Item]
    error: String
  }

  input where {
    categoryId: Int
  }

  type Query {
    getAllItems(where: where): ItemArrayResponse
    getItemById(id: Int!): ItemResponse
  }

  type Mutation {
    addNewItem(name: String!, image: String!, price: Int!, categoryId: Int!): ItemResponse
    updateItem(id: Int!, name: String, image: String, price: Int, categoryId: Int): ItemResponse
    deleteItem(id: Int!): ItemResponse
  }
`;

module.exports = {
  Item,
};
