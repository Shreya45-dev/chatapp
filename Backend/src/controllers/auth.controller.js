/*const userModel=require("../models/user.model")
const foodPartnerModel=require("../models/foodpartner.model")
const bcrypt=require('bcryptjs');
const commentModel=require('../models/comment.model')
const foodModel=require('../models/food.model')
const jwt=require('jsonwebtoken')
async function registerUser(req,res){
    const {fullName,email,password,phonenumber}=req.body
    const isUserAlreadyExist=await userModel.findOne({
        email
    })
    if(isUserAlreadyExist){
        return res.status(400).json({
            message:"User already exists"
        })
    }
    const hashedPassword=await bcrypt.hash(password,10);
    const user=await userModel.create({
        fullName,
        email,
        password:hashedPassword,
        phonenumber
    })

    const token=jwt.sign({
        id:user._id,
    },process.env.JWT_SECRET)   
                                                              
    res.cookie("token",token)
    res.status(201).json({
        message:"User registered successfully",
        user:{
            _id:user._id,
            email:user.email,
            fullName:user.fullName
        }
    })

}
async function loginUser(req,res){
    const{email,password}=req.body;
    const user=await userModel.findOne({
        email})
    
        if(!user){
            return res.status(400).json({
                message:"Invalid email or password"
            })
        }

        const isPasswordValid=await bcrypt.compare(password,user.password)
        if(!isPasswordValid){
            return res.status(400).json({
                message:"Invalid email or password"
            })
        }

        const token=jwt.sign({
            id:user._id,
        },process.env.JWT_SECRET)
        res.cookie("token",token)
        res.status(200).json({
            message:"User logged in successfully",
            user:{
                _id:user._id,
                email:user.email,
                fullName:user.fullName
            },
            token:token

        })
    }


function logoutUser(req,res){
res.clearCookie("token");
res.status(200).json({
    message:"User logged out successfully"
})}


async function registerFoodPartner(req,res){
    const {name,email,password,restaurantName,Address,City}=req.body;
    const isAccountAlreadyExists=await foodPartnerModel.findOne({
        email
    })
    if(isAccountAlreadyExists){
        return res.status(400).json({
            message:"Food partner account already exists"
        })
    }
    const hashedPassword=await bcrypt.hash(password,10);
    const foodPartner=await foodPartnerModel.create({
        name,
        email,
        password:hashedPassword,
        restaurantName,
        Address,
        City
    })
    const token=jwt.sign({
        id:foodPartner._id,
    },process.env.JWT_SECRET)
    res.cookie("token",token)

    res.status(201).json({
        message:"Food partner registered successfully",
        foodPartner:{
            _id:foodPartner._id,
            email:foodPartner.email,
            name:foodPartner.name
        }
    })

}

async function loginFoodPartner(req,res){
    const{email,password}=req.body
    const foodPartner=await foodPartnerModel.findOne({
        email
    })
    if(!foodPartner){
        return res.status(400).json({
            message:"Invalid email or password"
        })
    }
    if(foodPartner){
     const isPasswordValid=await bcrypt.compare(password,foodPartner.password)
        if(!isPasswordValid){
            return res.status(400).json({
                message:"Invalid email or password"
            })
        }

        const token=jwt.sign({
            id:foodPartner._id,
        },process.env.JWT_SECRET)
        res.cookie("token",token)
        res.status(200).json({
            message:"foodpartner  logged in successfully",
            user:{
                _id:foodPartner._id,
                email:foodPartner.email,
                fullName:foodPartner.fullName
            }
        })
    }}
    function logoutFoodPartner(req,res){
res.clearCookie("token");
res.status(200).json({
    message:"food Partner User logged out successfully"
})}



const commentcreate=async(req,res)=>{
   
    const comment=await commentModel.create({
        text:req.body.text,
        authorId:req.user._id,
        ShortId:req.params.id
        

    })
    const food=await foodModel.findById(req.params.id)
    food.comment.push(comment._id)
    await food.save()
    return res.status(400).json({
        message:"comment created",
        comment
    })

}
 
const commentshow=async(req,res)=>{
    const comment=await commentModel.find({ShortId:req.params.id}).populate('authorId')

    return res.status(201).json({
        message:"get successfully",
        comment
    })
    

}




module.exports={registerUser,loginUser,logoutUser,registerFoodPartner,loginFoodPartner,logoutFoodPartner,commentcreate,commentshow}

*/

const userModel = require("../models/user.model")

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken')

const storageService=require('../services/storage.service')

const{ v4:uuid}=require("uuid"); 
const { sendEmail } = require("../sendemail");

const verifyOtp=[]


// ====================== USER REGISTER ======================
async function registerUser(req, res) {
    const { fullName, email,profilePhoto ,gender,password, phonenumber } = req.body
console.log(fullName)
    const isUserAlreadyExist = await userModel.findOne({ email })

    if (isUserAlreadyExist) {
        return res.status(400).json({
            message: "User already exists"
        })
    }
    if(!fullName || !email || !gender || !phonenumber){
        return res.status(400).json({
            message:"All fields are required"
        })
    }
       const fileUploadResult=await storageService.uploadFile(req.file.buffer,uuid())
  if (!req.file) {
    return res.status(400).json({
        message: "Profile photo is required"
    })
}
    console.log(fileUploadResult)
    const hashedPassword = await bcrypt.hash(password, 10);
    const maleProfilePhoto=`https://avatar.iran.liara.run/public/boy?username=${fullName}`;
    const femaleProfilePhoto=`https://avatar.iran.liara.run/public/girl?username=${fullName}`
    const user = await userModel.create({
        fullName,
        email,
        profilePhoto:fileUploadResult.url,
        gender,
        password: hashedPassword,
        phonenumber
    })

    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET
    )

    res.cookie("token", token, {
       httpOnly: true,
        secure: true,
        sameSite: "None"
    })

    return res.status(201).json({
        message: "User registered successfully",
        user: {
            _id: user._id,
            email: user.email,
            fullName: user.fullName,
            gender:user.gender
        }
    })
}



const sendOtp = async (req, res) => {
    try {
        const { email } = req.body;

        const otp = Math.floor(100000 + Math.random() * 900000);

        verifyOtp.push(otp);

        const subject = "Email Verification";
        const message = `Your OTP for email verification is ${otp}`;
       
       console.log(otp)
        await sendEmail(email, subject, message);

        return res.status(200).json({
            success: true,
            message: "OTP sent successfully"
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to send OTP"
        });
    }
};

const verify=(req,res)=>{
    const {otp}=req.body
    if(!otp){
        return res.status(200).json({
            message:"Please enter your verification otp",
            
        })

        }
    if(otp!=verifyOtp[verifyOtp.length-1]){
        return res.status(200).json({
                 message:"invalid otp",
                 success:false
                }
            )
        }
    return res.status(201).json({
        message:"verification successful",
        success:true
    })

            
    }
const resetPassword=async(req,res)=>{

    /*const {email}=req.body
    if(!email){
 return res.status(200).json({
    message:"Please provide the email"
    
 })}
 const user=await userModel.findOne({email})
if(!user){
    return res.status(404).json({
        message:"invalid email"
    })
}     

     const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
            { expiresIn: "15m" }
    )
    const link=`http://localhost:3000/api/auth/resetPassword/${token}`
    const message=`Hello ${user.fullName},Please click on the following link to reset your password ${link} `
    await sendEmail(user.email,"reset passord",message)
    return res.status(200).json({
        message:"Password reset link sent to your email",
        token:token
    })*/

        
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Please provide email" });
    }

    const user = await userModel.findOne({ email });

    // avoid email enumeration
    if (!user) {
        return res.status(200).json({
            message: "If the email exists, a reset link has been sent"
        });
    }

    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "15m" }
    );
    console.log(token)

    const link = `https://chatapp-uhub.onrender.com/api/auth/resetPassword/${token}`;

    const message = `Hello ${user.fullName}, click here to reset your password: ${link}`;

    await sendEmail(user.email, "Reset Password", message);

    return res.status(200).json({
        message: "Reset link sent if email exists"
    });
};



const resetbypage=async(req,res)=>{
    /*const {token}=req.params;
    const {newpassword}=req.body
    if(!token){
        return res.status(200).json({
            message:"Please provide token"
        })
    }
    const decoded=jwt.verify(token,process.env.JWT_SECRET)
    const user=await userModel.findById(decoded.id)

  
     const hashedPassword = await bcrypt.hash(newpassword, 10);

    

    user.password=hashedPassword
    await user.save()
    return res.status(200).json({
        message:"password reset"
    })*/


    const { token } = req.params;
    const { newpassword } = req.body;

    if (!token) {
        return res.status(400).json({
            message: "Please provide token"
        });
    }

    let decoded;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return res.status(401).json({
            message: "Token expired or invalid"
        });
    }

    const user = await userModel.findById(decoded.id);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    if (!newpassword || newpassword.length < 6) {
        return res.status(400).json({
            message: "Password too weak"
        });
    }

    const hashedPassword = await bcrypt.hash(newpassword, 10);

    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({
        message: "Password reset successful"
    });
};


// ====================== USER LOGIN ======================
async function loginUser(req, res) {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email })

    if (!user) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET
    )

    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None"
    })

    return res.status(200).json({
        message: "User logged in successfully",
        user: {
            _id: user._id,
            email: user.email,
            fullName: user.fullName,
            gender:user.gender,
            profilePhoto:user.profilePhoto
        },
        token
    })
}


// ====================== LOGOUT USER ======================
function logoutUser(req, res) {
    res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "None"
    });

    return res.status(200).json({
        message: "User logged out successfully"
    })
}
const getOtherUsers=async(req,res)=>{
    try{
        const users=await userModel.find({_id:{$ne:req.user._id}}).select("-password")
        return res.status(200).json({
            message: "Users fetched successfully",
            users
        })
    }catch(error){
        return res.status(500).json({
            message: "Error fetching users"
            
        })
    }

}

const getSelectedUser=async(req,res)=>{
    try{
        const selectedUser=await userModel.findById(req.params.id).select("-password")
        return res.status(200).json({
            message: "Selected user fetched successfully",
            selectedUser
        })
    }catch(error){
        return res.status(500).json({
            message: "Error fetching selected user"
        })
    }
}


const editProfile=async(req,res)=>{
    try{
        const userId=req.user.id
       // const{bio,gender}=req.body;
        const profilePhoto=req.file
     //   let cloudResponse'
     
            if (!req.file) {
    return res.status(400).json({
        message: "Profile photo is required"
    })}
        const fileUploadResult=await storageService.uploadFile(req.file.buffer,uuid())
 

            const user=await userModel.findById(userId)
            if(!user){
                return res.status(404).json({
                    message:"User not found"
                })
            }
           // if(username) user.username=username;
            if(profilePhoto){
                user.profilePhoto=fileUploadResult.url
            }
            await user.save();
            return res.status(200).json({
                message:"User profile updated successfully",
                user
            })
        } catch(error){
        console.log(error)
    }
}

            const suggestedUsers=async(req,res)=>{
                try{
                    const suggestedUsers=await userModel.find({ _id: { $ne: req.id } }).select('-password')
                    if(!suggestedUsers){
                        return res.status(404).json({
                            message:"No suggested users found"
                        })
                    }
                    return res.status(200).json({
                        message:"Suggested users fetched successfully",
                        users:suggestedUsers
                    })
                }
                catch(error){
                    console.log(error)
                }
            }




// 


// ====================== EXPORTS ======================
module.exports = {
    registerUser,
     sendOtp,
     verify,
     resetPassword,
     resetbypage,
    loginUser,
    logoutUser,
     editProfile,
    getOtherUsers,
    getSelectedUser
}