import { Box, Button, InputLabel, TextField, CircularProgress, Icon } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

const PostForm = () => {
    const [image, setImage] = useState(null);
    const [data, setData] = useState("");
    const [loading, setLoading] = useState(false);
    const userId = localStorage.getItem("userId");

    const handlePostSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("image", image);
            formData.append("content", data);
            formData.append("userId", userId);

            const response = await axios.post(
                `${process.env.REACT_APP_API}/api/v1/post/create-post`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            if (response.status === 201) { // ✅ Fix response check
                alert("Post created successfully");
                setImage(null); // ✅ Reset form
                setData("");
            } else {
                alert("Something went wrong");
            }
        } catch (error) {
            console.error(error);
            alert("Error creating post");
        } finally {
            setLoading(false); // ✅ Fix loading state
        }
    };

    return (
        <Box sx={styles.container}>
            <Box sx={styles.postForm}>
                 
                <h2 style={styles.heading}>Create a Post</h2>

                <InputLabel>Enter Image</InputLabel>
                <input type="file" onChange={(e) => setImage(e.target.files[0])} required />

                <InputLabel>Enter Content</InputLabel>
                <TextField
                    type="text"
                    placeholder="Enter Content"
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                    required
                />

                <Button sx={styles.Button} onClick={handlePostSubmit} disabled={loading}>
                    {loading ? <CircularProgress size={24} color="inherit" /> : "Post"}
                </Button>
            </Box>
        </Box>
    );
};

export default PostForm;

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        borderRadius: "10px",
        height: "fit-content",
        
    },
    postForm: {
        width: "60%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "20px",
        margin: "10px",
        gap: "20px",
        background: "white",
        borderRadius: "20px",
    },
    Button: {
        color: "white",
        background: "linear-gradient(135deg, #ff00ff, #ff8c00)",

    },
    heading: {
        fontFamily: "sans-serif",
        textAlign: "center",
    },
};
