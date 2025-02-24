import React from "react";
import Layout from "../../components/layout/Layout";
import { Box, Paper, Typography } from "@mui/material";

const PrivacyPolicy = () => {
  return (
    <Layout>
      <Box sx={styles.container}>
        <Paper sx={styles.policyCard}>
          <Typography variant="h4" sx={styles.title}>
            Privacy Policy
          </Typography>
          <Typography variant="body1" sx={styles.description}>
            Your privacy is important to us. We are committed to protecting your personal information and ensuring
            that your experience on our platform is secure and private.
          </Typography>
          <Typography variant="body1" sx={styles.description}>
            We do not share your data with third parties without your consent. All messages and interactions on our 
            platform are encrypted for your safety.
          </Typography>
          <Typography variant="body1" sx={styles.description}>
            If you have any questions about how we handle your data, feel free to contact us.
          </Typography>
          <img src='https://st4.depositphotos.com/15896940/24883/v/450/depositphotos_248837280-stock-illustration-security-people-protecting-computer-data.jpg' style={styles.image} />

        </Paper>
      </Box>
    </Layout>
  );
};

export default PrivacyPolicy;

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "85vh",
    padding: "10px",
    background: "linear-gradient(135deg, #6A11CB 0%, #2575FC 100%)", // Gradient Background
  },
  policyCard: {
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
