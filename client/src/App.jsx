import { Route,Routes } from 'react-router-dom'
import './App.css'
import './index.css'
import CreateEmployee from './components/createEmployee'
import EmployeeList from './components/employeelist'
import Login from './components/login'
import Register from './components/register'
import Navbar from './components/Navbar'
import Home from './components/home'
import Logout from './components/logout'
import { useContext } from 'react';
import { AuthContext } from './store/auth'
import { ToastContainer } from 'react-toastify'
import UpdateEmployee from './components/updateEmployee'

function App() {

  const { isloggedin } = useContext(AuthContext)

  return (
  <>
      <Navbar/>
      <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/header' element={<Headers/>}/>
      {isloggedin &&(
        <>
          <Route path="/createEmployee" element={<CreateEmployee/>}></Route>
          <Route path="/employeelist" element={<EmployeeList/>}/>
          <Route path="/updateEmployee/:id"element={<UpdateEmployee/>}/>
          <Route path='/logout' element={<Logout/>}/>
          </>
      )
      }

    
      </Routes>
      </>
  )
}

export default App
