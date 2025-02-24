import React from 'react'
import Navigation from '../navigation/Navigation'

const Layout = ({children}) => {
  return (
    <div style={{display:"flex",justifyContent:"center",width:"100%",height:"100vh"}}>
         <main style={{width:"100%",height:"100vh"}}>{children}</main>
        <Navigation/>
            
        
    </div>
  )
}

export default Layout
