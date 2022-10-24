const { gql } = require("graphql-modules");

const Notification = gql`
 scalar JSON
scalar JSONObject

  type Notification {
    id : Int   
    senderId : Int
    sender : User
    receiverId : Int
    receiver : User
    message : String 
    type : String
    typeId : Int 
    createdAt : Date
     }
  
 
 input whereNotificationInput{
    id : Int   
    senderId : Int
    receiverId : Int
 }
 
 
  
  
  type NotificationArrayResponse {
    status: Boolean
    message: String
    data: [Notification]
    pagination: [PaginationResponse]
    error: String
  }
  


  type Query {
    getNotification(where: whereNotificationInput): NotificationArrayResponse
   }
    
`;

module.exports = {
  Notification,
};
