
const express=require('express')
const multer=require('multer')

const upload=multer({
    storage:multer.memoryStorage(),
})
const authController=require("../controllers/auth.controller")
const middleware=require("../middlewares/auth.middleware")
const router=express.Router();
router.post('/user/register',upload.single("profilePhoto"),authController.registerUser)
router.post('/sendOtp',authController.sendOtp)
router.post('/verify',authController.verify)
router.post('/resetPassword',authController.resetPassword)
router.post('/resetPassword/:token',authController.resetbypage)
router.post('/user/login',authController.loginUser)
router.get('/user/logout',authController.logoutUser)
router.get('/otherUsers',middleware.authUserMiddleware,authController.getOtherUsers)
router.get('/selectedUser/:id',middleware.authUserMiddleware,authController.getSelectedUser)
router.post('/editProfile',middleware.authUserMiddleware,upload.single('profilePhoto'),authController.editProfile)

module.exports=router

