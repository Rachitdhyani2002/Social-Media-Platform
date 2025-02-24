import { Avatar, Button, IconButton, List, ListItem, ListItemAvatar, ListItemText, Paper, Box } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Layout from '../layout/Layout';
import ChatIcon from "@mui/icons-material/Chat";
import { useNavigate } from 'react-router-dom';

const FollowersCard = () => {
   const userId = localStorage.getItem('userId');
   const [followers, setFollowers] = useState([]);
   const navigate = useNavigate();

   useEffect(() => {
      fetchFollowList();
   }, []);

   const fetchFollowList = async () => {
      try {
         const response = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/fetch-follow`, { userId });
         if (response.status === 200) {
            setFollowers(response.data.followers);
         }
      } catch (error) {
         console.log(error);
      }
   };

   const unFollow = async (followingId) => {
      try {
         const response = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/unFollow`, { userId, followingId });
         if (response.status === 200) {
            fetchFollowList();
         }
      } catch (err) {
         console.log(err);
      }
   };

   return (
      <Layout>
         <Box sx={styles.container}>
            <Paper sx={styles.FollowersCard}>
               <span style={styles.Title}>Following List</span>
               <List sx={styles.List}>
                  {followers.length > 0 ? (
                     followers.map((item) => (
                        <ListItem sx={styles.ListItem} key={item._id}>
                           <ListItemAvatar>
                              <Avatar src={`${process.env.REACT_APP_API}/uploads/${item.profileImage}`} />
                           </ListItemAvatar>
                           <ListItemText 
                              primary={<span style={styles.userName}>{item.name}</span>} 
                              secondary={<span style={styles.email}>{item.email}</span>} 
                           />
                           <Button sx={styles.followButton} onClick={() => unFollow(item._id)}>UnFollow</Button>
                           <IconButton onClick={() => navigate(`/chat/${item._id}`, { state: { receiver: item } })}>
                              <ChatIcon sx={{ color: "white" }} />
                           </IconButton>
                        </ListItem>
                     ))
                  ) : (
                     <p style={styles.noFollowers}>You are not following anyone.</p>
                  )}
               </List>
            </Paper>
         </Box>
      </Layout>
   );
};

export default FollowersCard;

const styles = {
   container: {
      width: "100%",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      background: "linear-gradient(135deg, #6a11cb, #2575fc)", // SAME AS FullPostPage
   },
   FollowersCard: {
      width: "90%",
      maxWidth: "400px",
      borderRadius: "10px",
      boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
      padding: "15px",
      background: "rgba(255, 255, 255, 0.1)", // Transparent effect
      backdropFilter: "blur(10px)",
      color: "white",
      textAlign: "center",
      height:"100vh"
   },
   Title: {
      fontFamily: "sans-serif",
      fontSize: "18px",
      fontWeight: "bold",
      textAlign: "center",
   },
   followButton: {
      background: "white",
      color: "#FF00FF",
      fontSize: "12px",
      padding: "5px 10px",
      borderRadius: "20px",
      fontWeight: "bold",
   },
   List: {
      width: "100%",
      padding: "10px",
   },
   ListItem: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "10px",
      borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
   },
   userName: {
      fontSize: "14px",
      fontWeight: "bold",
      color: "white",
   },
   email: {
      fontSize: "12px",
      color: "#ccc",
   },
   noFollowers: {
      textAlign: "center",
      fontSize: "14px",
      color: "white",
   },
};
