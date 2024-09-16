import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react';
import { AuthContext } from '../store/auth';
import { PiUserCircleGear } from "react-icons/pi";


function Navbar() {
  const { isloggedin, user } = useContext(AuthContext)

  return (
    <header className='h-16 shadow-md bg-white fixed w-full z-40 mt-0'>
      <div className=' h-full container mx-auto flex items-center px-4 justify-between'>
        <div className='flex gap-20'> <div className='text-4xl'>
        <PiUserCircleGear /> </div>
          <Link to={'/'} className='mt-1' >Home</Link></div>
          {isloggedin ? (
            <>
            <div className='flex gap-20'>
              <Link to="/createEmployee" className='hover:text-red-600' >CreateEmployee</Link>
              <Link to="/employeelist" className='hover:text-red-600' >Employee List</Link></div>
              <div className='flex items-center gap-3 mr-20'>
              <p >{user.username}</p>
              <Link to="/logout" className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700'>Logout</Link>
              </div>
            </>
          ) : (
          <div className='flex gap-10 mr-10'>
            <Link to="/login" className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700' href="#">Login</Link>
            <Link to="/register" className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700' href="#">Register</Link>
            </div>)}
        </div>
      
    </header>
  )
}

export default Navbar
