import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import { Avatar, Box, IconButton, Paper, TextField } from "@mui/material";
import { useLocation } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";

const FullPostPage = () => {
  const location = useLocation();
  const post = location.state?.post;

  const postId = post?._id;
  const userId = localStorage.getItem("userId");
  const [commentsText, setCommentsText] = useState("");
  const [comments, setComments] = useState(post?.comments || []);

  const handleComments = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/post/add-comment`,
        { userId, postId, commentsText }
      );
      if (response.status === 200) {
        setCommentsText("");
        setComments(response.data.comments);
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <Layout>
      <Box sx={styles.postContainer}>
        <Box sx={styles.post}>
          {post?.image && (
            <Paper sx={styles.postBox}>
              <Box sx={styles.header}>
                <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <Avatar
                    src={`${process.env.REACT_APP_API}/uploads/${post.userId?.profilePic || ""}`}
                    alt={post.userId?.name || "User"}
                    sx={{ width: 30, height: 30 }}
                  />
                  <span style={styles.username}>{post.userId?.name || "Unknown"}</span>
                </Box>
                <span style={styles.createdDate}>
                  {post?.createdAt ? new Date(post.createdAt).toLocaleString() : "Unknown Date"}
                </span>
              </Box>
              <img
                src={`${process.env.REACT_APP_API}/uploads/${post.image}`}
                alt="Post"
                style={{ width: "100%", maxWidth: "600px", borderRadius: "8px" }}
              />
              <Box sx={styles.postInfo}>
                <span style={{ fontFamily: "sans-serif", fontSize: "12px" }}>
                  Liked by {post?.likes?.length || 0}
                </span>
                <span style={{ fontFamily: "sans-serif", fontSize: "14px" }}>
                  {post.userId?.name}{" "}
                  <span style={{ fontFamily: "sans-serif", fontSize: "13px" }}>
                    {post.content}
                  </span>
                </span>
              </Box>
              <Box sx={styles.commentBox}>
                <TextField
                  type="text"
                  placeholder="Add a comment"
                  fullWidth
                  value={commentsText}
                  onChange={(e) => setCommentsText(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <IconButton onClick={handleComments} disabled={!commentsText.trim()}>
                        <SendIcon />
                      </IconButton>
                    ),
                  }}
                />
              </Box>
              <Box sx={styles.comments}>
                <p style={{ fontFamily: "sans-serif",textAlign:"center" }}>All comments</p>
                {comments.length > 0 ? (
                  comments.map((comment, index) => (
                    <Box key={index} sx={styles.commentItem}>
                      <Avatar
                        src={`${process.env.REACT_APP_API}/uploads/${comment.userProfile || ""}`}
                        alt={comment.userName || "User"}
                        sx={{ width: 20, height: 20, margin: "2px" }}
                      />
                      <Box sx={styles.commentInfo}>
                        <span style={{ fontSize: "13px", fontFamily: "sans-serif",textAlign:"left" }}>
                          {comment.userName || "Unknown"}
                        </span>
                        <p style={{ fontSize: "12px", margin: "2px", fontFamily: "sans-serif" }}>
                          {comment.commentsText}
                        </p>
                      </Box>
                    </Box>
                  ))
                ) : (
                  <p style={{ color: "grey", fontFamily: "sans-serif", fontSize: "14px" }}>
                    No one has commented yet.
                  </p>
                )}
              </Box>
            </Paper>
          )}
        </Box>
      </Box>
    </Layout>
  );
};

export default FullPostPage;

const styles = {
  postContainer: {
    width: "100%",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    marginBottom: "50px",
    background: "linear-gradient(135deg, #6a11cb, #2575fc)",
  },
  post: {
    width: "90%",
    maxWidth: "400px",
    marginBottom: "50px",
    margin:"10px"
  },
  postInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    margin: "10px 0",
  },
  commentBox: {
    margin: "10px",
    display: "flex",
    alignItems: "center",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: "10px",
  },
  username: {
    fontFamily: "sans-serif",
    fontSize: "14px",
    marginLeft: "8px",
  },
  createdDate: {
    fontFamily: "sans-serif",
    fontSize: "12px",
    color: "grey",
    marginRight: "15px",
  },
  postBox: {
    borderRadius: "10px",
    boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
    width: "95%",
    maxWidth: "600px",
    padding:"10px"
  },
  comments: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
     overflowY: "auto",
    maxHeight: "200px",
    width: "100%",
    padding: "10px",
    marginBottom:"50px",
    scrollbarWidth: "none", // Hide scrollbar in Firefox
    msOverflowStyle: "none", 
  },
  commentItem: {
    display: "flex",
    alignItems: "left",
    gap: "5px", // Reduce the gap between avatar and text
    marginBottom: "8px",
  },
  commentInfo: {
    display: "flex",
    flexDirection: "row", // Change from column to row
    alignItems: "center",
    gap: "5px",
  },
  "@media (max-width: 768px)": {
    postBox: {
      padding: "10px",
    },
    comments: {
      maxHeight: "300px",
    },
  },
};
