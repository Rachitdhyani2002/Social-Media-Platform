import React, { useRef, useState } from 'react';
import axios from 'axios';
import EmailIcon from "@mui/icons-material/Email";
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, CircularProgress, FormControl, Grid, InputAdornment, Paper, TextField, Typography } from '@mui/material';



const ForgetPasswordForm = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();



    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        if (!email) {
            setError("Please! enter your email for verification.");
            setIsLoading(false);
            return;
        }

        try {

            const response = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forget-password`, { email });
            if (response.status === 200) {
                console.log(response)
            }
            if (response.status === 200) {
                alert(response.data.message)
                localStorage.setItem('passToken', response.data.token)
                localStorage.setItem('userEmail', email)
                navigate('/verify-otp')
            }


        } catch (err) {
            console.error('Forget Password failed:', err);
            setError(err.response?.data?.message || 'Something went wrong');

        } finally {
            setIsLoading(false);
        }
    };



    return (
        <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: '100vh' }}>
            <Grid item xs={10} sm={8} md={6} lg={4}>
                <Paper elevation={3} sx={{ padding: 4 }}>
                    <Box textAlign="center" mb={2}>
                        <Typography variant="h3" sx={{ mb: 1 }}> 🔐</Typography>
                        <Typography variant="h4">Forgot Password</Typography>
                        <Typography variant="h6" sx={{ fontSize: "10px", color: "grey", mt: 1 }}>Enter your registered email we will send a 6-digit OTP</Typography>

                    </Box>


                    <FormControl component="form" onSubmit={handleSubmit} fullWidth>
                        <TextField
                            id="email"
                            label="Email"
                            variant="outlined"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                            margin="normal"
                            placeholder="name@example.com"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <EmailIcon />
                                    </InputAdornment>
                                ),
                            }}
                            error={!!error}
                            helperText={error}
                        />



                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            fullWidth
                            sx={{ height: 48, fontSize: 16, textTransform: "none", mt: 2 }}
                            disabled={isLoading}

                        >
                            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Send OTP'}
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

export default ForgetPasswordForm;
