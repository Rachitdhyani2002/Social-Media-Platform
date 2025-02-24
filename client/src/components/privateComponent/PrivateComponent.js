import React from 'react'
import {Outlet,Navigate} from 'react-router-dom'

const PrivateComponent = () => {
    const token = localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken')
  return (
    <div>
        {token?<Outlet/>:<Navigate to="/" />}
    </div>
  )
}

export default PrivateComponent
