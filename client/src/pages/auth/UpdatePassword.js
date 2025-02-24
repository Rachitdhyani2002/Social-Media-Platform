import React, { useRef, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import SecurityUpdateIcon from '@mui/icons-material/SecurityUpdate';
import {
    Box, Button, Checkbox, CircularProgress, Divider,
    FormControl, FormControlLabel, Grid, IconButton, InputAdornment,
    Paper, TextField, Typography
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


const UpdatePassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('')
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const passwordInputRef = useRef();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const token = localStorage.getItem('passToken')


    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        if (!password && !confirmPassword) {
            setError("Please! enter your email for verification.");
            setIsLoading(false);
            return;
        }

        try {
            // Make API request to login with device info
            const response = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/update-password`, {password,confirmPassword,token });
             if(response.status===200){
                console.log(response.data)
                alert(response.data.message)
                localStorage.removeItem('passToken')
                navigate('/')
             }
        

        } catch (err) {
            console.error('Login failed:', err);
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
                        <Typography variant="h4" sx={{ mb: 1 }}><SecurityUpdateIcon sx={{ fontSize: "45px" }} /> </Typography>
                        <Typography variant="h4">Update Password</Typography>
                        <Typography variant="h6" sx={{ fontSize: "10px", color: "grey", mt: 1 }}>Enter your new password and login again</Typography>

                    </Box>


                    <FormControl component="form" onSubmit={handleSubmit} fullWidth>
                        <TextField
                            id="password"
                            label="New Password"
                            variant="outlined"
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
                        <TextField
                            id="confirm"
                            label="Confirm Password"
                            variant="outlined"
                            type={passwordVisible ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
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
                            sx={{ height: 48, fontSize: 16, textTransform: "none", mt: 2,backgroundColor: "rgb(4, 255, 0)" }}
                            disabled={isLoading}

                        >
                            {isLoading ? <CircularProgress size={24} color="inherit" /> :'Update'}
                        </Button>
                    </FormControl>

                    <Box textAlign="center" mt={1}>
                        <Typography variant="body2" sx={{ backgroundColor: "#E2E5DE", padding: "13px", borderRadius: "5px", mt: 2, fontSize: "16px" }}>
                            <Link to="/" style={{ textDecoration: "none", color: "blue" }}>← back to login</Link>
                        </Typography>
                    </Box>




                </Paper>
            </Grid>
        </Grid>
    );
}

export default UpdatePassword;
