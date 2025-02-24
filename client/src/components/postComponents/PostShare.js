import { Box, Button, TextField } from '@mui/material'
import ImageIcon from '@mui/icons-material/Image';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ClearIcon from '@mui/icons-material/Clear';
import { useState,useRef } from 'react';
import React from 'react'



const PostShare = () => {
    const [image,setImage] = useState(null);
    const imageRef = useRef()
    const handleImageChange=(e)=>{
      if(e.target.files && e.target.files[0]){
         let img = e.target.files[0];
         setImage({image:URL.createObjectURL(img)})
      }
    }
    return (
        <Box sx={styles.PostShare}>
            <Box sx={styles.ProFileBar}>
                <Box sx={styles.ProFileImage}></Box>
                <TextField fullWidth placeholder="What's happening" sx={styles.TextField} />
            </Box>
            <Box sx={styles.PostOptions}>
                <Box sx={styles.icon} onClick={()=>imageRef.current.click()} >
                    <ImageIcon sx={{ color: "#fe7e0f" }}/>
                    <span style={{ color: "#fe7e0f", fontFamily: "sans-serif" }} typeof='file'>Photo</span>
                </Box>
                <Box sx={styles.icon}>
                    <PlayCircleIcon sx={{ color: "#8e3ccb" }} />
                    <span style={{ color: "#8e3ccb", fontFamily: "sans-serif" }}>Video</span>
                </Box>
                <Box sx={styles.icon}>
                    <LocationOnIcon sx={{ color: "#fc59a3" }} />
                    <span style={{ color: "#fc59a3", fontFamily: "sans-serif" }}>Location</span>
                </Box>
                <Box sx={styles.icon}>
                    <CalendarMonthIcon sx={{ color: "#87c830" }} />
                    <span style={{ color: "#87c830", fontFamily: "sans-serif" }}>Schedule</span>
                </Box>
                <Box>
                    <Button sx={styles.btn}>Share</Button>
                </Box>
                <Box>
                    <input type="file" style={{display:"none"}} ref={imageRef} onChange={handleImageChange}/>
                </Box>
                
            </Box>
            {image && (
                    <Box sx={styles.previewImageBox}>
                       <ClearIcon onClick={()=>setImage(null)} sx={styles.clearIcon} />
                       <img src={image.image} style={styles.previewImage}/>
                    </Box>
                )}
        </Box>
    )
}

export default PostShare

const styles = {
    PostShare: {
        padding: "10px",
        width:"100%",
    },
    ProFileImage: {
        background: "yellow",
        borderRadius: "50%",
        width: "50px",
        height: "50px",
    },
    ProFileBar: {
        display: "flex",
        flexDirection: "row",
        padding: "5px",
        margin: "5px",
        gap: "10px",
        alignItems: "center"
    },
    PostOptions: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: "5rem",
        marginTop: "10px"
    },
    icon: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        cursor:"pointer"
    },
    TextField: {
        background: "#e5e5e5",
        border: "0",
        outline: "none",
        borderRadius: "10px",
        '& .MuiOutlinedInput-root': {
            border: "none",
            outline: "none",
            '& fieldset': {
                border: "none",
            },
        },
    },
    btn:{
        background:"#FF00FF",
        color:"white",
        fontSize:"12px"
    },
    previewImageBox:{
        position:"relative"
    },
    clearIcon:{
       position:"absolute",
        left:'1rem',
        top:"1rem",
        cursor:"pointer",
    },
    previewImage:{
        width:"100%",
        maxHeight:"25rem",
        objectFit:"fill",
        marginTop:"10px",
        borderRadius:"10px"
        }
}