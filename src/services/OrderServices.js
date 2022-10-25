const { prisma } = require("../database");
const { createError, createResponse } = require("../utils/helperFunctions");
const crypto = require("crypto");
const { relations } = require("../utils/relationsHelper");

const OrderService = {
  async createOrderWithItems(data) {
    const { items, ...details } = data.input;
    const userExist = await prisma.user.findUnique({
      where: { id: details.userId },
    });
    if (!userExist) return createError(400, "User not found!");
    try {
      const response = await prisma.order.create({
        data: details,
      });
      for (let index = 0; index < items.length; index++) {
        console.log("ORDER DATA", details, items[index]);
        const item = await prisma?.item.findUnique({
          where: { id: items[index]?.itemId },
        });
        items[index]["orderId"] = response.id;
        if (item?.id) {
          await prisma.orderItems.create({
            data: items[index],
          });
        }
      }
      return createResponse(response, true, "Order Created Successfully");
    } catch (error) {
      console.log(error);
      return createError(401, error);
    }
  },

  async updateOrder(data) {
    const isOrder = await prisma.order.findUnique({
      where: {
        id: data.id,
      },
    });
    if (!isOrder) return createError(400, "User not found!");
    data['remainingAmount'] = data?.paidAmount - isOrder.totalAmount
    try {
      const result = await prisma.order.update({
        where: {
          id: data.id,
        },
        data: data,
      });
      return createResponse(result, true, "Order Updated Successfully");
    } catch (error) {
      console.log(error);
      return createError(401, error);
    }
  },
};

module.exports = OrderService;
