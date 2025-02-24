import { Box } from '@mui/material'
import React from 'react'
import PostShare from '../../components/postComponents/PostShare'
import Posts from '../../components/postComponents/Posts'

const UserPosts = () => {
  return (
    <Box sx={styles.UserPosts}>
        <Posts/>
    </Box> 
  )
}

export default UserPosts

const styles = {
    UserPosts:{
      width:"100%",
      display:"flex",
      flexDirection:"column",
      gap:"1rem",
      minHeight:'100vh',
      justifyContent:"center",
      alignItems:"center"
    }
}
