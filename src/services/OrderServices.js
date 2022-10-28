const { gt } = require("lodash");
const { prisma } = require("../database");
const {
  createError,
  createResponse,
  getNextDay,
  getPreviousDay,
} = require("../utils/helperFunctions");

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
    data["remainingAmount"] = data?.paidAmount - isOrder.totalAmount;
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

  async getCurrentRemainingAmount(data) {
    const isRemainingAmount = await prisma.order.findFirst({
      where: {
        createdAt: {
          lt: getNextDay(),
          gt: getPreviousDay(),
        },
        remainingAmount: {
          gt: 0,
        },
      },
    });
    if (!isRemainingAmount) return createError(400, "All Clear for today!");
    return createResponse(
      isRemainingAmount,
      true,
      "Today Remaining Amount Order"
    );
  },

  async getOrderSummary(data) {
    console.log("getOrderSummary", data);
    try {
      const order = await prisma.orderItems.groupBy({
        by: ["itemId"],
        where: {
          createdAt: {
            lt: getNextDay(new Date(data.date || new Date())),
            gt: getPreviousDay(new Date(data.date || new Date())),
          },
        },
        _sum: {
          quantity: true,
          amount: true
        },
      });

      const totalAmount = await prisma.order.aggregate({
        where: {
          createdAt: {
            lt: getNextDay(new Date(data.date || new Date())),
            gt: getPreviousDay(new Date(data.date || new Date())),
          },
        },
        _sum: {
          totalAmount: true
        }
      })
      console.log("totalAmount", totalAmount)
      if (order?.length > 0) {
        for (let index = 0; index < order.length; index++) {
          const orderItem = order[index];
          const item = await prisma.item.findUnique({
            where: {
              id: orderItem.itemId,
            },
            include: {
              Category: true, 
            }
          });
          orderItem['item'] = item
          orderItem['quantity'] = orderItem._sum.quantity
          orderItem['amount'] = orderItem._sum.amount
          delete orderItem['_sum']
        }
      }
      var obj = createResponse(
        order,
        true,
        "Order Summary"
      );
      obj['totalAmount'] = totalAmount._sum.totalAmount
      return obj;
    } catch (error) {
      console.log("getOrderSummary error", error);
    }
  },
};

module.exports = OrderService;
