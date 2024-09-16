import React, { useContext, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from './../store/auth'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'


function Login() {

  const [username, setusername] = useState('')
  const [password, setpassword] = useState('')
  const { storeToken, isloggedin,setuser } = useContext(AuthContext);


  async function handlelogin(e) {
    e.preventDefault();

    let response = await fetch('http://localhost:8000/app/v1/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    })
    console.log(response);
    
    if (response.ok) {
      let res_data = await response.json()
      storeToken(res_data.token);
      toast.success(res_data.message)
   
    } else {
      alert('login failed')
    }
  }
  if (isloggedin) {
    return <Navigate to={'/'}></Navigate>
  }
  return (
    <center className='min-h-[calc(100vh-120px)] pt-20 '>
      <div className='mx-auto container p-4'>
        <div className='bg-slate-200 p-5 w-full max-w-sm mx-auto'>
          <form className='pt-6 flex flex-col gap-5 ' onSubmit={handlelogin}>
            <div className='grid gap-3'>
              <label>Username : </label>
              <div className='bg-white p-2'>
                <input className='w-full h-full outline-none bg-transparent' type='text' placeholder='username' value={username} onChange={e => setusername(e.target.value)} />
              </div>
            </div>
            <div className="input-box grid gap-3">
              <label>Password : </label>
              <div className='bg-white p-2 flex'>
              <input className='w-full h-full outline-none bg-transparent' type="password" placeholder='password' value={password} onChange={e => setpassword(e.target.value)} />
              </div>
            </div>
            <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Login</button>
          </form>
          <p className='my-5'>Don't have account ? <Link to={"/register"} className=' text-red-600 hover:text-red-700 hover:underline'>Sign up</Link></p>
        </div>
      </div>
    </center>
  )
}

export default Login
