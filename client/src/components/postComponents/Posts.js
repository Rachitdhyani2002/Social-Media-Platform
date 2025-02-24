import { Avatar, Box, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Posts = () => {
  const userId = localStorage.getItem('userId');
  const [homePosts, setHomePosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHomePosts();
  }, []);

  const fetchHomePosts = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/fetch-follow-post`, { params: { userId } });
      if (response.status === 200 && Array.isArray(response.data.posts)) {
        setHomePosts(response.data.posts);
      }
    } catch (err) {
      console.log("Error fetching posts:", err);
    }
  };

  const handleLike = async (postId) => {
    try {
      setHomePosts(prevPosts =>
        prevPosts.map(post =>
          post._id === postId
            ? {
              ...post,
              likes: Array.isArray(post.likes) && post.likes.includes(userId)
                ? post.likes.filter(id => id.toString() !== userId)  // Unlike
                : [...(Array.isArray(post.likes) ? post.likes : []), userId]  // Like
            }
            : post
        )
      );

      const response = await axios.post(`${process.env.REACT_APP_API}/api/v1/post/like-post`, { userId, postId });

      if (response.status === 200 && Array.isArray(response.data.likes)) {
        setHomePosts(prevPosts =>
          prevPosts.map(post =>
            post._id === postId ? { ...post, likes: response.data.likes } : post
          )
        );
      }
    } catch (err) {
      console.error("Error in liking post:", err);
    }
  };

  return (
    <Box sx={styles.Posts}>
      <Box sx={{marginBottom:'70px'}}>
        {homePosts.length > 0 ? (
          homePosts.map((post) => (
            <Paper key={post._id} sx={styles.postContainer}>
              <Box sx={styles.header}>
                <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <Avatar
                    src={`${process.env.REACT_APP_API}/uploads/${post.userId.profileImage}`}
                    alt={post.userId.name}
                    sx={{ width: 30, height: 30 }}
                  />
                  <span style={styles.username}>{post.userId.name}</span>
                </Box>
                <span style={styles.createdDate}>{new Date(post.createdAt).toLocaleString()}</span>
              </Box>

              <img src={`${process.env.REACT_APP_API}/uploads/${post.image}`} style={styles.postsImage} alt="Post" />

              <Box sx={styles.postsDescription}>
                <Box sx={styles.postsIcons}>
                  <Box onClick={() => handleLike(post._id)} style={{ cursor: "pointer" }}>
                    {Array.isArray(post.likes) && post.likes.includes(userId)
                      ? <FavoriteIcon sx={{ color: "#ff007f" }} />
                      : <FavoriteBorderIcon sx={{ color: "white" }} />}
                  </Box>
                  <Box onClick={() => navigate(`/full-post/${post._id}`, { state: { post } })}>
                    <ModeCommentIcon sx={{ color: "white" }} />
                  </Box>
                  <ShareIcon sx={{ color: "white", }} />
                </Box>

                <Box sx={styles.postBox}>
                  <p style={styles.likesText}>{post.likes.length} likes</p>
                  <Box sx={{ display: "flex", marginTop:"0"}}>
                    <span style={styles.username}>{post.userId.name}</span>
                    <span style={styles.postContent}>{post.content}</span>
                  </Box>
                </Box>
              </Box>
            </Paper>
          ))
        ) : (
          <p style={styles.noPosts}>No posts available. Follow someone to see their posts.</p>
        )}
      </Box>
    </Box>
  );
};

export default Posts;

const styles = {
  Posts: {
    width: "100%",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    background: "linear-gradient(135deg, #6a11cb, #2575fc)",
    color: "#0ff",
  },
  
  postsImage: {
    width: "100%",
    maxHeight: "30rem",
    objectFit: "cover",
    borderRadius: "10px",
   
  },
  postsIcons: {
    display: "flex",
    flexDirection: "row",
    gap: "15px",
    cursor: "pointer",
    width: "100%",
    marginTop:"5px"
  },
  postsDescription: {
    textAlign: "left",
    width: "100%",
    color: "#fff",
  },
  postContainer: {
    padding: "12px",
    margin: "10px",
    borderRadius: "10px",
    transition: "0.3s",
    background: "linear-gradient(135deg, #ff00ff, #ff8c00)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    paddingBottom: "10px",
    
  },
  username: {
    fontSize: "15px",
    fontWeight: "500",
    color: "white",
    fontFamily:"sans-serif",
    marginLeft:'5px'
   
  },
  createdDate: {
    fontSize: "8px",
    color: "white",
    fontFamily:"sans-serif",
    marginTop:'12px',
    marginRight:"10px"
  },
  postBox: {
    marginTop: "3px",
    padding:"0",
  },
  postContent: {
    fontSize: "12px",
    color: "white",
    fontFamily:"sans-serif",
    marginLeft:'5px'
  },
  likesText: {
    fontSize: "15px",
    color: "white",
    marginTop:"0",
    marginLeft:'5px',
    fontFamily:"sans-serif",
  },
  noPosts: {
    textAlign: "center",
    fontSize: "16px",
    color: "gray",
  },
  image:{
    width:"250px",
    height:"250px",
    mixBlendMode: "multiply"
  }
};
