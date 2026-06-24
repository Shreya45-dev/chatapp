
const mongoose=require('mongoose')//npm create vite@latest .
const conversationSchema=new mongoose.Schema({
    participants:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }],

    messages:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"message"
    }]
},

    {
        timestamps:true
    })
    const conversationModel=mongoose.model("conversation",conversationSchema);
    module.exports=conversationModel;