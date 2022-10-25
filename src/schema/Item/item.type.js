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
`;

module.exports = {
  Item,
};
