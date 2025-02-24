import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
import { Box, Button, InputLabel, Paper, TextField } from '@mui/material';
import axios from 'axios';

const EditProfileForm = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [about, setAbout] = useState('');
  const [dob, setDob] = useState('');
  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem('userId');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('about', about);
      formData.append('dob', dob);
      formData.append('userId', userId);
      if (profileImage) formData.append('profileImage', profileImage);
      if (coverImage) formData.append('coverImage', coverImage);

      const response = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/edit-profile`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      if (response.status === 200) {
        console.log('Profile updated successfully:', response);
        alert('Profile updated successfully!');
      }
    } catch (error) {
      console.error('Error updating profile:', error.response?.data || error);
      alert('Failed to update profile!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Box sx={styles.container}>
        <Paper sx={styles.formContainer}>
          <h3 style={styles.heading}>Edit Your Profile</h3>
          <Box component="form" onSubmit={handleSubmit} sx={styles.formBox}>
            
            <InputLabel sx={styles.label}>Profile Picture</InputLabel>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProfileImage(e.target.files[0])}
              style={styles.fileInput}
            />

            <InputLabel sx={styles.label}>Cover Picture</InputLabel>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setCoverImage(e.target.files[0])}
              style={styles.fileInput}
            />

            <InputLabel sx={styles.label}>About</InputLabel>
            <TextField
              type="text"
              placeholder="Write something about yourself..."
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              sx={styles.input}
            />

            <InputLabel sx={styles.label}>Date of Birth</InputLabel>
            <TextField
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              sx={styles.input}
            />

            <Button sx={styles.submitButton} type="submit" disabled={loading}>
              {loading ? 'Updating...' : 'Submit'}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Layout>
  );
};

export default EditProfileForm;

const styles = {
  container: {
    width: "100%",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #6a11cb, #2575fc)",
    color: "#fff",
  },
  formContainer: {
    padding: "20px",
    borderRadius: "10px",
    background: "linear-gradient(135deg, #ff00ff, #ff8c00)",
    width: "300px",
  },
  heading: {
    fontSize: "20px",
    fontWeight: "600",
    textAlign: "center",
    marginBottom: "15px",
    color: "white",
    fontFamily:"sans-serif"
  },
  formBox: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontSize: "14px",
    fontWeight: "500",
    color: "white",
    marginBottom: "5px",
  },
  fileInput: {
    marginBottom: "10px",
    backgroundColor: "white",
    padding: "5px",
    borderRadius: "5px",
  },
  input: {
    marginBottom: "15px",
    backgroundColor: "white",
    borderRadius: "5px",
    padding: "5px",
  },
  submitButton: {
    background: "#ff8c00",
    padding: "10px",
    borderRadius: "5px",
    color: "white",
    fontWeight: "600",
    cursor: "pointer",
    transition: "0.3s",
    '&:hover': {
      background: "#ff00ff",
    },
  },
};
