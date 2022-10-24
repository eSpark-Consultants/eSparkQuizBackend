const { prisma } = require("../../database");
const AuthServices = require("../../services/authServices");
const { createResponse, createError} = require("../../utils/helperFunctions");
const NotificationServices = require("../../services/NotificationServices");

const NotificationResolver = {
    Query: {
        getNotification: async (args, req, context) => {
            try {
                const responseData = await NotificationServices.get(req);
                return responseData;
            } catch (error) {
                return createError(401, error);
            }

        },

    },

}

module.exports = {
    NotificationResolver: NotificationResolver
}

