const { prisma } = require("../database.js");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { signAccessToken } = require("../utils/jwt.js");
const { SendMail } = require("./emailServices.js");
const {
  createError,
  createResponse,
  validateError,
  seprateUserBusinessFields,
  genPassword,
  sortAlphebetically,
} = require("../utils/helperFunctions.js");
const { relations } = require("../utils/relationsHelper");

const AuthServices = {
  async createUser(data) {
    const isValidate = await validateError(["email", "role", "firstName", "lastName"], data);
    if (isValidate) return isValidate;
    data['password'] = genPassword()
    var userData = {...data}
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });
    if (user) return createError(401, "Email Already exist");
    data.password = bcrypt.hashSync(data.password, 8);
    const token = await crypto.randomBytes(2);
    try {
      responseData = await prisma.user.create({
        data: data,
      });
      SendMail(userData?.email, {
        email: userData?.email,
        password: userData?.password,
        name: `${userData?.firstName} ${userData?.lastName}`
      });
      return createResponse(responseData, true, "Registration Successfully");
    } catch (error) {
      return createError(401, error);
    }
  },

  async loginUser(data) {
    const userExist = await prisma.user.findUnique({
      where: { email: data.email },
      // include: relations.user(data),
    });

    if (!userExist) return createError("404", "User Not Found!");

    const checkPassword = bcrypt.compareSync(data.password, userExist.password);
    if (!checkPassword) return createError("401", "Email/Password incorrect");

    const updateFcm = await prisma.user.update({
      where: { email: userExist.email },
      data: {
        fcmToken: data.fcmToken,
      },
    });
    delete userExist.password;
    return createResponse(userExist, true, "Signin Successful");
  },

  async forgotPassword(data) {
    const forgotpassword = await prisma.user.findFirst({
      where: {
        email: data.email,
        role: data.role,
      },
    });
    if (!forgotpassword)
      return createError("404", "User not registered with this email");
    const token = await crypto.randomBytes(2);
    // console.log("forgotpassword.id", forgotpassword.id)
    const tokenData = await prisma.token.upsert({
      where: {
        userId: forgotpassword.id,
      },
      update: {
        token: token.toString("hex"),
        createdAt: new Date(),
      },
      create: {
        token: token.toString("hex"),
        userId: forgotpassword.id,
      },
    });
    SendMail(data.email, token.toString("hex"));
    return createResponse(data, true, "Otp Send to your Email");
  },

  async verifyOtp(data) {
    const userExist = await prisma.user.findUnique({
      where: { email: data.email },
    });
    if (!userExist) return createError("404", "User Not Found!");

    const verifyOtp = await prisma.token.findFirst({
      where: {
        userId: userExist.id,
      },
    });
    if (!verifyOtp || data.token != verifyOtp.token)
      return createError("401", "Otp is not set or expired");
    var diff = Math.abs(new Date(verifyOtp.createdAt) - new Date());
    var minutes = Math.floor(diff / 1000 / 60);
    if (minutes >= 2) return createError("401", "Otp is expired");
    const userData = await prisma.user.update({
      where: { id: userExist.id },
      data: { isVerified: true },
    });
    return createResponse(userData, true, "Account is now verified");
  },

  async resendOtp(data) {
    const userExist = await prisma.user.findUnique({
      where: { email: data.email },
    });
    if (!userExist) return createError("404", "User Not Found!");
    const token = await crypto.randomBytes(2);
    const response = await prisma.token.update({
      where: {
        userId: userExist.id,
      },
      data: {
        token: token.toString("hex"),
        createdAt: new Date(),
      },
    });
    SendMail(data?.email, token.toString("hex"));
    return createResponse(userExist, true, "otp is resend to your email");
  },

  async changePassword(data) {
    const userExist = await prisma.user.findUnique({
      where: { id: data.id },
    });

    if (!userExist) return createError("404", "User Not Found!");

    const checkPassword = bcrypt.compareSync(
      data.currentPassword,
      userExist.password
    );
    if (!checkPassword)
      return createError("401", "Current Password is incorrect");
    const newPassword = bcrypt.hashSync(data.newPassword, 8);

    try {
      const responseData = await prisma.user.update({
        where: {
          id: data.id,
        },
        data: {
          password: newPassword,
        },
      });
      return createResponse(
        responseData,
        true,
        "Password changed successfully1"
      );
    } catch (error) {
      return createError(401, error);
    }
  },

  async deleteUser(data) {
    const userExist = await prisma.user.findUnique({
      where: { id: data.id },
    });

    if (!userExist) return createError("404", "User Not Found!");

    try {
      const businessData = await prisma.business.delete({
        where: {
          id: userExist.business.id,
        },
      });

      const responseData = await prisma.user.delete({
        where: {
          id: data.id,
        },
      });

      const users = await prisma.user.findMany();
      return createResponse(sortAlphebetically(response), true, "User deleted successfully1");
    } catch (error) {
      return createError(401, error);
    }
  },

  async resetPassword(data) {
    const userExist = await prisma.user.findUnique({
      where: { email: data?.email },
    });

    if (!userExist) return createError("404", "User Not Found!");

    const newPassword = bcrypt.hashSync(data?.newPassword, 8);

    try {
      const responseData = await prisma.user.update({
        where: {
          id: userExist.id,
        },
        data: {
          password: newPassword,
        },
      });
      return createResponse(responseData, true, "Password reset successfully!");
    } catch (error) {
      return createError(401, error);
    }
  },

  async updateProfile(data) {
    const userExist = await prisma.user.findUnique({
      where: { id: data?.id },
    });

    if (!userExist) return createError("404", "User Not Found!");
    try {
      const responseData = await prisma.user.update({
        where: {
          id: userExist.id,
        },
        data: seprateUserBusinessFields({ ...data })?.user,
      });
      if (data.type == "Business") {
        const res = await prisma.business.update({
          where: {
            id: responseData?.business?.id,
          },
          data: seprateUserBusinessFields({ ...data })?.business,
        });
      }

      const updatedData = await prisma.user.findUnique({
        where: {
          id: responseData?.id,
        },
      });

      return createResponse(updatedData, true, "Update Profile successfully!");
    } catch (error) {
      return createError(401, error);
    }
  },

  async logout(data) {
    const userExist = await prisma.user.findUnique({
      where: { id: data.id },
    });

    if (!userExist) return createError("404", "User Not Found!");

    try {
      const updateFcm = await prisma.user.update({
        where: { email: userExist.email },
        data: {
          fcmToken: "",
        },
      });

      return createResponse(userExist, true, "User Logout");
    } catch (error) {
      return createError(401, error);
    }
  },
};

module.exports = AuthServices;
