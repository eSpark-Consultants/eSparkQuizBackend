const { prisma } = require("../database.js");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { signAccessToken } = require("../utils/jwt.js");
const SendMail = require("./emailServices.js");
const { createError, createResponse, requestPagination, returnPagination } = require("../utils/helperFunctions.js");

const ItemServices = {
  async getAllItems(data) {
    const pagination = requestPagination(data?.pagination?.cursor);
    try {
      const responseData = await prisma.item.findMany({
        take: data?.pagination?.limit || 10,
        where: data?.where,
        include: {
          Category: true,
        },
        ...pagination,
        orderBy: { id: "desc" },
      });
      return createResponse(responseData, true, "All Items",200, returnPagination(responseData, data?.pagination?.limit)
      );
    } catch (error) {
      return createError(401, error);
    }
  },

  async getItemById(data) {
    try {
      const responseData = await prisma.item.findUnique({
        where: { id: data.id },
      });

      return createResponse(responseData, true, "Item By Id");
    } catch (error) {
      return createError(401, error);
    }
  },

  async addNewItem(data) {
    try {
      console.log(data);
      const Item = await prisma.item.create({
        data: data,
      });

      if (Item.id) {
        const responseData = await prisma.item.findUnique({
          where: { id: Item.id },
          include: {
            Category: true
          }
        });
        console.log(responseData);
        return createResponse(responseData, true, "New Item Added");
      }

      return createError(200, "An Error Occur", false, null, ["Occur"]);
    } catch (error) {
      return createError(401, error);
    }
  },

  async updateItem (data) {
    try {
        const Item = await prisma.item.findUnique({
          where: { id: data?.id },
        });
        if (!Item) return createError("404", "Item Not Found!");
        if (Item.id) {
          const responseData = await prisma.Item.update({
            where: { id: Item.id },
            data,
          });
          return createResponse(responseData, true, "Item Update Successfully");
        }
        return createError(200, "An Error Occur", false, null, ["Occur"]);
      } catch (error) {
        return createError(401, error);
      }
  },

  async deleteItem(data) {
    try {
      const Item = await prisma.item.findUnique({
        where: { id: data?.id },
      });
      if (!Item) return createError("404", "Item Not Found!");
      if (Item.id) {
        const responseData = await prisma.Item.delete({
          where: { id: Item.id },
        });
        return createResponse(responseData, true, "Item deleted");
      }
      return createError(200, "An Error Occur", false, null, ["Occur"]);
    } catch (error) {
      return createError(401, error);
    }
  },

  async searchItem (data) {
    const items = await prisma.item.findMany({
      where: {
        name: {
          contains: data?.text,
          mode: 'insensitive'
        },
      }
    })
    return createResponse(items, true, items?.length > 0 ? `Items that contains ${data?.text}` : 'Item Not Found!');
  }
};

module.exports = ItemServices;
