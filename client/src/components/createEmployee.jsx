import React from 'react'
import { useState, useContext } from 'react'
import { AuthContext } from '../store/auth'
import uploadimage from '../helpers/uploadimage'
import { useNavigate } from 'react-router-dom'
import DisplayImage from './displayImage'


function CreateEmployee() {

    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [mobileno, setmobile] = useState('')
    const [designation, setdesignation] = useState('')
    const [gender, setgender] = useState()
    const [course, setcourse] = useState([])
    const [profileImage, setprofileImage] = useState([])

    const { token } = useContext(AuthContext)
    const navigate = useNavigate()

    const [uploaduserimage, setuploadImage] = useState("")
    const [openfullscreenimage, setopenfullscreenimage] = useState(false)
    const [fullscreenimage, setfullscreenimage] = useState("")

    const handleRadio = (value) => {
        setgender(value);
    }
    const handleCheck = (e) => {
        const { value, checked } = e.target;

        if (checked) {
            setcourse([...course, value])
        } else {
            setcourse(course.filter((e) => e !== value))
        }
    }



    const handleUpload = async (e) => {

        const file = e.target.files[0]
        setuploadImage()
        const uploadImageCloudinary = await uploadimage(file)

        setprofileImage((prev) => {
            const imageArray = prev.profileImage || []; // If prev.profileImage is undefined, use an empty array
            return { ...prev, profileImage: [imageArray, uploadImageCloudinary.url] };
        });
        //console.log(uploadImageCloudinary.url);

    }
    //console.log(profileImage?.profileImage[1]);
    // let imagesrc=profileImage?.profileImage[1]



    async function handlesubmit(e) {
        e.preventDefault();

        let response = await fetch('http://localhost:8000/app/v1/employee/createemployee', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({ name, email, mobileno, gender, course, designation, profileImage }),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        })
        // console.log(token);

        if (response.status === 200) {
            alert('Employee uploaded successfully');
            navigate('/employeelist')
            console.log(response);

        } else if (response.status === 401) {
            alert('fill all the fields properly');
        } else {
            alert('could not upload Employee data ')
        }

    }
    return (
        <div className=' mt-6 fixed w-full  h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
            <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>
                <form className='grid p-4 gap-2 overflow-y-scroll h-full pb-5' onSubmit={handlesubmit}>
                    <label htmlFor='name'>Name: </label>
                    <input className='p-2 bg-slate-100 border rounded'
                        type='text' id='name' value={name} required onChange={e => setname(e.target.value)} />

                    <label>Email:</label>
                    <input htmlFor='email' className='p-2 bg-slate-100 border rounded'
                        type='email' id='email' value={email} required onChange={e => setemail(e.target.value)} />

                    <label htmlFor='mobileno'>Mobile No: </label>
                    <input className='p-2 bg-slate-100 border rounded'
                        type='tel' id='mobileno' value={mobileno} required onChange={e => setmobile(e.target.value)} />

                    <label htmlFor='designation'>Designation:    </label>
                    <select className='p-2 bg-slate-100 border rounded' id='designation' value={designation} required onChange={(e) => { setdesignation(e.target.value) }}>
                        <option value="HR">HR</option>
                        <option value="Manager">Manager</option>
                        <option value="Sales">Sales</option>
                    </select>

                    <label>Gender:
                        <div className='flex gap-3'>
                            <div>
                                <input type='radio' id='Male' value="Male" checked={gender === "Male"}
                                    onChange={() => handleRadio("Male")}></input>
                                <label htmlFor='Male'>Male</label>
                            </div>
                            <div>
                                <input type='radio' value="female" checked={gender === "female"}
                                    onChange={() => handleRadio("female")}></input>
                                <label htmlFor='female'>Female</label>
                            </div>
                        </div>
                    </label>

                    <label>Course :
                        <div className='flex gap-4'>
                            <div>  BCA <input type='checkbox' value='BCA' onChange={(e) => { handleCheck(e) }} ></input></div>
                            <div>  MCA <input type='checkbox' value='MCA' onChange={(e) => handleCheck(e)}  ></input></div>
                            <div>  BSC  <input type='checkbox' value='BSC' onChange={(e) => handleCheck(e)}></input></div>
                        </div>
                    </label>

                    <label htmlFor='profileImage'>Image </label>
                    <input type='file' onChange={handleUpload}></input>
                  
                    {
                        openfullscreenimage && (
                            <DisplayImage onClose={() => { setopenfullscreenimage(false) }} imgUrl={fullscreenimage}></DisplayImage>
                        )
                    }
                    <button className=' mt-3 px-3 py-2 bg-red-600 text-white mb-10 hover:bg-red-700'>Upload Product</button>

                </form>
            </div>
        </div>

    )
}
export default CreateEmployee
