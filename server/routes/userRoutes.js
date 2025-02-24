//Import Statements
import express from 'express'
import {userRegisterController,userLogInController, getUserProfile, forgetPasswordController, verifyOtpController, getOtpTimeController, updateUserPasswordController, editUserProfile, searchUser, followUser, fetchFollowUserPost, followList, unFollowUser} from '../controllers/userController.js'
import upload from '../middlewares/multer/multer.js';

//Router Object
const router = express.Router();

//Routes

//User Register Route Method:[POST]
router.post('/register', userRegisterController);

//User LogIn Route Method:[POST]
router.post('/login', userLogInController);

//Get User Route Method:[GET]
router.post('/get-user',getUserProfile)

//Forget Password Route Method:[POST]
router.post('/forget-password',forgetPasswordController)

//Verify OTP Route Method:[POST]
router.post('/verify-otp',verifyOtpController)

//Get OTP Route Method:[POST]
router.post('/otp-time',getOtpTimeController)

//Update User Password Route Method:[POST]
router.post('/update-password',updateUserPasswordController)

//Edit User Profile Route Method:[POST]
router.post('/edit-profile',upload.fields([{name: "profileImage", maxCount: 1},{name: "coverImage", maxCount: 1}]),editUserProfile)

//Search User Route
router.get('/search-user',searchUser)

//Follow User Route
router.post('/follow-user',followUser)

//Get Following Posts
router.get('/fetch-follow-post',fetchFollowUserPost)

//Fetch follow List
router.post('/fetch-follow',followList)

//UnFollow User
router.post('/unFollow',unFollowUser)

//Export Statement
export default router;