import React from 'react'
import { UseAdminAuth } from './UseAuth'
import { Navigate } from 'react-router-dom';

function RequireAdminAuth({children}) {

    const {adminToken} = UseAdminAuth();
    if(!adminToken){
        return <Navigate to='/admin/login'/>
    }
  return children
}

export default RequireAdminAuth
