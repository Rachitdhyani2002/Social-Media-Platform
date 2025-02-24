import React from 'react'
import LogoSearch from '../../components/profileComponents/LogoSearch'
import { Paper } from '@mui/material';
import ProfileCard from '../../components/profileComponents/ProfileCard';
import FollowersCard from '../../components/profileComponents/FollowersCard';

const UserProfile = () => {
    return (
        <Paper sx={styles.UserProfile}>
            <LogoSearch />
            <ProfileCard />
            <FollowersCard/>
        </Paper>
    )
}

export default UserProfile

const styles = {
    UserProfile:{
       width:{
        xs:"100%",
        md:"23%",
       },
       minHeight:"100vh",
       padding:"10px",
       background:"#ffffff"
    }
}
