const CategoryServices = require("../../services/CategoryServices");
const { createError } = require("../../utils/helperFunctions");

const CategoryResolver = {
  Query: {
    getAllCategories: async (args, req, context) => {
      try {
        const responseData = await CategoryServices.getAllCategories();
        return responseData;
      } catch (error) {
        return createError(401, error);
      }
    },

    getCategoryById: async (args, req, context) => {
      try {
        const responseData = await CategoryServices.getCategoryById(req);
        return responseData;
      } catch (error) {
        return createError(401, error);
      }
    },
  },
  Mutation: {
    addNewCategory: async (args, req, context) => {
      try {
        const responseData = await CategoryServices.addNewCategory(req);
        return responseData;
      } catch (error) {
        return createError(401, error);
      }
    },

    updateCategory: async (args, req, context) => {
      try {
        const responseData = await CategoryServices.updateCategory(req);
        return responseData;
      } catch (error) {
        return createError(401, error);
      }
    },

    deleteCategory: async (args, req, context) => {
      try {
        const responseData = await CategoryServices.deleteCategory(req);
        return responseData;
      } catch (error) {
        return createError(401, error);
      }
    },
  },
};

module.exports = {
  CategoryResolver,
};
