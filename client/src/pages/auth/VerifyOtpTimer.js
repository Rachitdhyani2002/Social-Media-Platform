import React, {useMemo } from 'react'
import CountDown from 'react-countdown'
const VerifyOtpTimer = ({time}) => {
  
   const target = useMemo(()=>
     Date.now()+time
   ,[time])

   
  return (
    <div>
          <CountDown date={Date.now()+time}/>
    </div>
  )
}

export default VerifyOtpTimer;
