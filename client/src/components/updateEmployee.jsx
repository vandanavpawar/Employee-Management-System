import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import uploadimage from '../helpers/uploadimage'

function UpdateEmployee() {

    const [course, setcourse] = useState([])
    const [data, setdata] = useState({
        name: "",
        email: "",
        mobileno: "",
        designation: "",
        gender: "",
        course: "",
        profileImage: "",
    })

    const navigate = useNavigate()

    const [uploaduserimage, setuploadImage] = useState("")
    const [openfullscreenimage, setopenfullscreenimage] = useState(false)
    const [fullscreenimage, setfullscreenimage] = useState("")

    const handleCheck = (e) => {
        const { value, checked } = e.target;

        if (checked) {
            setcourse([...course, value])
        } else {
            setcourse(course.filter((e) => e !== value))
        }
    }
    const params = useParams();

    const getEmployeeById = async () => {
        try {
            let response = await fetch(`http://localhost:8000/app/v1/employee/getemployee/${params.id}`, {
                method: 'GET',
            });
            const data = await response.json();
            setdata(data)
            console.log(data.profileImage[0]?.profileImage[1]);

        } catch (err) {
            console.log(err);
        }
    };
    console.log(data);
    const imagesrc = data?.profileImage[0]?.profileImage[1]
    console.log(imagesrc);

    useEffect(() => {
        getEmployeeById()
    }, [])

    const handleupdate = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8000/app/v1/employee/updateemployee/${params.id}`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        //Authorization:authorizationToken
                    },
                    body: JSON.stringify(data)
                })
            if (response.ok) {
                alert('sucess')
                navigate('/employeelist')
            } else {
                alert('erorr')
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleUpload = async (e) => {

        const file = e.target.files[0]
        setuploadImage()
        const uploadImageCloudinary = await uploadimage(file)

        setdata((prev) => {
            const imageArray = prev.profileImage || []; // If prev.profileImage is undefined, use an empty array
            return { ...prev, profileImage: [imageArray, uploadImageCloudinary.url] };
        });
        //console.log(uploadImageCloudinary.url);

    }


    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setdata({
            ...data,
            [name]: value,
        })
    }

    return (
        <div className='mt-6 fixed w-full  h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
            <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>
                <form className='grid p-4 gap-2 overflow-y-scroll h-full pb-5' onSubmit={handleupdate}>
                    <label>Name:</label>
                    <input className='p-2 bg-slate-100 border rounded' type='text' name="name" value={data.name} onChange={handleInput} />

                    <label>Email:</label>
                    <input className='p-2 bg-slate-100 border rounded' type='email' name="email" value={data.email} onChange={handleInput} />
                    <label>Mobile No:</label>
                    <input className='p-2 bg-slate-100 border rounded' type='tel' name="mobileno" value={data.mobileno} onChange={handleInput} />

                    <label htmlFor='designation'>Designation: </label>
                    <select className='p-2 bg-slate-100 border rounded' id='designation' name="designation" value={data.designation} onChange={handleInput}>
                        <option value="HR">HR</option>
                        <option value="Manager">Manager</option>
                        <option value="Sales">Sales</option>
                    </select>
                    <label>Gender:
                        <div className='flex gap-3'>
                            <div>
                                <input type='radio' name="gender" id='Male' value="Male" checked={data.gender === "Male"}
                                    onChange={handleInput}></input>
                                <label htmlFor='Male'>Male</label>
                            </div>
                            <div>
                                <input type='radio' name="gender" value="female" checked={data.gender === "female"}
                                    onChange={handleInput}></input>
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
                        <div className='relative group'>
                            <img src={imagesrc} width={80} height={80} className='bg-slate-100 border cursor-pointer'
                                onClick={() => {
                                    setopenfullscreenimage(true)
                                    setfullscreenimage(el)
                                }
                                } />
                            <div className='absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer'
                            >

                            </div>
                        </div>


                    }

                    <button className=' mt-3 px-3 py-2 bg-red-600 text-white mb-10 hover:bg-red-700'>Update</button>
                </form>
            </div>
        </div>

    )
}

export default UpdateEmployee
