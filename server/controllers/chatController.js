//Import statements
import chatModel from "../database/models/ChatModel.js"



export const getMessageController=async(req,res)=>{
     try{
          const {sender,receiver} = req.params
          const message = await chatModel.find({
            $or:[
              {sender,receiver},
              {sender:receiver,receiver:sender}
            ]
          })
          res.status(200).send(message);
     }
     catch(error){
         res.status(400).send({success:false,message:"Error while getting message",Error:error})
     }
} 