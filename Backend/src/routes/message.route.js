
const express=require('express')
const messageController=require("../controllers/message.controller")
const middleware=require("../middlewares/auth.middleware")
const router=express.Router();
router.post('/sendMessage/:receiverId',middleware.authUserMiddleware,messageController.sendMessage)
router.get('/receiveMessage/:senderId',middleware.authUserMiddleware,messageController.receiveMessage)


module.exports=router
