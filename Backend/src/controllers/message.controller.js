const messageModel=require("../models/message.model")
const conversationModel=require("../models/conversation.model")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { initSocket ,getIo,getReceiverSocketId,userSocketMap} = require("../socket/socket");
const sendMessage=async(req,res)=>{
    
    const {message}=req.body
    const senderId=req.user.id
    const receiverId=req.params.receiverId
    const conversation=await conversationModel.findOne({
        participants:{$all:[senderId,receiverId]}
    })
    if(!conversation){
        conversation=await conversationModel.create({
            participants:[senderId,receiverId]
        })
    }
    const newMessage=await messageModel.create({
        message,
        senderId,
        receiverId
    })
     
    const receiverSocketId=getReceiverSocketId(receiverId)
    /*console.log("receiverId:", receiverId);
console.log("typeof receiverId:", typeof receiverId);
console.log("userSocketMap:", userSocketMap);
     console.log(receiverSocketId)
    if(receiverSocketId){
        const io=getIo()
        io.to(receiverSocketId).emit("newMessage",newMessage)

        
    }*/
   console.log("receiverId:", receiverId);
console.log("typeof receiverId:", typeof receiverId);
console.log("userSocketMap:", userSocketMap);

console.log("receiverSocketId:", receiverSocketId);

if (receiverSocketId) {
    const io = getIo();

    io.to(receiverSocketId).emit("newMessage", {
        ...newMessage._doc,   // 👈 add this
        isSocket: true        // 👈 HERE ADD IT
    });

    console.log("⚡ Message sent via socket");
} else {
    console.log("💾 Message saved only in DB (offline user)");
}



    conversation.messages.push(newMessage._id)
    await conversation.save()




      
      
    
    return res.status(201).json({
        message:"Message sent successfully",
        newMessage,
        conversation
    })
}

const receiveMessage=async(req,res)=>{
    const senderId=req.params.senderId
    const receiverId=req.user.id
    const conversation=await conversationModel.findOne({
        participants:{$all:[senderId,receiverId]}
    }).populate('messages')
    

 //   console.log(userSocketMap)
      
    
     
    return res.status(200).json({
        message:"Messages retrieve successfully",
        conversation,
        
    })
    
}

module.exports={sendMessage, receiveMessage}