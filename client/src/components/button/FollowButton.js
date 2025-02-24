import { Box, Button } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'

const FollowButton = ({followId}) => {
    const [isFollowing,setFollowing] = useState(false)
    const currentUserId = localStorage.getItem('userId')

    const handleFollow = async() =>{
        try{
           const response = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/follow-user`,{currentUserId,followId})
           if(response.status === 200){
            setFollowing(true)
           }
           
        }
        catch(err){
           console.error(err)
           alert(err.response.data.message)
        }
    }

  return (
    <Box>
         <Button
            color={isFollowing ? "secondary" : "primary"}
            onClick={handleFollow}
            disabled={isFollowing} 
            sx = {styles.followButton}
        >
            {isFollowing ? "Following" : "Follow"}
        </Button>
    </Box>
  )
}

export default FollowButton

const styles= {
    followButton:{
        color:"#5932c0",
        fontSize:"12px",
        margin:"15px"
    },
}
