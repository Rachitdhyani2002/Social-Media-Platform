import React, { useEffect, useState } from 'react';
import Layout from '../../components/layout/Layout';
import { Avatar, Box, IconButton, Paper, TextField } from '@mui/material';
import { useLocation } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import { io } from 'socket.io-client';
import axios from 'axios';

const socket = io("https://social-media-platform-utga.onrender.com");

const UserChat = () => {
  const location = useLocation();
  const user = location.state?.receiver; // Receiver details from navigation state
  const sender = localStorage.getItem('userId'); // Logged-in user ID

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (!user || !sender) return;

    // Join the chat room
    socket.emit("joinChat", { sender, receiver: user._id });

    // Fetch previous messages
    axios.get(`${process.env.REACT_APP_API}/api/v1/chat/get-messages/${sender}/${user._id}`)
      .then((res) => setMessages(res.data))
      .catch((err) => console.error("Error fetching messages:", err));

    // Listen for new messages
    socket.on('receiveMessage', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [user, sender]);

  const sendMessage = () => {
    if (newMessage.trim() === "") return;

    const messageData = {
      sender,
      receiver: user._id,
      text: newMessage
    };

    // Emit the message via socket
    socket.emit("sendMessage", messageData);
    setNewMessage("");
  };

  return (
    <Layout>
      <Box sx={styles.container}>
        <Paper sx={styles.chatContainer}>
          {/* Chat Header */}
          <Box sx={styles.header}>
            <Avatar
              src={`${process.env.REACT_APP_API}/uploads/${user.profileImage}`}
              alt={user.name}
              sx={{ width: 50, height: 50, border: "2px solid white" }}
            />
            <span style={styles.username}>{user.name}</span>
          </Box>

          {/* Chat Messages */}
          <Box sx={styles.chatBox}>
            {messages.map((msg, index) => (
              <Box
                key={index}
                sx={msg.sender === sender ? styles.senderMsg : styles.receiverMsg}
              >
                {msg.text}
              </Box>
            ))}
          </Box>

          {/* Chat Input */}
          <Box sx={styles.inputContainer}>
            <TextField
              type="text"
              placeholder="Type a message..."
              fullWidth
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={sendMessage} sx={styles.sendButton}>
                    <SendIcon />
                  </IconButton>
                ),
              }}
            />
          </Box>
        </Paper>
      </Box>
    </Layout>
  );
};

export default UserChat;

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    background: "linear-gradient(135deg, #6a11cb, #2575fc)", // SAME AS FullPostPage
    height:"100vh",
    position:"fixed",
    
  },
  chatContainer: {
    width: "100%",
    maxWidth: "400px",
    height: "80vh",
    display: "flex",
    flexDirection: "column",
    borderRadius: "15px",
    textAlign: "center",
    color: "#fff",
    background: "rgba(255, 255, 255, 0.1)", // Transparent effect
    backdropFilter: "blur(10px)",
    boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
    marginBottom:"150px",
    scrollbarWidth: "none", // Hide scrollbar in Firefox
    msOverflowStyle: "none", 
    margin:"20px",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: "10px",
    padding: "15px",
    fontFamily: "sans-serif",
    fontSize: "16px",
    fontWeight: "bold",
    borderBottom: "2px solid rgba(255, 255, 255, 0.2)",
  },
  username: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "white",
  },
  chatBox: {
    flex: 1,
    overflowY: "auto",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    scrollbarWidth: "none", // Hide scrollbar in Firefox
    msOverflowStyle: "none", 
    
  },
  senderMsg: {
    alignSelf: "flex-end",
    background: "#FF00FF",
    color: "white",
    fontFamily: "sans-serif",
    padding: "10px",
    borderRadius: "15px",
    maxWidth: "70%",
    boxShadow: "rgba(0, 0, 0, 0.3) 0px 3px 6px",
    
  },
  receiverMsg: {
    alignSelf: "flex-start",
    background: "#ccc",
    color: "black",
    fontFamily: "sans-serif",
    padding: "10px",
    borderRadius: "15px",
    maxWidth: "70%",
    boxShadow: "rgba(0, 0, 0, 0.3) 0px 3px 6px",
  },
  inputContainer: {
    padding: "15px",
    borderTop: "2px solid rgba(255, 255, 255, 0.2)",
  },
  sendButton: {
    color: "#FF00FF",
  },
};
