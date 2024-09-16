import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function EmployeeList() {

  const [data, setdata] = useState([])
  const [search, setsearch] = useState([])

  const navigate=useNavigate()

  const editnavigate=(link)=>{
    <Link to ={link}></Link>
  }

  const date=new Date()
  console.log(date.toDateString());

  function convertIsoToDateFormat(isoDate) {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0');
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    return ` ${day}-${month}-${year}`;
}
  console.log(convertIsoToDateFormat(date))

  useEffect(() => {
    fetch('http://localhost:8000/app/v1/employee/employeelist', {
      method: 'GET'
    })
      .then((res) => res.json())
      .then((data) => {
        setdata(data.employee)
        setsearch(data.employee)
         console.log(data.employee[2].createdAt);
      })
  }, [])
  console.log(data[0]?.profileImage[0]?.profileImage[1])



  const deleteemployee = async (userId) => {

    await fetch(`http://localhost:8000/app/v1/employee/deleteemployee/${userId}`, {
      method: 'DELETE',
    }
    ).then((res) => {
      setdata((prevuser) => prevuser.filter((item) => item._id !== userId))
    }
    ).catch((err) => {
      console.log(err);
    })
  }
  const handlesearch = (value) => {
    let res = search.filter(f => f.name.toLowerCase().includes(value))
    setdata(res)
  }

  return (
    <center className='min-h-[calc(100vh-120px)] pt-20 '>
      <div className='tables '>
        <p>Total Count : {data.length}</p>
        <div className=' mb-3 hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2'>
          <input className=' hover:bg-slate-100 hover:border-red-200 w-full outline-none h-8' type="text" placeholder='search' onChange={e => handlesearch(e.target.value)}></input>

        </div>
        <div className='table-responsive'>
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile No</th>
                <th>Designation</th>
                <th>Gender</th>
                <th>Course</th>
                <th>Create date</th>
                <th>action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => {
                return (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td >
                      {<img className='mx-auto object-fill h-full' src={data[index]?.profileImage[0]?.profileImage[1]} />}
                    </td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.mobileno}</td>
                    <td>{item.designation}</td>
                    <td>{item.gender}</td>
                    <td>{item.course}</td>
                    <td>{convertIsoToDateFormat(date)}</td>
                    <td>
                      <span className='action_btn flex gap-3  items-center justify-center'>
                      <Link to={`/updateEmployee/${item._id}`} className='link'>Edit</Link>
                      <button className='px-2 ' onClick={() => deleteemployee(item._id)}>Delete</button>
                      </span>
                      </td>
                      
                  </tr>)
              })}
            </tbody>
          </table>
        </div>
      </div>
    </center>
  )
}

export default EmployeeList
