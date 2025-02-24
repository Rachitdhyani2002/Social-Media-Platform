import { Box, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Layout from '../layout/Layout';
import axios from 'axios';

const ProfileCard = () => {
    const userId = localStorage.getItem("userId");
    const [user, setUser] = useState("");
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const [userInfo, userPosts] = await Promise.allSettled([
            axios.post(`${process.env.REACT_APP_API}/api/v1/auth/get-user`, { userId }),
            axios.post(`${process.env.REACT_APP_API}/api/v1/post/get-post`, { userId })
        ]);

        if (userInfo.status === "fulfilled") {
            setUser(userInfo.value.data.user);
        } else {
            console.error("Error fetching user:", userInfo.reason);
        }

        if (userPosts.status === "fulfilled") {
            setPosts(userPosts.value.data.userPost || []);
        } else {
            console.error("Error fetching user posts:", userPosts.reason);
        }
    };

    return (
        <Layout>
            <Box sx={styles.box}>
                {/* Profile Card */}
                <Paper sx={styles.ProfileCard}>
                    <Box sx={styles.ProfileImages}>
                        <Box sx={styles.CoverImage}>
                            <img
                                src={`${process.env.REACT_APP_API}/uploads/${user.coverImage}`}
                                alt="Cover"
                                style={{ width: "100%", maxWidth: "350px", maxHeight: '200px', borderRadius: "10px" }}
                            />
                        </Box>
                        <Box sx={styles.ProFileImage}>
                            <img
                                src={`${process.env.REACT_APP_API}/uploads/${user.profileImage}`}
                                alt="Profile"
                                style={{ width: "100px", height: "100px", borderRadius: "50%" }}
                            />
                        </Box>
                    </Box>
                    <Box sx={styles.ProfileInfo}>
                        <span style={styles.ProfileName}>{user.name}</span>
                        <span style={styles.ProfileBio}>{user.about}</span>
                    </Box>
                    <Box sx={styles.followStatus}>
                        <hr style={styles.divider} />
                        <Box sx={styles.followBox} onClick={() => navigate('/followers-card')}>
                            <Box sx={styles.follow}>
                                <span>{user?.following?.length || 0}</span>
                                <span>Following</span>
                            </Box>
                            <Box sx={styles.followers}>
                                <span>{user?.followers?.length || 0}</span>
                                <span>Followers</span>
                            </Box>
                        </Box>
                        <hr style={styles.divider} />
                    </Box>
                    <Box sx={styles.linkBox}>
                        <Link to="/edit-profile" style={styles.link}>Edit Profile</Link>
                    </Box>
                </Paper>

                {/* User Posts */}
                <Paper sx={styles.userPostContainer}>
               
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <Box
                                key={post._id}
                                sx={styles.userPost}
                                onClick={() => navigate(`/full-post/${post._id}`, { state: { post } })}
                            >
                                {post.image && (
                                    <Box sx={styles.PostImage}>
                                        
                                        <img
                                            src={`${process.env.REACT_APP_API}/uploads/${post.image}`}
                                            alt="Post"
                                            style={styles.responsiveImage}
                                        />
                                    </Box>
                                )}
                            </Box>
                        ))
                    ) : (
                        <p style={styles.noPosts}>You haven't posted anything yet.</p>
                    )}
                </Paper>
            </Box>
        </Layout>
    );
};

export default ProfileCard;

const styles = {
    box: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "15px",
        gap: "40px",
        background: "linear-gradient(135deg, #6a11cb, #2575fc)",
    },
    ProfileCard: {
        borderRadius: "16px",
        backdropFilter: "blur(10px)",
        background: "linear-gradient(135deg, #ff00ff, #ff8c00)",
        boxShadow: "0 8px 32px rgba(0, 255, 255, 0.2)",
        border: "1px solid rgba(0, 255, 255, 0.2)",
        textAlign: "center",
        width: "90%",
        maxWidth: "400px",
        color: "#0ff",
        textShadow: "0 0 8px #0ff",
        margin: "10px",
        padding: "5px"
    },

    ProfileImages: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },

    ProfileInfo: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "5px",
        marginTop: "10px",
    },

    ProfileName: {
        fontFamily: "sans-serif",
        fontSize: "18px",
        fontWeight: "bold",
        color: "#fff",
    },

    ProfileBio: {
        fontSize: "12px",
        color: "#fff",
        textShadow: " rgba(0, 255, 255, 0.5)",
        fontFamily: "sans-serif"
    },

    CoverImage: {
        width: "100%",
        height: "auto",
        borderRadius: "10px",
    },

    ProFileImage: {
        marginTop: "-50px",
        position: 'relative',
        borderRadius: "50%",
        transition: "0.3s ease-in-out",
        ":hover": {
            transform: "scale(1.1)",
        },
    },

    followStatus: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "15px",
    },

    divider: {
        width: "90%",
        backgroundColor: "rgba(255, 255, 255, 0.5)"
    },

    followBox: {
        display: "flex",
        justifyContent: "center",
        width: "100%",
        fontFamily: "sans-serif",
        padding: "8px",
        gap: "30px",
        color: "#fff",
        cursor: "pointer",

    },

    follow: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },

    followers: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderLeft: "1px solid #FF00FF",
        paddingLeft: "12px",
    },

    linkBox: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "10px",
    },

    link: {
        textDecoration: "none",
        padding: "10px",
        fontFamily: "Orbitron, sans-serif",
        color: "#fff",
        fontSize: "14px",
    },

    userPostContainer: {
        width: "100%",
        maxWidth: "330px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(80px, 1fr))",
        alignItems: "center",
        padding: "10px",
        background: "linear-gradient(135deg, #ff00ff, #ff8c00)",
        borderRadius: "16px",
        marginBottom: "80px"
    },

    userPost: {
        cursor: "pointer",
        transition: "0.3s ease-in-out",
        ":hover": {
            transform: "scale(1.05)",
        },
        marginBottom: "50px"
    },

    PostImage: {
        width: "100%",
        padding: "2px",
    },

    responsiveImage: {
        width: "100%",
        maxWidth: "100px",
        minWidth: "80px",
        height: "80px",
        borderRadius: "5px",
        transition: "0.3s ease-in-out",
    },

    noPosts: {
        color: "#888",
        fontSize: "14px",
        fontFamily: "Orbitron, sans-serif",
        textShadow: "0px 0px 5px #FF00FF",
    },
};
