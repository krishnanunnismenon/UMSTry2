import React from 'react'
import { UseAuth } from './UseAuth'
import { Navigate } from 'react-router-dom';

function RequireAuthLogin({children}) {
  const {userToken} = UseAuth();
  if(userToken){
    return <Navigate to='/home'/>
  }
  return children
}

export default RequireAuthLogin
