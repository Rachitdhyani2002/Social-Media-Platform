//Import statements
import mongoose from 'mongoose'

//Chat Schema
const chatSchema = new mongoose.Schema({
    sender:{type:String,required:true},
    receiver:{type:String,required:true},
    text:{type:String}
},{timestamps:true})

//Chat Model
const chatModel  = mongoose.model('chats',chatSchema);

//Export Statements
export default chatModel;