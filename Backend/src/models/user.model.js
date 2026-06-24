const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        
        type:String,
        required:true
    },
    gender:{
        type:String,
        enum:["male","female"],
        required :true
    },
     profilePhoto:{
        type:String,
        default:""
      
     },
     phonenumber:{
        type:String,
        required:true
     }
},

    {
        timestamps:true
    })
    const userModel=mongoose.model("user",userSchema);
    module.exports=userModel;