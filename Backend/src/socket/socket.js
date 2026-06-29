//import { Server } from "socket.io";
//import http from "http";
//import express from "express";

//const app = express();
//const server = http.createServer(app);

/*const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
     credentials:true,
    methods: ["GET", "POST"],
  },
});

const userSocketMap = {};

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);


  const userId = socket.handshake.query.userId;

  if (userId) {
    userSocketMap[userId] = socket.id;
  }

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);

    if (userId) {
      delete userSocketMap[userId];
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});


export {  io, server };*/
const { Server } = require("socket.io");
const messageModel = require("../models/message.model");


const userSocketMap = {};

let io
const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId ];
};

function initSocket(server) {
   io = new Server(server, {
    cors: {
      origin: "https://chatapp-1frontend.onrender.com",//
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("a user connected", socket.id);

    const userId = String(socket.handshake.query.userId);

    if (userId) {
      userSocketMap[userId] = socket.id;
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));
//
    socket.on("markAsRead", async ({ senderId, receiverId }) => {
       console.log("senderId", senderId ,"receiverId",receiverId);
       console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh")
const result = await messageModel.updateMany(
  
  
      {
        senderId: senderId,
        receiverId: receiverId,
        isRead: false,
      },
   
  
    
  {
    $set: { isRead: true },
  }




)
  
  const senderSocket = userSocketMap[senderId];
  console.log("SENDER SOCKET:", senderSocket);

  if (senderSocket) {
    io.to(senderSocket).emit("messagesRead", {
      senderId,
      receiverId,
    });

    console.log("📤 messagesRead emitted    ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo");
  } else {
    console.log("❌ sender offline / socket not found  eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
  }
  console.log(result.modifiedCount)
  
});


;

    socket.on("disconnect", () => {
      console.log("user disconnected", socket.id);

      if (userId) {
        delete userSocketMap[userId];
      }

      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
  });

  return io;
 

}

function getIo() {
  if (!io) throw new Error("Socket not initialized");
  return io;
}

module.exports = {
  initSocket,
  userSocketMap,
  getReceiverSocketId,
  getIo
};