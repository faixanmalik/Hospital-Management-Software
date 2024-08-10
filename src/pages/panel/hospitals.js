import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import Hospital from '@/model/Hospital'
import { Card, CardBody, Select, Typography } from '@material-tailwind/react'
import React, { Fragment, useEffect, useState } from 'react'
import mongoose from 'mongoose'

import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { MdDelete } from "react-icons/md";
import { FaPlus, FaRegHospital } from "react-icons/fa";
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { AiOutlineDelete, AiOutlinePlusCircle } from 'react-icons/ai'


const Hospitals = ({ dbHospitals }) => {

  const [open, setOpen] = useState(false)
  const [isEdit, setIsEdit] = useState(false)


  // id For delete
  const [id, setId] = useState('')
  const [selectedIds, setSelectedIds] = useState([]);

  const [filteredHospitals, setFilteredHospitals] = useState([])

  useEffect(() => {
    setFilteredHospitals(dbHospitals);
  }, [dbHospitals])
  

  const [hospitalData, setHospitalData] = useState({
    hospitalID: '',
    name: '',
    email: '',
    location: '',
    contactNo: '',
    doctors: [
      { doctorID: '', name: '', specialization: '' },
      { doctorID: '', name: '', specialization: '' },
    ],
    noOfDoctors: '',
    noOfWards: '',
    noOfBeds: '',
    username: '',
    password: '',
    desc: '',
  });


  const addLines = () => {
    setHospitalData((prevData) => ({
      ...prevData,
      doctors: [
        ...prevData.doctors,
        { doctorID: '', name: '', specialization: '' },
      ],
    }));
  }

  const delLines = (indexToDelete) => {
    setHospitalData((prevData) => {
      const updatedDoctors = prevData.doctors.filter((_, index) => index !== indexToDelete);
      return {
        ...prevData,
        doctors: updatedDoctors,
      };
    });
  };

  const handleDoctorChange = (e, index) => {

    const { name, value } = e.target;
    setHospitalData((prevData) => {
      const updatedDoctors = prevData.doctors.map((doctor, i) =>
        i === index ? { ...doctor, [name]: value } : doctor
      );
      return {
        ...prevData,
        doctors: updatedDoctors,
      };
    });
  }

  // Handle input changes for top-level fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setHospitalData((prevData) => ({
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


  const submit = async(e)=>{
    e.preventDefault();

    const data = { hospitalData, path:'hospitals' }

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
      setFilteredHospitals([...filteredHospitals, response.data]);
    }
    else {
      toast.error(response.message , { position: "top-right", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });
    }

  }

  const editEntry = async()=>{
    const data = { id, hospitalData, path: 'hospitals'};

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
      setFilteredHospitals((prevHospitals) =>
        prevHospitals.map((hospital) =>
          hospital._id === hospitalData._id ? hospitalData : hospital
        )
      );
    }
    else {
      toast.error(response.message , { position: "top-right", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });
    }

  }

  const delEntry = async()=>{
    const data = { selectedIds , path: 'hospitals' };
    let res = await fetch(`/api/delEntry`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    let response = await res.json()

    if (response.success === true) {
      setFilteredHospitals(filteredHospitals.filter(item => !selectedIds.includes(item._id)));
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
                  <FaRegHospital className='mr-2 text-base' /> Hospitals ({filteredHospitals.length})
                </Typography>

                <div className='flex space-x-1'>

                  <button
                    onClick={ ()=>{ 

                        setOpen(true),
                        setHospitalData({
                          hospitalID: '',
                          name: '',
                          email: '',
                          location: '',
                          contactNo: '',
                          doctors: [
                            { doctorID: '', name: '', specialization: '' },
                            { doctorID: '', name: '', specialization: '' },
                          ],
                          noOfDoctors: '',
                          noOfWards: '',
                          noOfBeds: '',
                          username: '',
                          password: '',
                          desc: '',
                        });
                        
                        
                        setIsEdit(false)
                      
                      } } 
                    className="bg-baseColor hover:bg-hoverBaseColor flex items-center px-3 py-2 text-xs font-semibold text-cardColor border-none rounded-md"
                  >
                    <FaPlus className='mr-1' />
                    Add Hospital
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
                                  Hospital ID
                              </th>
                              <th scope="col" className="text-start px-3 py-3 text-sm font-semibold text-gray-600 dark:text-neutral-500">
                                  Name
                              </th>
                              <th scope="col" className="text-start px-3 py-3 text-sm font-semibold text-gray-600 dark:text-neutral-500">
                                  Email
                              </th>
                              
                              <th scope="col" className="text-start px-3 py-3 text-sm font-semibold text-gray-600 dark:text-neutral-500">
                                  Contact No
                              </th>
                              <th scope="col" className="text-start px-3 py-3 text-sm font-semibold text-gray-600 dark:text-neutral-500">
                                  No of Doctors
                              </th>
                              <th scope="col" className="text-start px-3 py-3 text-sm font-semibold text-gray-600 dark:text-neutral-500">
                                  No of Wards
                              </th>
                              <th scope="col" className="text-start px-3 py-3 text-sm font-semibold text-gray-600 dark:text-neutral-500">
                                  No of Beds
                              </th>
                              
                              
                            </tr>
                          </thead>
                          <tbody className="overflow-y-auto">
                            
                            {filteredHospitals.length != 0 && filteredHospitals.map((item, index)=>{

                              return <tr key={index} 
                              // onClick={ ()=> { setHospitalData(item), setOpen(true), setId(item._id), setIsEdit(true) }} 
                              onClick={(e) => {
                                if (!e.target.tagName.toLowerCase() === 'input' || e.target.type !== 'checkbox') {
                                  e.stopPropagation(); setHospitalData(item), setOpen(true), setId(item._id), setIsEdit(true)
                                }
                              }}
                              
                              className='cursor-pointer border-b border-gray-300 hover:bg-tableHoverColor'>
                              <td className="w-4 p-2.5">
                                <div className="flex items-center">
                                  <input id="checkbox-table-search-1" type="checkbox" onChange={e => handleRowCheckboxChange(e, item._id)} className="w-4 h-4 text-baseColor bg-gray-100 border-gray-300 rounded focus:ring-0 dark:focus:ring-baseColor dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"/>
                                </div>
                              </td>
                              <td className="text-start px-3 py-2 whitespace-nowrap text-xs font-medium text-gray-800">{item.hospitalID}</td>
                              <td className="text-start px-3 py-2 whitespace-nowrap text-xs text-gray-800">{item.name}</td>
                              <td className="text-start px-3 py-2 whitespace-nowrap text-xs text-gray-800">{item.email}</td>
                              <td className="text-start px-3 py-2 whitespace-nowrap text-xs text-gray-800">{item.contactNo}</td>
                              <td className="text-start px-3 py-2 whitespace-nowrap text-xs text-gray-800">{item.noOfDoctors}</td>
                              <td className="text-start px-3 py-2 whitespace-nowrap text-xs text-gray-800">{item.noOfWards}</td>
                              <td className="text-start px-3 py-2 whitespace-nowrap text-xs text-gray-800">{item.noOfBeds}</td>
                              
                            </tr>
                            })}

                          </tbody>
                        </table>

                        {filteredHospitals.length === 0 && <div className='w-full'>
                          <img className='mx-auto w-96' src="/nodatafound.jpg" alt="" />
                        </div>}

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>


          {/* Add Hospital Popup */}
          <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-20" onClose={()=>{setOpen(false)}}>
              <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
              </Transition.Child>
              <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
                  <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95" enterTo="opacity-100 translate-y-0 md:scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 translate-y-0 md:scale-100" leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95">
                    <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-5xl">
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
                                  <h3 className="text-lg font-medium leading-6 text-gray-900">Add Hospital</h3>
                                </div>
                              </div>
                              <div className="mt-2 text-black md:col-span-2 md:mt-0 w-full">
                                <form method="POST" onSubmit={submit}>
                                    
                                  <div className="grid grid-cols-6 gap-6">
                                    <div className="col-span-6 sm:col-span-1">
                                      <label htmlFor="hospitalID" className="block text-sm font-medium text-gray-700">
                                        Hospital ID
                                      </label>
                                      <input
                                        onChange={handleChange}
                                        value={hospitalData.hospitalID}
                                        type="text"
                                        name="hospitalID"
                                        id="hospitalID"
                                        autoComplete="hospitalID"
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
                                        value={hospitalData.name}
                                        type="text"
                                        name="name"
                                        id="name"
                                        autoComplete="name"
                                        className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-baseColor focus:ring-baseColor sm:text-sm"
                                        required
                                      />
                                    </div>

                                    

                                    <div className="col-span-6 sm:col-span-3">
                                      <label htmlFor="contactNo" className="block text-sm font-medium text-gray-700">
                                        Contact No
                                      </label>
                                      <input
                                        onChange={handleChange}
                                        value={hospitalData.contactNo}
                                        type="text"
                                        name="contactNo"
                                        id="contactNo"
                                        autoComplete="contactNo"
                                        className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-baseColor focus:ring-baseColor sm:text-sm"
                                        required
                                      />
                                    </div>

                                    {/* Add similar blocks for other fields */}
                                    
                                    <div className="col-span-6 sm:col-span-2">
                                      <label htmlFor="noOfDoctors" className="block text-sm font-medium text-gray-700">
                                        Number of Doctors
                                      </label>
                                      <input
                                        onChange={handleChange}
                                        value={hospitalData.noOfDoctors}
                                        type="text"
                                        name="noOfDoctors"
                                        id="noOfDoctors"
                                        autoComplete="noOfDoctors"
                                        className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-baseColor focus:ring-baseColor sm:text-sm"
                                        required
                                      />
                                    </div>

                                    <div className="col-span-6 sm:col-span-2">
                                      <label htmlFor="noOfWards" className="block text-sm font-medium text-gray-700">
                                        Number of Wards
                                      </label>
                                      <input
                                        onChange={handleChange}
                                        value={hospitalData.noOfWards}
                                        type="text"
                                        name="noOfWards"
                                        id="noOfWards"
                                        autoComplete="noOfWards"
                                        className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-baseColor focus:ring-baseColor sm:text-sm"
                                        required
                                      />
                                    </div>

                                    <div className="col-span-6 sm:col-span-2">
                                      <label htmlFor="noOfBeds" className="block text-sm font-medium text-gray-700">
                                        Number of Beds
                                      </label>
                                      <input
                                        onChange={handleChange}
                                        value={hospitalData.noOfBeds}
                                        type="text"
                                        name="noOfBeds"
                                        id="noOfBeds"
                                        autoComplete="noOfBeds"
                                        className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-baseColor focus:ring-baseColor sm:text-sm"
                                        required
                                      />
                                    </div>


                                    <div className="col-span-6">
                                      <table className="w-full text-sm text-left text-gray-500 ">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                          <tr>
                                            <th scope="col" className="p-2">
                                                Doctor ID
                                            </th>
                                            <th scope="col" className="p-2">
                                                Name 
                                            </th>
                                            <th scope="col" className="p-2">
                                                Specialization
                                            </th>
                                            <th scope="col" className="p-2">
                                                Add/Del
                                            </th>
                                          </tr>
                                        </thead>
                                      
                                        <tbody >
                                        { hospitalData.doctors.map(( item , index)=>{

                                          return <tr key={index} className="bg-white text-black border-b">
                                          
                                            <td className="p-2">

                                              <input
                                                type="text"
                                                onChange={ e=> handleDoctorChange(e, index) }
                                                value={ item.doctorID }
                                                name="doctorID"
                                                id="doctorID"
                                                className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm sm:text-sm"
                                              />
                                              
                                            </td>
                                            <td className="p-2">

                                              <input
                                                type="text"
                                                onChange={ e=> handleDoctorChange(e, index) }
                                                value={ item.name }
                                                name="name"
                                                id="name"
                                                className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm sm:text-sm"
                                              />
                                              
                                            </td>
                                            <td className="p-2">

                                              <input
                                                type="text"
                                                onChange={ e=> handleDoctorChange(e, index) }
                                                value={ item.specialization }
                                                name="specialization"
                                                id="specialization"
                                                className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm sm:text-sm"
                                              />
                                              
                                            </td>
                                            
                                            <td className="p-1 flex items-center mt-[18px]">
                                              
                                              <button type='button' className='mx-auto' onClick={addLines}><AiOutlinePlusCircle className='text-xl text-green-600'/></button>
                                              <button type='button' className='mx-auto'><AiOutlineDelete onClick={()=>index != 0 && delLines(index)} className='text-xl text-red-700'/></button>
                                            </td>

                                          </tr>})}
                                            
                                        </tbody>
                                      </table>
                                    </div>


                                    <div className="col-span-6 sm:col-span-3">
                                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Email
                                      </label>
                                      <input
                                        onChange={handleChange}
                                        value={hospitalData.email}
                                        type="email"
                                        name="email"
                                        id="email"
                                        autoComplete="email"
                                        className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-baseColor focus:ring-baseColor sm:text-sm"
                                        required
                                      />
                                    </div>

                                    <div className="col-span-6 sm:col-span-3">
                                      <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                                        Location
                                      </label>
                                      <input
                                        onChange={handleChange}
                                        value={hospitalData.location}
                                        type="text"
                                        name="location"
                                        id="location"
                                        autoComplete="location"
                                        className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-baseColor focus:ring-baseColor sm:text-sm"
                                        required
                                      />
                                    </div>


                                    {/* Username and Password fields */}
                                    {/* <div className="col-span-6 sm:col-span-3">
                                      <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                        Username
                                      </label>
                                      <input
                                        onChange={handleChange}
                                        value={hospitalData.username}
                                        type="text"
                                        name="username"
                                        id="username"
                                        autoComplete="username"
                                        className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-baseColor focus:ring-baseColor sm:text-sm"
                                        required
                                      />
                                    </div>

                                    <div className="col-span-6 sm:col-span-3">
                                      <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                        Password
                                      </label>
                                      <input
                                        onChange={handleChange}
                                        value={hospitalData.password}
                                        type="password"
                                        name="password"
                                        id="password"
                                        autoComplete="new-password"
                                        className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-baseColor focus:ring-baseColor sm:text-sm"
                                        required
                                      />
                                    </div> */}

                                    <div className="col-span-6">
                                      <label htmlFor="desc" className="block text-sm font-medium text-gray-700">
                                        Description
                                      </label>
                                      <textarea
                                        onChange={handleChange}
                                        value={hospitalData.desc}
                                        rows={4}
                                        name="desc"
                                        id="desc"
                                        autoComplete="desc"
                                        className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-baseColor focus:ring-baseColor sm:text-sm"
                                        required
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
  
  let dbHospitals = await Hospital.find()

  // Pass data to the page via props
  return {
    props: {
      dbHospitals: JSON.parse(JSON.stringify(dbHospitals)),
    }
  }
}


export default Hospitals