import React, { useState } from "react";
import { Box, IconButton, Modal } from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import Person2Icon from "@mui/icons-material/Person2";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SettingsIcon from "@mui/icons-material/Settings";
import PostForm from "../../pages/auth/PostForm";
import CloseIcon from "@mui/icons-material/Close";

const Navigation = () => {
  const [open, setOpen] = useState(false);

  return (
    <Box sx={styles.navContainer}>
      <Box sx={styles.navBar}>
        <Link to="/homepage">
          <HomeIcon sx={styles.icon} />
        </Link>
        <Link to="/search">
          <SearchIcon sx={styles.icon} />
        </Link>

        {/* Floating Button with Bounce Effect */}
        <Box sx={styles.addButtonContainer} onClick={() => setOpen(true)}>
          <AddCircleOutlineIcon sx={styles.addButton} />
        </Box>

        <Link to="/profile">
          <Person2Icon sx={styles.icon} />
        </Link>
        <Link to="/settings">
          <SettingsIcon sx={styles.icon} />
        </Link>
      </Box>

      {/* Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={styles.modalStyle}>
          <IconButton onClick={() => setOpen(false)} sx ={{border:"2px solid white",marginTop:"15px"}}>
            <CloseIcon sx ={{color:"white",fontSize:'15px'}}/>
          </IconButton>
          <PostForm closeModal={() => setOpen(false)} />
        </Box>
      </Modal>
    </Box>
  );
};

export default Navigation;

const styles = {
  navContainer: {
    position: "fixed",
    bottom: "1px",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    zIndex: 1000,
    left: 0,
    right: 0,
  },
  navBar: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    background: "linear-gradient(135deg, #6a11cb, #2575fc)",
    padding: "15px 20px",
    boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.3)",
    transition: "all 0.3s ease-in-out",
    gap: "10px"
  },
  icon: {
    color: "#fff",
    fontSize: "30px",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    "&:hover": {
      transform: "scale(1.2)",
      filter: "drop-shadow(0px 0px 8px rgba(255, 255, 255, 0.8))",
    },

  },
  addButtonContainer: {
    position: "absolute",
    top: "-25px",
    left: "50%",
    transform: "translateX(-50%)",
    cursor: "pointer",
    animation: "bounce 1.5s infinite",
    "@keyframes bounce": {
      "0%, 100%": {
        transform: "translateY(0) translateX(-50%)",
      },
      "50%": {
        transform: "translateY(-10px) translateX(-50%)",
      },
    },
  },
  addButton: {
    fontSize: "40px",
    color: "#fff",
    background: "linear-gradient(135deg, #ff00ff, #ff8c00)",
    borderRadius: "50%",
    padding: "12px",
    boxShadow: "0px 5px 20px rgba(255, 0, 255, 0.5)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    "&:hover": {
      transform: "scale(1.2)",
      boxShadow: "0px 10px 30px rgba(255, 0, 255, 0.8)",
    },
  },
  modalStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    outline: "none",
    flexDirection:"column"
  },
};
