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
    OrderItems: [OrderItems]
  }

  type OrderSummary {
    item: Item
    itemId: Int
    quantity: Int
  }

  type OrderItems {
    id: Int
    itemId: Int
    orderId: Int
    Order: Order
    quantity: Int
    amount: Float
    Item: Item
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

  type OrderSummaryArrayResponse {
    status: Boolean
    message: String
    data: [OrderSummary]
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
    createdAt: Date
    status: ORDER_STATUS
  }
  type Query {
    getAllOrders(GetOrderInput: GetOrderInput): OrderArrayResponse
    getOrderById(id: Int!): OrderResponse
    getCurrentRemainingAmount: OrderResponse
    getOrderSummary(date: Date): OrderSummaryArrayResponse
  }

  type Mutation {
    createOrder(input: OrderInput!): OrderResponse
    updateOrder(
      id: Int!
      status: ORDER_STATUS!
      paidAmount: Int!
    ): OrderResponse
  }

  enum ORDER_STATUS {
    PAID
    UNPAID
  }
`;

module.exports = {
  Order,
};
