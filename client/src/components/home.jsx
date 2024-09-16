import React from 'react'
import { useContext } from 'react';
import { AuthContext } from '../store/auth';
import { FcDepartment } from "react-icons/fc";
import { FaUser } from "react-icons/fa";
import { FiClock } from "react-icons/fi";



function Home() {
  const {user,isloggedin} =useContext(AuthContext)

  return (<>

    <div className="flex">
      {/* Main Content */}
      <main className="w-3/4 p-8 min-h-[calc(100vh-120px)] pt-20 ">
        {/* Top Bar */}
        {/* Dashboard Cards */}
        <div className="flex justify-between items-center mb-8">
    <h1 className='text-3xl'>Dashboard</h1>
      </div>
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow bg-blue-500">
            <h3 className="text-xl font-semibold">Total Employees</h3>
            <div className='text-8xl mt-1'>
            <FaUser /></div>
            <p className="text-2xl font-bold mt-2">1,500</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow bg-yellow-400">
            <h3 className="text-xl font-semibold">Departments</h3>
            <div className='text-8xl'>
              <FcDepartment /></div>
            <p className="text-2xl font-bold mt-2 ">3</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow bg-slate-400">
            <h3 className="text-xl font-semibold">Recently created</h3>
            <div className='text-8xl'>
            
<FiClock /></div>
            <p className="text-2xl font-bold mt-2">12</p>
          </div>
        </div>
      </main>
    </div></>
  )
}

export default Home
