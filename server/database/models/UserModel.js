import mongoose from 'mongoose';

// User Schema
const userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    otp: {
        otp: { type: String },
        sendTime: { type: Date },
        token: { type: String }
    },
    primaryDevice: {
        deviceId: String,
        deviceName: String,
        lastLoginTime: Date
    },
    about:{type:String},
    dob:{type:String},
    profileImage:{type:String},
    coverImage:{type:String},
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }] 
    

}, { timestamps: true });

// Check if the model already exists before defining it
const userModel = mongoose.models.user || mongoose.model('user', userSchema);

// Export Statement
export default userModel;