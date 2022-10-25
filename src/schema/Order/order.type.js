const { gql } = require("graphql-modules");

const Order = gql`
  scalar Date

  type Order {
    id: Int
    userId: Int
    totalAmount: Float
    User: User
    status: ORDER_STATUS
    paidAmount: Int
    remainingAmount: Int
    createdAt: Date
    updatedAt: Date
    Items: [OrderItems]
  }

  enum ORDER_STATUS {
    PAID
    UNPAID
  }

  type OrderItems {
    id: Int
    itemId: Int
    orderId: Int
    Order: Order
    quantity: Int
    amount: Float
    Items: Item
    note: String
    createdAt: Date
    updatedAt: Date
  }

  type OrderResponse {
    status: Boolean
    message: String
    data: Order
    error: String
  }

  type OrderArrayResponse {
    status: Boolean
    message: String
    data: [Order]
  }

  input OrderInput {
    userId: Int
    totalAmount: Float
    items: [OrderItemInput]
  }

  input OrderItemInput {
    itemId: Int!
    quantity: Int!
    amount: Float!
    note: String
  }
  input GetOrderInput {
    userId: Int
  }
  type Query {
    getAllOrders(GetOrderInput: GetOrderInput): OrderArrayResponse
    getOrderById(id: Int!): OrderResponse
  }

  type Mutation {
    createOrder(input: OrderInput!): OrderResponse
    updateOrder(id: Int!, status: ORDER_STATUS!, paidAmount: Int!): OrderResponse
  }
`;

module.exports = {
  Order,
};
