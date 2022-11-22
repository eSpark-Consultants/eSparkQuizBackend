const { prisma } = require("../../database");
const AuthServices = require("../../services/authServices");
const Notification = require("../../services/NotificationServices");
const { createResponse, sortAlphebetically, getUserFcmTokens } = require("../../utils/helperFunctions");

const UserResolver = {
  Query: {
    loginUser: async (args, req, context) => {
      const response = await AuthServices.loginUser(req);
      return response;
    },
    getAllUsers: async (args, req, context) => {
      const obj = {...req?.where}
      const response = await prisma.user.findMany({
        where: req?.where ? obj : {}
      });
      return createResponse(response, true, "All users");
    },
    getUserById: async (args, req, context) => {
      const response = await prisma.user.findUnique({
        where: {
          id: req.id,
        }
        // include : relations.user()
      });
      return createResponse(response, true, "User");
    },
  },
  Mutation: {
    createUser: async (args, req) => {
      const response = await AuthServices.createUser(req);
      return response;
    },
    forgotPassword: async (args, req) => {
      const response = await AuthServices.forgotPassword(req);
      return response;
    },
    changePassword: async (args, req) => {
      const response = await AuthServices.changePassword(req);
      return response;
    },
    deleteUser: async (args, req) => {
      const response = await AuthServices.deleteUser(req);
      return response;
    },
    verifyOtp: async (args, req) => {
      const response = await AuthServices.verifyOtp(req);
      return response;
    },
    resendOtp: async (args, req) => {
      const response = await AuthServices.resendOtp(req);
      return response;
    },
    // resetPassword: async (args, req) => {
    //   const response = await AuthServices.resetPassword(req);
    //   return response;
    // },
    updateProfile: async (args, req) => {
      const response = await AuthServices.updateProfile(req);
      return response;
    },
    logout: async (args, req) => {
      const response = await AuthServices.logout(req);
      return response;
    },
  },
};

module.exports = {
  UserResolver,
};
