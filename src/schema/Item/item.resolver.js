const { prisma } = require("../../database");
const ItemServices = require("../../services/ItemServices");
const { createResponse, mergePaginationRecord } = require("../../utils/helperFunctions");

const ItemResolver = {
  Query: {
    getAllItems: async (args, req, context) => {
      try {
        const responseData = await ItemServices.getAllItems(req);
        return mergePaginationRecord(responseData);
      } catch (error) {
        return createError(401, error);
      }
    },

    getItemById: async (args, req, context) => {
      try {
        const responseData = await ItemServices.getItemById(req);
        return responseData;
      } catch (error) {
        return createError(401, error);
      }
    },

    searchItem: async (args, req, context) => {
      try {
        const responseData = await ItemServices.searchItem(req);
        return responseData;
      } catch (error) {
        return createError(401, error);
      }
    },
  },
  Mutation: {
    addNewItem: async (args, req, context) => {
      try {
        const responseData = await ItemServices.addNewItem(req);
        return responseData;
      } catch (error) {
        return createError(401, error);
      }
    },

    updateItem: async (args, req, context) => {
      try {
        const responseData = await ItemServices.updateItem(req);
        return responseData;
      } catch (error) {
        return createError(401, error);
      }
    },

    deleteItem: async (args, req, context) => {
      try {
        const responseData = await ItemServices.deleteItem(req);
        return responseData;
      } catch (error) {
        return createError(401, error);
      }
    },
  },
};

module.exports = {
  ItemResolver,
};
