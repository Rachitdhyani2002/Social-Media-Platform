import React from "react";
import Layout from "../../components/layout/Layout";
import { Box, Button, Typography, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from '@mui/material';

const Settings = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    const confirmLogout = window.confirm("Are you sure?")

    if (confirmLogout) {
      localStorage.removeItem('accessToken')
      sessionStorage.removeItem('accessToken')
      navigate('/')
    }

  }

  return (
    <Layout>
      <Box sx={styles.container}>
        <Box sx={styles.card}>
          <Typography variant="h5" sx={styles.heading}>

            Settings

          </Typography>
          <Divider sx={{ mb: 2, backgroundColor: "rgba(255, 255, 255, 0.5)" }} />
          <Box sx={styles.buttonContainer}>
            <Button variant="contained" sx={styles.button} onClick={() => navigate("/edit-profile")}>
              Edit Profile
            </Button>
            <Button variant="contained" sx={styles.button} onClick={() => navigate("/followers-card")}>Chat</Button>
            <Button variant="contained" sx={styles.button} onClick={() => navigate("/about")}>About Us</Button>
            <Button variant="contained" sx={styles.button} onClick={() => navigate("/privacy-policy")}>Privacy Policy</Button>
            <Button variant="contained" sx={styles.logoutButton} onClick={handleLogOut}>Log Out</Button>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default Settings;

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(135deg, #6a11cb, #2575fc)",
    flexDirection:"column"
  },

  card: {
    width: "100%",
    maxWidth: "300px",
    padding: "24px",
    borderRadius: "12px",
    backdropFilter: "blur(10px)",
    background: "rgba(255, 255, 255, 0.15)",
    boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.3)",
    textAlign: "center",
    color: "#fff",
  },

  heading: {
    fontSize: "22px",
    fontWeight: "600",
    textShadow: "0px 2px 5px rgba(0, 0, 0, 0.3)",
  },

  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  button: {
    background: "linear-gradient(135deg, #ff00ff, #ff8c00)",
    color: "#fff",
    padding: "12px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "500",
    textTransform: "none",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    "&:hover": {
      transform: "scale(1.1)",
      boxShadow: "0px 5px 20px rgba(255, 0, 255, 0.5)",
    },
  },

  logoutButton: {
    background: "linear-gradient(135deg, #ff4b4b, #b71c1c)",
    color: "#fff",
    padding: "12px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "500",
    textTransform: "none",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    "&:hover": {
      transform: "scale(1.1)",
      boxShadow: "0px 5px 20px rgba(255, 0, 0, 0.5)",
    },
  },
};
