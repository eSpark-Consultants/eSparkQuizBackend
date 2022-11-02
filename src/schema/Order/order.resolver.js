const { prisma } = require("../../database");
const OrderService = require("../../services/OrderServices");
const { createResponse, createError, getNextDay, getPreviousDay } = require("../../utils/helperFunctions");
const { relations } = require("../../utils/relationsHelper");

const orderResolver = {
  Query: {
    getAllOrders: async (args, req, context) => {
      if (req?.GetOrderInput?.createdAt) {
        req.GetOrderInput.createdAt = {
          lte: getNextDay(new Date(req.GetOrderInput.createdAt)), 
          gt: new Date(req.GetOrderInput.createdAt),
        };
      }
      const response = await prisma.order.findMany({
        include: {
          User: true,
          OrderItems: {
            include: {
              Item: true,
            }
          }
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

    getCurrentRemainingAmount: async (args, req, context) => {
      const response = await OrderService.getCurrentRemainingAmount(req);
      return response;
    },

    getOrderSummary: async (args, req, context) => {
      const response = await OrderService.getOrderSummary(req);
      return response;
    },
    getOrderOverviewByDate: async (args, req, context) => {
      const response = await OrderService.getOrderOverviewByDate(req);
      return response;
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
