import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import { Card, CardBody, Select, Typography } from '@material-tailwind/react'
import React, { Fragment, useEffect, useState } from 'react'
import mongoose from 'mongoose'

import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { MdDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { AiOutlineDelete, AiOutlineMedicineBox, AiOutlinePlusCircle } from 'react-icons/ai'
import Doctor from '@/model/Doctor'
import { FaUserDoctor } from 'react-icons/fa6'
import Hospital from '@/model/Hospital'
import ReactSelect from 'react-select'
import withAuth from '@/middleware/withAuth'


const Doctors = ({ dbDoctors, dbHospitals }) => {

  const [open, setOpen] = useState(false)
  const [isEdit, setIsEdit] = useState(false)


  // id For delete
  const [id, setId] = useState('')
  const [selectedIds, setSelectedIds] = useState([]);

  const [filteredDoctors, setFilteredDoctors] = useState([])

  useEffect(() => {
    setFilteredDoctors(dbDoctors);
  }, [dbDoctors])
  
  const [doctorData, setDoctorData] = useState({
    doctorID: '',
    name: '',
    profilePic: '',
    specialization: '',
    courses: '',
    hospital: '',
    email: '',
    contactNo: '',
    gender: '',
    age: '',
    dob: '',

    joiningDate: '',
    desc: '',
  });


  // Handle input changes for top-level fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctorData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  function handleRowCheckboxChange(e, id) {
    if (e.target.checked) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter(rowId => rowId !== id));
    }
  }


  const handleImageChange = (event) => {
    const file = event.target.files[0];
    
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        const imageDataUrl = reader.result;
        setDoctorData((prevData) => ({
          ...prevData,
          profilePic: imageDataUrl,
        }));
      };
    }
  };


  const submit = async(e)=>{
    e.preventDefault();

    const data = { doctorData, path:'Doctors' }

    let res = await fetch(`/api/addEntry`, {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    let response = await res.json()

    if (response.success === true) {
      toast.success(response.message, { position: 'top-right', autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: 'light',});
      setOpen(false)
      setFilteredDoctors([...filteredDoctors, response.data]);
    }
    else {
      toast.error(response.message , { position: "top-right", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });
    }

  }

  const editEntry = async()=>{
    const data = { id, doctorData, path: 'Doctors'};

    let res = await fetch(`/api/editEntry`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    let response = await res.json()

    if (response.success === true) {
      setOpen(false)
      toast.success(response.message , { position: "top-right", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });
      setFilteredDoctors((prevDoctors) =>
        prevDoctors.map((item) =>
          item._id === doctorData._id ? doctorData : item
        )
      );
    }
    else {
      toast.error(response.message , { position: "top-right", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });
    }

  }

  const delEntry = async()=>{
    const data = { selectedIds , path: 'Doctors' };
    let res = await fetch(`/api/delEntry`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    let response = await res.json()

    if (response.success === true) {
      setFilteredDoctors(filteredDoctors.filter(item => !selectedIds.includes(item._id)));
    }
    else {
      toast.error(response.message , { position: "top-right", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });
    }
  }

  return (
    <main className="w-full flex min-h-screen bg-gray-100">

      {/* React tostify */}
      <ToastContainer position="top-right" autoClose={1000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light"/>

      <div className="w-[20%]">
        <Sidebar />
      </div>

      <div className="w-full">
        <Header/>


        <div className="p-3">

          <Card className="w-full">
            <CardBody>

              <div className='flex justify-between items-center py-2'>
                <Typography variant="h5" color="blue-gray" className="flex items-center">
                  <FaUserDoctor className='mr-2 text-xl' /> Doctors ({filteredDoctors.length})
                </Typography>

                <div className='flex space-x-1'>

                  <button
                    onClick={ ()=>{ 

                        setOpen(true),
                        setDoctorData({
                          doctorID: '',
                          name: '',
                          profilePic: '',
                          specialization: '',
                          courses: '',
                          hospital: '',
                          email: '',
                          contactNo: '',
                          gender: '',
                          age: '',
                          dob: '',
                          
                          joiningDate: '',
                          desc: '',
                        });
                        
                        
                        setIsEdit(false)
                      
                      } } 
                    className="bg-baseColor hover:bg-hoverBaseColor flex items-center px-3 py-2 text-xs font-semibold text-cardColor border-none rounded-md"
                  >
                    <FaPlus className='mr-1' />
                    Add Doctor
                  </button>

                  <button onClick={()=>delEntry()} className="bg-deleteColor hover:bg-hoverDeleteColor flex items-center px-3 py-2 text-xs font-semibold text-cardColor border-none rounded-md">
                    <MdDelete className='mr-1' />
                    Delete
                  </button>
                  
                </div>
              </div>

              <div className='mt-10'>
                <div className="flex flex-col">
                  <div className="-m-1.5 overflow-x-auto">
                    <div className="inline-block align-middle w-full">
                      <div className="block h-[21rem]">
                        <table className='w-full '>
                          <thead className='sticky top-0 z-10 bg-white shadow border-b-2 border-gray-300'>
                            <tr className='w-full'>
                              <td scope="col" className="w-4 p-2.5">
                                <div className="flex items-center">
                                  <input id="checkbox-table-search-1" type="checkbox" onChange={e => handleRowCheckboxChange(e, item._id)} className="w-4 h-4 text-baseColor bg-gray-100 border-gray-300 rounded focus:ring-0 dark:focus:ring-baseColor dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"/>
                                </div>
                              </td>
                              <th scope="col" className="text-start px-3 py-3 text-sm font-semibold text-gray-600 dark:text-neutral-500">
                                  Doctor ID
                              </th>
                              <th scope="col" className="text-start px-3 py-3 text-sm font-semibold text-gray-600 dark:text-neutral-500">
                                  Name
                              </th>
                              <th scope="col" className="text-start px-3 py-3 text-sm font-semibold text-gray-600 dark:text-neutral-500">
                                  email
                              </th>
                              <th scope="col" className="text-start px-3 py-3 text-sm font-semibold text-gray-600 dark:text-neutral-500">
                                  Specialization
                              </th>
                              <th scope="col" className="text-start px-3 py-3 text-sm font-semibold text-gray-600 dark:text-neutral-500">
                                  Hospital
                              </th>
                              <th scope="col" className="text-start px-3 py-3 text-sm font-semibold text-gray-600 dark:text-neutral-500">
                                  Gender
                              </th>
                              
                            </tr>
                          </thead>
                          <tbody className="overflow-y-auto">
                            
                            {filteredDoctors.length != 0 && filteredDoctors.map((item, index)=>{

                              return <tr key={index} 
                              onClick={(e) => {
                                if (!e.target.tagName.toLowerCase() === 'input' || e.target.type !== 'checkbox') {
                                  e.stopPropagation(); setDoctorData(item), setOpen(true), setId(item._id), setIsEdit(true)
                                }
                              }}
                              
                              className='cursor-pointer border-b border-gray-300 hover:bg-tableHoverColor'>
                              <td className="w-4 p-2.5">
                                <div className="flex items-center">
                                  <input id="checkbox-table-search-1" type="checkbox" onChange={e => handleRowCheckboxChange(e, item._id)} className="w-4 h-4 text-baseColor bg-gray-100 border-gray-300 rounded focus:ring-0 dark:focus:ring-baseColor dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"/>
                                </div>
                              </td>
                              <td className="text-start px-3 py-2 whitespace-nowrap text-xs font-medium text-gray-800">{item.doctorID}</td>
                              <td className="text-start px-3 py-2 whitespace-nowrap text-xs text-gray-800">{item.name}</td>
                              <td className="text-start px-3 py-2 whitespace-nowrap text-xs text-gray-800">{item.email}</td>
                              <td className="text-start px-3 py-2 whitespace-nowrap text-xs text-gray-800">{item.specialization}</td>
                              <td className="text-start px-3 py-2 whitespace-nowrap text-xs text-gray-800">{item.hospital}</td>
                              <td className="text-start px-3 py-2 whitespace-nowrap text-xs text-gray-800">{item.gender}</td>
                              
                            </tr>
                            })}

                          </tbody>
                        </table>

                        {filteredDoctors.length === 0 && <div className='w-full'>
                          <img className='mx-auto w-96' src="/nodatafound.jpg" alt="" />
                        </div>}

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>


          {/* Add Popup */}
          <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-20" onClose={()=>{setOpen(false)}}>
              <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
              </Transition.Child>
              <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
                  <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95" enterTo="opacity-100 translate-y-0 md:scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 translate-y-0 md:scale-100" leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95">
                    <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-6xl">
                      <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pt-14 pb-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                        <button type="button" className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-6 lg:right-8" onClick={() => setOpen(false)}>
                          <span className="sr-only">Close</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                        
                        <div className='w-full'>
                          <div className="mt-10 sm:mt-0 w-full">
                            <div className="md:grid md:grid-cols-1 md:gap-6">
                              <div className="md:col-span-1">
                                <div className="px-4 sm:px-0">
                                  <h3 className="text-lg font-medium leading-6 text-gray-900">Add Doctor</h3>
                                </div>
                              </div>
                              <div className="mt-2 text-black md:col-span-2 md:mt-0 w-full">
                                <form method="POST" onSubmit={submit}>
                                    
                                  <div className="grid grid-cols-6 gap-6">
                                    
                                    
                                    <div className="col-span-6">
                                      
                                      <div className="relative flex items-center w-full">
                                        {doctorData.profilePic ? (
                                          <div className="relative group w-40 h-40">
                                            <img
                                              src={doctorData.profilePic}
                                              alt="avatar"
                                              className="object-contain w-40 h-40 p-1 rounded-full ring-2 ring-baseColor"
                                            />
                                            {/* Label that shows on hover */}
                                            <label
                                              htmlFor="dropzone-file"
                                              className="absolute inset-0 flex flex-col items-center justify-center w-40 h-40 rounded-full border-2 border-gray-300 border-dashed cursor-pointer bg-gray-50 bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                                            >
                                              <div className="flex flex-col items-center justify-center">
                                                <svg
                                                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                                  aria-hidden="true"
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  fill="none"
                                                  viewBox="0 0 20 16"
                                                >
                                                  <path
                                                    stroke="currentColor"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                                  />
                                                </svg>
                                                <p className="mb-2 text-sm text-center text-gray-500 dark:text-gray-400">
                                                  <span className="font-semibold">Change Image</span>
                                                </p>
                                                <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                                                  PNG, or JPG (MAX. 800x400px)
                                                </p>
                                              </div>
                                              <input onChange={handleImageChange} id="dropzone-file" type="file" className="hidden" />
                                            </label>
                                          </div>
                                        ) : (
                                          <label
                                            htmlFor="dropzone-file"
                                            className="flex flex-col items-center justify-center w-40 h-40 rounded-full border-2 border-gray-300 border-dashed cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                                          >
                                            <div className="flex flex-col items-center justify-center">
                                              <svg
                                                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 20 16"
                                              >
                                                <path
                                                  stroke="currentColor"
                                                  stroke-linecap="round"
                                                  stroke-linejoin="round"
                                                  stroke-width="2"
                                                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                                />
                                              </svg>
                                              <p className="mb-2 text-sm text-center text-gray-500 dark:text-gray-400">
                                                <span className="font-semibold">Click to upload Image</span>
                                              </p>
                                              <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                                                PNG, or JPG (MAX. 800x400px)
                                              </p>
                                            </div>
                                            <input onChange={handleImageChange} id="dropzone-file" type="file" className="hidden" />
                                          </label>
                                        )}
                                      </div>
                                      
                                    </div>



                                    <div className="col-span-6 sm:col-span-1">
                                      <label htmlFor="doctorID" className="block text-sm font-medium text-gray-700">
                                        Doctor ID
                                      </label>
                                      <input
                                        onChange={handleChange}
                                        value={doctorData.doctorID}
                                        type="text"
                                        name="doctorID"
                                        id="doctorID"
                                        autoComplete="doctorID"
                                        className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-baseColor focus:ring-baseColor sm:text-sm"
                                        required
                                      />
                                    </div>

                                    <div className="col-span-6 sm:col-span-2">
                                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                        Name
                                      </label>
                                      <input
                                        onChange={handleChange}
                                        value={doctorData.name}
                                        type="text"
                                        name="name"
                                        id="name"
                                        autoComplete="name"
                                        className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-baseColor focus:ring-baseColor sm:text-sm"
                                      />
                                    </div>

                                    

                                    <div className="col-span-6 sm:col-span-3">
                                      <label htmlFor="hospital" className="block text-sm font-medium text-gray-700">
                                        Hospital
                                      </label>
                                      <ReactSelect
                                        id='hospital' 
                                        name="hospital"
                                        className='mt-1'
                                        value={{ value: doctorData.hospital, label: doctorData.hospital || 'Select' }}
                                        onChange={selectedOption => handleChange({ target: { name: 'hospital', value: selectedOption.value } })}
                                        options={
                                          dbHospitals.map((item)=>{
                                            return { value: item.name, label: item.name }
                                          })
                                        }
                                      />
                                    </div>


                                    <div className="col-span-6 sm:col-span-3">
                                      <label htmlFor="specialization" className="block text-sm font-medium text-gray-700">
                                        Specialization
                                      </label>
                                      <input
                                        onChange={handleChange}
                                        value={doctorData.specialization}
                                        type="text"
                                        name="specialization"
                                        id="specialization"
                                        autoComplete="specialization"
                                        className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-baseColor focus:ring-baseColor sm:text-sm"
                                      />
                                    </div>

                                    <div className="col-span-6 sm:col-span-3">
                                      <label htmlFor="courses" className="block text-sm font-medium text-gray-700">
                                        Courses
                                      </label>
                                      <input
                                        onChange={handleChange}
                                        value={doctorData.courses}
                                        type="text"
                                        name="courses"
                                        id="courses"
                                        autoComplete="courses"
                                        className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-baseColor focus:ring-baseColor sm:text-sm"
                                      />
                                    </div>

                                    <div className="col-span-6 sm:col-span-3">
                                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Email
                                      </label>
                                      <input
                                        onChange={handleChange}
                                        value={doctorData.email}
                                        type="email"
                                        name="email"
                                        id="email"
                                        autoComplete="email"
                                        className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-baseColor focus:ring-baseColor sm:text-sm"
                                      />
                                    </div>

                                    <div className="col-span-6 sm:col-span-3">
                                      <label htmlFor="contactNo" className="block text-sm font-medium text-gray-700">
                                        Contact No
                                      </label>
                                      <input
                                        onChange={handleChange}
                                        value={doctorData.contactNo}
                                        type="text"
                                        name="contactNo"
                                        id="contactNo"
                                        autoComplete="contactNo"
                                        className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-baseColor focus:ring-baseColor sm:text-sm"
                                      />
                                    </div>


                                    <div className="col-span-6 sm:col-span-2">
                                      <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                                        Gender
                                      </label>
                                      <ReactSelect
                                        id='gender' 
                                        name="gender"
                                        className='mt-1'
                                        value={{ value: doctorData.gender, label: doctorData.gender || 'Select' }}
                                        onChange={selectedOption => handleChange({ target: { name: 'gender', value: selectedOption.value } })}
                                        options={
                                          [
                                            { value: 'Male', label: 'Male' },
                                            { value: 'Female', label: 'Female' }
                                          ]
                                        }
                                      />
                                    </div>

                                    <div className="col-span-6 sm:col-span-2">
                                      <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                                        Age
                                      </label>
                                      <input
                                        onChange={handleChange}
                                        value={doctorData.age}
                                        type="number"
                                        name="age"
                                        id="age"
                                        autoComplete="age"
                                        className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-baseColor focus:ring-baseColor sm:text-sm"
                                      />
                                    </div>

                                    <div className="col-span-6 sm:col-span-2">
                                      <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
                                        Date of Birth
                                      </label>
                                      <input
                                        onChange={handleChange}
                                        value={doctorData.dob}
                                        type="date"
                                        name="dob"
                                        id="dob"
                                        autoComplete="dob"
                                        className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-baseColor focus:ring-baseColor sm:text-sm"
                                      />
                                    </div>


                                    <div className="col-span-6">
                                      <label htmlFor="desc" className="block text-sm font-medium text-gray-700">
                                        Description
                                      </label>
                                      <textarea
                                        onChange={handleChange}
                                        value={doctorData.desc}
                                        rows={4}
                                        name="desc"
                                        id="desc"
                                        autoComplete="desc"
                                        className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-baseColor focus:ring-baseColor sm:text-sm"
                                      />
                                    </div>

                                  </div>

                                  <div className="mt-5 space-x-3 py-3 text-right">
                                    {isEdit && <button type='button' onClick={()=>{editEntry(id)}} className="inline-flex justify-center rounded-md border border-transparent bg-baseColor py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-hoverBaseColor focus:outline-none focus:ring-2 focus:ring-baseColor focus:ring-offset-2">Save Changes</button>}
                                    {!isEdit && <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-baseColor py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-hoverBaseColor focus:outline-none focus:ring-2 focus:ring-baseColor focus:ring-offset-2">Save</button>}
                                  </div>
                                  
                                </form>
                              </div>
                            </div>
                          </div>

                          <div>
                        
                          </div>
                        </div>

                      
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition.Root>


        </div>

      </div>

    </main>
  )
}


export async function getServerSideProps() {
  if (!mongoose.connections[0].readyState){
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_URI)
  }
  
  let dbDoctors = await Doctor.find()
  let dbHospitals = await Hospital.find()

  // Pass data to the page via props
  return {
    props: {
      dbDoctors: JSON.parse(JSON.stringify(dbDoctors)),
      dbHospitals: JSON.parse(JSON.stringify(dbHospitals)),
    }
  }
}


export default withAuth(Doctors)