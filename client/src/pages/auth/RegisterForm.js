import React, { useRef, useState } from 'react';
import axios from 'axios';
import EmailIcon from "@mui/icons-material/Email";
import { Link, useNavigate } from 'react-router-dom';
import PersonIcon from "@mui/icons-material/Person";
import GoogleIcon from '../../utils/images/7611770.png';
import FacebookIcon from '../../utils/images/logo-facebook-png-46264.png';
import {
  Box, Button, Checkbox, CircularProgress, Divider,
  FormControl, FormControlLabel, Grid, IconButton, InputAdornment,
  Paper, TextField, Typography
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('')
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const passwordInputRef = useRef();
  const navigate = useNavigate();

  // Generate unique deviceId and deviceName
  const deviceId = localStorage.getItem('deviceId') || generateUniqueDeviceId();
  const deviceName = navigator.userAgent;

  // Store device ID in localStorage to persist across sessions
  if (!localStorage.getItem('deviceId')) {
    localStorage.setItem('deviceId', deviceId);
  }

  // Utility to generate a unique device ID
  function generateUniqueDeviceId() {
    return 'device-' + Math.random().toString(36).substr(2, 9);
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!email || !password) {
      setError("Please fill in all fields.");
      setIsLoading(false);
      return;
    }

    try {
      // Make API request to login with device info
      const response = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`, {
        name,
        email,
        password,

      });

      console.log('Register successful:', response.data);
      localStorage.setItem("auth", JSON.stringify(response.data.user));
      navigate('/');
      alert('User successfully registered!');

    } catch (err) {
      console.error('User registration failed:', err);
      setError(err.response?.data?.message || 'Something went wrong');

    } finally {
      setIsLoading(false);
    }
  };

  const handleClickShowPassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: '100vh' }}>
      <Grid item xs={10} sm={8} md={6} lg={4}>
        <Paper elevation={3} sx={{ padding: 4 }}>
          <Box textAlign="center" mb={2}>
            <Typography variant="h5">Register</Typography>
          </Box>


          <FormControl component="form" onSubmit={handleSubmit} fullWidth>
            <TextField
              id="username"
              label="Username"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              margin="normal"
              placeholder="username2002"
              InputLabelProps={{sx:{fontSize:"14px"}}}
              error={!!error}
              helperText={error}
              InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end" >
                                        <IconButton edge="end">
                                        <PersonIcon/>
                                        </IconButton>
                                       
                                    </InputAdornment>
                                ),
                            }}
              
            />
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              value={email}
              InputLabelProps={{sx:{fontSize:"14px"}}}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
              placeholder="name@example.com"
             
              error={!!error}
              helperText={error}
              InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end" >
                                        <IconButton edge="end">
                                        <EmailIcon />
                                        </IconButton>
                                       
                                    </InputAdornment>
                                ),
                            }}
            />
            <TextField
              id="password"
              label="Password"
              variant="outlined"
              InputLabelProps={{sx:{fontSize:"14px"}}}
              type={passwordVisible ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!error}
              helperText={error}
              fullWidth
              margin="normal"
              placeholder="******"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end">
                      {passwordVisible ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              inputRef={passwordInputRef}
            />


            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              sx={{ height: 48, fontSize: 14, textTransform: "none", mt: 2 }}
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Submit'}
            </Button>
          </FormControl>

          <Box textAlign="center" mt={1}>
            <Typography variant="body2" sx={{fontSize:"12px" }}>
              Already have an account? <Link to="/" style={{ textDecoration: "none", color: "blue"}}>Login</Link>
            </Typography>
          </Box>

          <Box my={2}>
            <Divider>
              <Typography variant="body2" color="textSecondary">Or</Typography>
            </Divider>
          </Box>

          <Button
            variant="outlined"
            color="primary"
            fullWidth
            startIcon={<img src={GoogleIcon} alt="Google logo" style={{ width: 24, height: 24 }} />}
            sx={{ height: 48, fontSize: 14, mb: 1, textTransform: "none", color: "grey", fontWeight: 500 }}
          >
            Login with Google
          </Button>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            startIcon={<img src={FacebookIcon} alt="Facebook logo" style={{ width: 24, height: 24, backgroundColor: "white", borderRadius: "50%" }} />}
            sx={{ height: 48, fontSize: 14, backgroundColor: '#3b5998', color: "white", textTransform: "none", fontWeight: 500 }}
          >
            Login with Facebook
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default RegisterForm;
