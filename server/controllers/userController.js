//Import Statement
import userModel from '../database/models/UserModel.js'
import postModel from '../database/models/PostsModel.js'
import JWT from 'jsonwebtoken'
import crypto from 'crypto'
import { sendMail } from '../middlewares/nodemailer/sendEmail.js'
import { hashPassword, comparePassword } from "../encryption/encryption.js"


//Register User Function
export const userRegisterController = async (req, res) => {
    try {
        //Destructuring Data
        const { name, email, password } = req.body

        //Checking If User Already Exist
        const existingUser = await userModel.findOne({ email })

        //If User Is Already Registered
        if (existingUser) { return res.status(409).send({ success: false, message: "User Already Exist Please LogIn" }) }

        //Hashing User Password
        const hashedUserPassword = await hashPassword(password);

        //Registering A New User To Database
        const newUser = await new userModel({ name, email, password: hashedUserPassword }).save()

        //Sending Ok Response To Client
        res.status(200).send({ success: true, message: "User Registration SuccessFully", newUser })
    }
    catch (error) {
        res.status(500).send({ success: false, message: "Error While Registering User", error: error })
        console.error(`Error While Registering User ${error}`)
    }
}

//User LogIn Function
export const userLogInController = async (req, res) => {
    try {
        //Destructuring Data
        const { email, password, deviceId, deviceName, phoneNumber } = req.body;

        //Checking If User Exist 
        const user = await userModel.findOne({ email })

        //If User Does Not Exist
        if (!user) { return res.status(409).send({ success: false, message: "Please Register Yourself First" }) }

        //Matching User Password And Previously Stored Hashed Password
        const match = await comparePassword(password, user.password)

        //If Password Does Not Match
        if (!match) { return res.status(409).send({ success: false, message: "Invalid Password" }) }


        //Generating JsonWebToken For User
        const token = JWT.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        //Sending Ok Response To User 
        res.status(200).send({ success: true, message: "User Successfully Logged In", user, token })


    }
    catch (error) {
        res.status(500).send({ success: false, message: "Error While LogIn", error: error })
        console.error(`Error While LogIn ${error}`)
    }
}

//Get All Users
export const getUserProfile = async (req, res) => {
    try {
        const { userId } = req.body
        const user = await userModel.findById(userId)
        res.status(200).send({ success: true, message: "User Info", user })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//Forget Password 
export const forgetPasswordController = async (req, res, next) => {
    try {
        //Destructuring Data
        const { email } = req.body

        //Checking if user's email exists or not
        const findUser = await userModel.findOne({ email })

        //If user email not found
        if (!findUser) { return res.status(409).send({ success: false, message: "No user found" }) }

        //Finding if otp already exist 
        if (findUser.otp.otp && new Date(findUser.otp.sendTime).getTime() > new Date().getTime()) {
            return res.status(409).send({ success: false, message: `Please wait until ${new Date(findUser.otp.sendTime).toLocaleTimeString()} ` })
        }

        //Generating a six digit otp for user 
        const otp = Math.floor(Math.random() * 90000) + 100000

        //Generating a otp token for user 
        const token = crypto.randomBytes(32).toString('hex')

        //Setting generated otp and token in user's database that we have found
        findUser.otp = { otp, sendTime: new Date().getTime() + 1 * 60 * 1000, token };

        //Saving otp sendTime and token in user's database
        await findUser.save()

        //Sending otp to user's email
        sendMail(otp, email)

        //Sending ok response to user
        res.status(200).send({ success: true, message: "Please check your email for otp", token })

    }
    catch (error) {
        res.status(500).send({ success: false, message: "Error While Updating Password", error: error })
        console.error(`Error While LogIn ${error}`)

    }
}


//Verify OTP 
export const verifyOtpController = async (req, res) => {
    try {
        //Destructuring Data
        const { otp } = req.body

        //Checking otp in console 
        console.log("Received otp" + " " + otp)

        //Finding user on the basis of otp
        const findUser = await userModel.findOne({ 'otp.otp': otp })
        console.log(findUser)

        //If user not found 
        if (!findUser) { return res.status(409).send({ success: false, message: "Invalid OTP" }) }

        //If otp is expired
        if (new Date(findUser.otp.sendTime).getTime() < new Date().getTime()) { return res.status(409).send({ success: false, message: "OTP expired" }) }

        //Setting otp value to null
        findUser.otp.otp = null

        //Saving new values
        await findUser.save()

        //Sending ok response
        res.status(200).send({ success: true, message: "OTP verified" })

    }
    catch (error) {
        res.status(500).send({ success: false, message: "Error While Updating Password", error: error })
        console.error(`Error While LogIn ${error}`)
    }
}

//Get OTP Time 
export const getOtpTimeController = async (req, res) => {
    try {

        //Destructuring Token 
        const { token } = req.body

        //Finding user on the basis of token that we have generated before
        const findUser = await userModel.findOne({ 'otp.token': token }).select('otp')
        console.log(findUser)

        //If user not found 
        if (!findUser) { return res.status(404).send({ success: false, message: "Something went wrong" }) }

        //Sending ok response and otp sendTime to user
        res.status(200).send({ success: true, message: "Otp time fetched", sendTime: findUser.otp.sendTime })
    }
    catch (error) {
        res.status(404).send({ success: true, message: "Error while getting otp time" })
    }
}

//Update Password 
export const updateUserPasswordController = async (req, res) => {
    try {

        //Destructuring Data
        const { password, confirmPassword, token } = req.body

        //Finding user on the basis of otp token
        const findUser = await userModel.findOne({ 'otp.token': token })

        //If user not found
        if (!findUser) { return res.status(409).send({ success: true, message: "No user found" }) }

        //If user spent more than 5 min while updating password 
        if (new Date(findUser.otp.sendTime).getTime() + 5 * 60 * 1000 < new Date().getTime()) {
            return res.status(409).send({ success: false, message: "Something went wrong" })
        }

        //If password and confirm doesn't match with each other
        if (password !== confirmPassword) { return res.status(409).send({ success: false, message: "Password does not match" }) }

        //Hashing user's new password
        const hashedPassword = await hashPassword(password)

        //Setting user's hashed password 
        findUser.password = hashedPassword

        //Setting otp values to null as password has updated so there no need for otp now
        findUser.otp.sendTime = null
        findUser.otp.token = null

        //Saving user's info 
        await findUser.save()

        //Sending ok response
        res.status(200).send({ success: true, message: "Password successfully updated" })
    }
    catch (error) {
        console.error(error)
    }
}

//Edit User Profile
export const editUserProfile = async (req, res) => {
    try {
        console.log("Received Files:", req.files ? Object.keys(req.files) : "No files received");
        console.log("Received Body:", req.body);

        const { about, dob, userId } = req.body;

        if (!userId) {
            return res.status(400).send({ success: false, message: "User ID is required" });
        }

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).send({ success: false, message: "No user found" });
        }

        const profileImage = req.files?.profileImage ? req.files.profileImage[0].filename : user.profileImage;
        const coverImage = req.files?.coverImage ? req.files.coverImage[0].filename : user.coverImage;

        user.about = about || user.about;
        user.dob = dob || user.dob;
        user.profileImage = profileImage;
        user.coverImage = coverImage;

        await user.save();

        res.status(200).send({ success: true, message: "Profile Successfully Updated" });

    } catch (error) {
        console.error("Error while updating profile:", error);
        res.status(500).send({ success: false, message: "Error while updating profile" });
    }
};


//Search User Function
export const searchUser = async (req, res) => {
    try {
        const query = req.query.query?.trim();
        console.log("Received query:", req.query); // ✅ Log the query
        if (!query) {
            return res.status(400).send({ success: false, message: 'Search query required' })
        }

        const user = await userModel.find({
            $or: [
                { name: { $regex: query, $options: 'i' } }
            ]
        }).select("name email profileImage");

        res.status(200).send({ success: true, message: "Results", user })
    }
    catch (err) {
        console.error("Error while updating profile:", err);
        res.status(500).send({ success: false, message: "Error while fetching profile" });
    }
}

//Follow User Function
export const followUser = async (req, res) => {
    try {
        const { currentUserId, followId } = req.body;

        const user = await userModel.findById(currentUserId);
        const followUser = await userModel.findById(followId);

        if (!user && !followUser) { return res.status(400).send({ success: false, message: "Sorry! No user found" }) }

        if (user.following.includes(followId)) {
            return res.status(400).send({ success: false, message: "Already following" })
        }

        user.following.push(followId)
        followUser.followers.push(user)

        await user.save();
        await followUser.save();
        res.status(200).send({ success: true, message: "Followed successfully", following: user.following.length });
    }
    catch (err) {
        res.status(500).send({ success: false, message: "Error while following" });
    }
}

//Fetch Following Users Posts 
export const fetchFollowUserPost = async (req, res) => {
    try {
        const { userId } = req.query
        console.warn(userId)
        const user = await userModel.findById(userId)
        const followingUsers = user.following
        console.log(followingUsers)
        const followingIds = followingUsers.map((item) => item._id)
        console.warn(followingIds)
        const posts = await postModel.find({ userId: { $in: followingIds } }).populate("userId", "name profileImage")
        console.log("Posts" + " " + posts)
        console.log(posts.content)

        res.status(200).send({ success: true, message: "User following posts fetched", posts })

    }
    catch (err) {
        res.status(500).send({ success: false, message: "Error while fetching" });
    }
}

//Fetch followList Controller
export const followList = async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) {
            return res.status(200).send({ success: false, message: "User Id required" })
        }
        const user = await userModel.findById(userId).populate('following', "name profileImage email")

        res.status(200).send({ success: true, message: "Following list fetched", followers: user.following });


    }
    catch (error) {
        res.status(500).send({ success: false, message: "Error while fetching" });
    }
}

//UnFollow User Controller
export const unFollowUser = async (req, res) => {
    try {
        const { userId, followingId } = req.body;
        if (!userId || !followingId) {
            return res.status(400).json({ success: false, message: "User ID and Follower ID are required" });
        }
        const user = await userModel.findByIdAndUpdate(userId, { $pull: { following: followingId } }, { new: true })
        if (!user) {return res.status(404).json({ success: false, message: "User not found" });}

        res.status(200).send({ success: true, message: "UnFollowed User Successfully" })

    }
    catch (error) {
        res.status(500).send({ success: false, message: "Error while unFollowing" });
    }
}
