const { prisma } = require("../../database");
const AuthServices = require("../../services/authServices");
const { createResponse, createError } = require("../../utils/helperFunctions");
const NotificationServices = require("../../services/NotificationServices");

const ResultResolver = {
  Query: {
    getAllResults: async (args, req, context) => {
      try {
        const response = await prisma.results.findMany({
          where: req?.where ? req?.where : {},
        });
        return createResponse(response, true, "All Results");
      } catch (error) {
        return createError(401, error);
      }
    },
    getOneResult: async (args, req, context) => {
      try {
        const response = await prisma.results.findUnique({
          where: { id: req?.id },
        });
        console.log("req req", response);
        if (!response) return createError(404, "Result not found");
        return createResponse(response, true, "All Results");
      } catch (error) {
        console.log("getOneResult error", error);
        return createError(401, error);
      }
    },
  },
  Mutation: {
    createResult: async (args, req) => {
      try {
        const response = await prisma.results.create({
          data: req,
        });
        return createResponse(response, true, "All Results");
      } catch (error) {
        return createError(401, error);
      }
    },
  },
};

module.exports = {
  ResultResolver,
};
