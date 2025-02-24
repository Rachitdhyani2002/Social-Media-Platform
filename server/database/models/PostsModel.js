//Import Statements
import mongoose from 'mongoose'




//Posts Schema
const postSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    content: { type: String, required: true },
    image: { type: String },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user",default:[]}],
    comments: [{
        userName: { type: String, required: true },
        profileImage :{type:String},
        commentsText: { type: String, required: true }, 
        createdAt: { type: Date, default: Date.now }
    }]
}, { timestamps: true })

//Post Model
const postModel = mongoose.model('post', postSchema)

//Export Statement
export default postModel