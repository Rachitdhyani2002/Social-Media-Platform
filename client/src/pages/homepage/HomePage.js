import React from 'react'
import UserProfile from './UserProfile'
import UserPosts from './UserPosts'
import { Box } from '@mui/material'
import Layout from '../../components/layout/Layout'

const HomePage = () => {
  return (
    <Layout>
      <Box style={styles.HomePage}>
        <UserPosts />
      </Box>
    </Layout>

  )
}

export default HomePage;

//Styles
const styles = {
  HomePage: {
    display: "flex",
    justifyContent: "center",
    flexDirection: {
      xs: "column",
      md: "row",
    },
    width: "100%",
    minHeight: "100vh",
    alignItem: "center",
    background:"#EEEAF6"
  },

}
