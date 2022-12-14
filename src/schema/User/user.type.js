const { gql } = require("graphql-modules");

const User = gql`
  scalar Date

  type User {
    id: Int
    email: String
    firstName: String
    lastName: String
    userName: String
    avatar: String
    dob: Date
    phoneNumber: String
    country: String
    city: String
    password: String
    resetToken: String
    status: Boolean
    isVerified: Boolean
    fcmToken:    String
    createdAt: Date
    updatedAt: Date
  }
     
  type UserResponse {
    status: Boolean
    message: String
    data: User
    error: String
  }

  type AlphabeticalResponse {
    alphabet: String
    record: [User]
  }
  
  type UserArrayResponse {
    status: Boolean
    message: String
    data: [User]
  }

  input Input {
    status: Boolean
  }
  type Query {
    getAllUsers(where: Input): UserArrayResponse
    loginUser(email: String, password: String, fcmToken: String): UserResponse
    getUserById(id: Int): UserResponse
  }

  type Mutation {
    createUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
      fcmToken: String
    ): UserResponse

    forgotPassword(email: String!): UserResponse

    changePassword(
      id: Int!
      currentPassword: String!
      newPassword: String!
    ): UserResponse

    deleteUser(id: Int!): UserArrayResponse

    verifyOtp(token: String!, email: String!): UserResponse

    resendOtp(email: String!): UserResponse

    # resetPassword(email: String!, newPassword: String!): UserResponse
    
    logout(id: Int!): UserResponse

    updateProfile(
      id: Int!
      firstName: String
      lastName: String
      avatar: String
      dob: Date
      phoneNumber: String
      country: String
      city: String
     ): UserResponse
  }

  enum ROLES {
    USER
    RIDER
    ADMIN
  }
`;

module.exports = {
  User
};
