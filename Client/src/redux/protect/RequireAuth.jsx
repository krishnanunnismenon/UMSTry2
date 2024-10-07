import React from 'react'
import { UseAuth } from './UseAuth'
import { Navigate } from 'react-router-dom';

function RequireAuth({children}) {
  const {userToken} = UseAuth();
  if(!userToken){
    return <Navigate to='/login'/>
  }
  return children;
}

export default RequireAuth
