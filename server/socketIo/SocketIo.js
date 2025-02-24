import { Server } from "socket.io";
import ChatModel from '../database/models/ChatModel.js'

export const socketInit = (server)=>{
     const io = new Server(server,{
          cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST"]
        }
     })

     io.on("connection",(socket)=>{
           console.log(`New User Connected ${socket.id}`);
           socket.on("joinChat",({sender,receiver})=>{
              const roomId = [sender,receiver].sort().join('-')
              socket.join(roomId);
           })
           socket.on("sendMessage",async({sender,receiver,text})=>{
               const roomId = [sender,receiver].sort().join("-"); 
               console.log("Sender"+sender)
               const newMessage = new ChatModel({sender,receiver,text})
               await newMessage.save()
               console.log(`New Message ${text}`);
               io.to(roomId).emit("receiveMessage",{sender,receiver,text});
           })
           socket.on("disconnected",()=>{
            console.log("User disconnected:", socket.id);
           })
     })
}
