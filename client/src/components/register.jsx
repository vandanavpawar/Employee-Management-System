import React from 'react'
import { useState,useContext } from 'react'
import { AuthContext } from './../store/auth'
import {useNavigate} from'react-router-dom'


function Register() {

    const [username, setusername] = useState('')
    const [password, setpassword] = useState('')
    const {storeToken,isloggedin} =useContext(AuthContext);

     const navigate=useNavigate()

    async function handleregister  (e) {

        e.preventDefault();
        
         let response= await  fetch('http://localhost:8000/app/v1/register', {
                method: "POST",
                headers:{'Content-Type':'application/json'},
                body: JSON.stringify({ username, password })
            });
            if(response.status===201){
              const res_data=await response.json()
              //console.log(res_data);
              console.log(res_data.token);
              storeToken(res_data.token);
              alert('registration sucessfull')
             navigate('/login')
            }else{
              alert('registration failed')
            }
    }
   

  return (
    <center className='min-h-[calc(100vh-120px)] pt-20 '>
    <div className='mx-auto container p-4'>
      <div className='bg-slate-200 p-5 w-full max-w-sm mx-auto'>
        <form className='pt-6 flex flex-col gap-5' onSubmit={handleregister}>
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
          <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Register</button>
        </form>
      
      </div>
    </div>
  </center>
  )
}

export default Register
