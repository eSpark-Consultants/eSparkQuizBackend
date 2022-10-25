const { prisma } = require("../../database");
const OrderService = require("../../services/OrderServices");
const { createResponse, createError } = require("../../utils/helperFunctions");
const { relations } = require("../../utils/relationsHelper");

const orderResolver = {
  Query: {
    getAllOrders: async (args, req, context) => {
      const response = await prisma.order.findMany({
        include: {
            Items: true,
            User: true
        }, //relations.order(),
        where: req ? req?.GetOrderInput : {},
      });
      return createResponse(response, true, "All Orders");
    },
    getOrderById: async (args, req, context) => {
      const response = await prisma.order.findUnique({
        where: {
          id: req.id,
        },
        include: relations.order(),
      });
      return createResponse(response, true, "Order");
    },
  },
  Mutation: {
    createOrder: async (args, req) => {
      const response = await OrderService.createOrderWithItems(req);
      return response;
    },
    updateOrder: async (args, req) => {
      const response = await OrderService.updateOrder(req);
      return response;
    },
  },
};

module.exports = {
  orderResolver,
};
