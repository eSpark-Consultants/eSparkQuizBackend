const { prisma } = require("../database.js");
require("dotenv").config();
const _ = require("lodash")
const { createError, createResponse, requestPagination, returnPagination, customString} = require("../utils/helperFunctions.js");

const admin = require("firebase-admin");


const Notification = {

  async get(data) {
    try {
      notificationData = await prisma.notification.findMany({
        where : data.where,
        include: {
          sender: true,
          receiver: true
        }
      });
      return createResponse(notificationData, true, "NotificationData");
    } catch (error) {
      return createError(401, error);
    }
  },

  async add(senderId, receiverId, message, type = '', typeId = 0) {
    messageType = message;
    message = await this.messages(messageType);
    title = await this.title(messageType);

    try {

      if(type == 'POST'){

        let post = prisma.post.findUnique({
          data : {
            id : typeId,
          }
        });

        message = message.replace("[POST]", post.title);
      }


      let sender = await prisma.user.findUnique({
        where : {
          id : senderId,
        },
        include : {
          business : true
        }
      });

      let receiver = await prisma.user.findUnique({
        where : {
          id : receiverId,
        },
        include : {
          business : true
        }
      });

      message = message.replace("[SENDER]", sender.firstName);
      message = message.replace("[RECEIVER]", receiver.firstName);
      message = message.replace("[BUSINESS]", (sender.business ? sender.business.businessName : '[BUSINESS]' ));
      message = message.replace("[BUSINESS]", (receiver.business ? receiver.business.businessName :  '[BUSINESS]' ));
      console.log(message);

      notification = await prisma.notification.create({
        data : {
          senderId : senderId,
          receiverId : receiverId,
          message : message,
          type : type,
          typeId : typeId
        }
      });

      const allow = await this.allow(receiver, messageType);
      console.log(allow);
      console.log("allow");
      if(allow){

        await this.send(
            [receiver.fcmToken],
            { type: type, typeId: typeId.toString()},
            title,
            message
        );

      }
      console.log("Notification Added");

    } catch (error) {
      console.log(error);

    }
  },

  async messages(data) {

    messages = {
      followBusiness : '[SENDER] follow you',
      unFollowBusiness : '[SENDER] unfollow you',
      newPost : '[BUSINESS] add new post',
      postLike : '[SENDER] like your post',
      postFollow : '[SENDER] follow your post',
      postComment : '[SENDER] comment on your post',
      postCommentFollow : '[SENDER] comment on a post that you follow',
      postCommentReply : '[SENDER] reply on your comment',
      postCommentLike : '[SENDER] like your comment',
      newMessage : '[SENDER] sent you a message',
      newStory : '[SENDER] add new story',
    }

    return messages[data];

  },

  async title(data) {

    titles = {
      followBusiness : 'Business Follow',
      unFollowBusiness : 'Business Unfollow',
      newPost : 'New Post',
      postLike : 'Post Like',
      postFollow : 'Post Follow',
      postComment : 'New Comment',
      postCommentFollow : 'New Comment',
      postCommentReply : 'Comment Reply',
      postCommentLike : 'Comment Like',
      newMessage : 'New Message',
      newStory : 'New Story',
    }

    return titles[data];

  },

  async send(usertokens, data, title, description) {
    const message = {
      notification: { title: title, body: description },
      data: data,
      tokens: usertokens,
    };
    try {
      const result = await admin.messaging().sendMulticast(message);
      // console.log("result SendNotificationToMutliUsers", result);
    } catch (error) {
      console.log("error  SendNotificationToMutliUsers", error);
    }
  },

  async allow(reciver, type) {


    if(type == "postLike")
    {
      return reciver?.settings?.notifications?.like
    }


    if(type == "news" ){
      return reciver?.settings?.notifications?.news
    }



    if(type == "newMessage"){
      return reciver?.settings?.notifications?.chat
    }


    if(type == "newStory")
    {
      return reciver?.settings?.notifications?.story
    }


    if(type == "newPost")
    {
      return reciver?.settings?.notifications?.share
    }



    if(type == "postComment"){
      return reciver?.settings?.notifications?.comment
    }


    console.log("type" + type);
    return true

  },



};


module.exports = Notification;
