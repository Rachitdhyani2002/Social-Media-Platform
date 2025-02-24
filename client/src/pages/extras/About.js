import React from "react";
import Layout from "../../components/layout/Layout";
import { Box, Paper, Typography } from "@mui/material";

const AboutUs = () => {
  return (
    <Layout>
      <Box sx={styles.container}>
        <Paper sx={styles.aboutCard}>
          <Typography variant="h4" sx={styles.title}>
            About Us
          </Typography>
          <Typography variant="body1" sx={styles.description}>
            Welcome to our platform! We are committed to connecting people through seamless and secure communication. 
            Our mission is to provide a user-friendly chat experience with real-time interactions.
          </Typography>
          <Typography variant="body1" sx={styles.description}>
            Built with the latest technologies, our platform ensures privacy, efficiency, and ease of use.
            Join us and be part of a growing community!
          </Typography>

          <img src='https://img.freepik.com/free-vector/brainstorming-concept-landing-page_52683-26979.jpg' style={styles.image} />

        </Paper>
      </Box>
    </Layout>
  );
};

export default AboutUs;

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    minHeight: "100vh",
    padding: "10px",
    background: "linear-gradient(135deg, #6A11CB 0%, #2575FC 100%)", // Gradient Background
  },
  aboutCard: {
    width: "100%",
    maxWidth: "600px",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow:
      "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
      background: "linear-gradient(135deg, #ff00ff, #ff8c00)",
  },
  title: {
    fontFamily: "sans-serif",
    fontWeight: "bold",
    marginBottom: "15px",
    color: "#fff", // Same as sender message color
  },
  description: {
    fontFamily: "sans-serif",
    fontSize: "16px",
    color: "#333",
    marginBottom: "10px",
  },
  image:{
    width:"250px",
    height:"250px",
    mixBlendMode: "multiply"
  }
};
