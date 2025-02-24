import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import {
  Box, Button, CircularProgress, FormControl, Grid, Paper, TextField, Typography
} from '@mui/material';
import VerifyOtpTimer from "./VerifyOtpTimer"



const VerifyOtp = () => {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const ref5 = useRef(null);
  const ref6 = useRef(null);
  const inputRef = [ref1, ref2, ref3, ref4, ref5, ref6];


  const [otp1, setOtp1] = useState('');
  const [otp2, setOtp2] = useState('');
  const [otp3, setOtp3] = useState('');
  const [otp4, setOtp4] = useState('');
  const [otp5, setOtp5] = useState('');
  const [otp6, setOtp6] = useState('');

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('passToken')
  const userEmail = localStorage.getItem('userEmail')
  const [timer, setTimer] = useState(null)


  useEffect(() => {
    if (ref1.current) {
      ref1.current.focus();
    }
  }, []);



  const handleOtpTime = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/otp-time`, { token })

      if (response.status === 200) {

        const remainingTime = new Date(response.data.sendTime).getTime() - new Date().getTime();
        if (remainingTime > 0) {
          setTimer(remainingTime)
        }
       
        console.log(response.data)
        console.log("Send Time:", response.data.sendTime);
        console.log("Parsed Date:", new Date(response.data.sendTime));
        console.log("Parsed Timestamp:", new Date(response.data.sendTime).getTime());
      }
    }
    catch (error) {
      console.error(error)
    }
  }

  // Handle input change and move focus
  const inputChange = (event, location) => {
    const value = event.target.value;

    // Update OTP state based on location
    switch (location) {
      case 0: setOtp1(value); break;
      case 1: setOtp2(value); break;
      case 2: setOtp3(value); break;
      case 3: setOtp4(value); break;
      case 4: setOtp5(value); break;
      case 5: setOtp6(value); break;
      default: break;
    }

    // Move focus to the next input if a value is entered
    if (location < 5 && value) {
      inputRef[location + 1].current.focus();
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const finalOTP = otp1 + otp2 + otp3 + otp4 + otp5 + otp6;

    try {
      // Make API request to verify OTP
      const response = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/verify-otp`, { otp: finalOTP });
      if (response.status === 200) {
        console.log(response.data);
        alert(response.data.message)
        navigate('/update-password')
      }
    } catch (err) {
      console.error('OTP Verification failed:', err);
      alert(err.response.data.message)
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

   const resendHandler=async()=>{
       try{
        const response =await  axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forget-password`,{email:userEmail})
        if(response.status ===200){
          console.log(response.data)
          localStorage.setItem('passToken',response.data.token)
        }
       }
       catch(error){
        console.error(error)
       }
   }

  useEffect(() => {
    handleOtpTime()
  }, [])

  return (
    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: '100vh' }}>
      <Grid item xs={10} sm={8} md={6} lg={4}>
        <Paper elevation={3} sx={{ padding: 4 }}>
          <Box textAlign="center" mb={2}>
            <Typography variant="h4" sx={{ mb: 1 }}><FingerprintIcon sx={{ fontSize: "40px" }} /></Typography>
            <Typography variant="h4">Verify your OTP</Typography>
            <Typography variant="h6" sx={{ fontSize: "10px", color: "grey", mt: 1 }}>Enter 6-digit OTP here we just sent at your email</Typography>
          </Box>
          <FormControl component="form" onSubmit={handleSubmit} fullWidth>
            <Box sx={{ display: "flex", flexDirection: 'row', gap: "2px" }}>
              {inputRef.map((item, index) => (
                <TextField
                  key={index}
                  inputRef={item}
                  onChange={(e) => inputChange(e, index)}
                  sx={{
                    width: "100%",
                    textAlign: "center",
                    '& input': {
                      textAlign: "center",
                    },
                    '& input[type=number]': {
                      '-moz-appearance': 'textfield',
                      '-webkit-appearance': 'none',
                      appearance: 'none',
                    },
                    '& input[type=number]::-webkit-inner-spin-button': {
                      display: 'none',
                    },
                    '& input[type=number]::-webkit-outer-spin-button': {
                      display: 'none',
                    },
                  }}
                  type="number"
                  onInput={(e) => {
                    if (e.target.value > 1) {
                      e.target.value = e.target.value.slice(0, 1);
                    }
                  }}
                />
              ))}
            </Box>
            <Button variant="contained" color="primary" type="submit" fullWidth sx={{ height: 48, fontSize: 16, textTransform: "none", mt: 2, backgroundColor: "rgb(4, 255, 0)" }} disabled={isLoading}>
              {isLoading ? <CircularProgress size={24} color="inherit" /> : '✔ Verify'}
            </Button>
          </FormControl>
          <Box sx={{ mt: 2, display: "flex", justifyContent: 'start' }}>
            {timer !== null ?<VerifyOtpTimer time={timer} />:<span style={{color:"blue",cursor:"pointer"}} onClick={resendHandler}>Resend</span>}


          </Box>
          <Box textAlign="center" mt={1}>
            <Typography variant="body2" sx={{ backgroundColor: "#E2E5DE", padding: "13px", borderRadius: "5px", mt: 2, fontSize: "16px" }}>
              <Link to="/" style={{ textDecoration: "none", color: "blue" }}>←  back to login</Link>
            </Typography>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default VerifyOtp;
