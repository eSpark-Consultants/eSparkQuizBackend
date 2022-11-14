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
    amount: Int
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

  type OrderOverview {
    createdAt: Date
    rider: User
    totalOrders: Int
    totalAmount: Int
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
    totalAmount: Int
  }

  type OrderOverviewArrayResponse {
    status: Boolean
    message: String
    data: [OrderOverview]
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

  input updateOrderInput {
      id: Int!
      status: ORDER_STATUS!
      paidAmount: Int!
      riderId: Int!
  }
  type Query {
    getAllOrders(GetOrderInput: GetOrderInput): OrderArrayResponse
    getOrderById(id: Int!): OrderResponse
    getCurrentRemainingAmount(userId: Int!): OrderResponse
    getOrderSummary(date: Date): OrderSummaryArrayResponse
    getOrderOverviewByDate(startDate: Date!, endDate: Date!): OrderOverviewArrayResponse
  }

  type Mutation {
    createOrder(input: OrderInput!): OrderResponse
    updateOrder(input: [updateOrderInput]): OrderResponse
  }

  enum ORDER_STATUS {
    PAID
    UNPAID
  }
`;

module.exports = {
  Order,
};
