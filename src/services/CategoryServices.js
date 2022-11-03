const { prisma } = require("../database.js");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { signAccessToken } = require("../utils/jwt.js");
const SendMail = require("./emailServices.js");
const { createError, createResponse } = require("../utils/helperFunctions.js");

const CategoryServices = {
  async getAllCategories() {
    try {
      const responseData = await prisma.category.findMany({
        include: {
          Item: true
        }
      });
      return createResponse(responseData, true, "All Categories");
    } catch (error) {
      return createError(401, error);
    }
  },

  async getCategoryById(data) {
    try {
      const responseData = await prisma.category.findUnique({
        where: { id: data.id },
        include: {
          Item: true
        }
      });

      return createResponse(responseData, true, "Category By Id");
    } catch (error) {
      return createError(401, error);
    }
  },

  async addNewCategory(data) {
    try {
      console.log(data);
      const category = await prisma.category.create({
        data: data,
      });

      if (category.id) {
        const responseData = await prisma.category.findUnique({
          where: { id: category.id },
        });
        console.log(responseData);
        return createResponse(responseData, true, "New Category Added");
      }

      return createError(200, "An Error Occur", false, null, ["Occur"]);
    } catch (error) {
      return createError(401, error);
    }
  },

  async updateCategory (data) {
    try {
        const category = await prisma.category.findUnique({
          where: { id: data?.id },
        });
        if (!category) return createError("404", "Category Not Found!");
        if (category.id) {
          const responseData = await prisma.category.update({
            where: { id: category.id },
            data
          });
          return createResponse(responseData, true, "Category Update Successfully");
        }
        return createError(200, "An Error Occur", false, null, ["Occur"]);
      } catch (error) {
        return createError(401, error);
      }
  },

  async deleteCategory(data) {
    try {
      const category = await prisma.category.findUnique({
        where: { id: data?.id },
      });
      if (!category) return createError("404", "Category Not Found!");
      if (category.id) {
        const responseData = await prisma.category.delete({
          where: { id: category.id },
        });
        return createResponse(responseData, true, "Category deleted");
      }
      return createError(200, "An Error Occur", false, null, ["Occur"]);
    } catch (error) {
      return createError(401, error);
    }
  },
};

module.exports = CategoryServices;
