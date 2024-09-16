import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../store/auth'
import { Navigate } from 'react-router-dom'

function Logout() {

const {logoutuser}=useContext(AuthContext)

useEffect(()=>{
    logoutuser();
},[logoutuser])
  return  <Navigate to='/login'/>
}

export default Logout
