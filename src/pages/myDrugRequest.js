import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Appointment from '@/model/Appointment';
import DrugRequest from '@/model/DrugRequest';
import { Card, CardBody, Typography } from '@material-tailwind/react';
import moment from 'moment/moment';
import mongoose from 'mongoose';
import React, { Fragment, useEffect, useState } from 'react'
import { AiOutlineMedicineBox } from 'react-icons/ai';
import { FaPlus } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const MyDrugRequest = ({ userEmail, user, logout, dbDrugRequest }) => {


  const [open, setOpen] = useState(false)
  const [isEdit, setIsEdit] = useState(false)


  const [filteredReqs, setFilteredReqs] = useState([])
  const [requestData, setRequestData] = useState({
    drugName: '',
    qty: 0,
    desc: '',
  });

  

  useEffect(() => {

    let filteredReqs = dbDrugRequest.filter((item)=>{
      return item.userEmail === userEmail
    })
    setFilteredReqs(filteredReqs);
    
  }, [dbDrugRequest])


  // Handle input changes for top-level fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRequestData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const submit = async(e)=>{
    e.preventDefault();

    let newReqData = {
      ...requestData,
      userEmail
    }

    const data = { requestData:newReqData, path:'RequestDrug' }

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
      setFilteredReqs([...filteredReqs, response.data]);
    }
    else {
      toast.error(response.message , { position: "top-right", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });
    }

  }


  return (
    <main className="w-full min-h-screen bg-gray-100">

      {/* React tostify */}
      <ToastContainer position="top-right" autoClose={1000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light"/>
      
      <Navbar user={user} logout={logout} bg={'white'} logoColor={'primary'} hoverSigninBG={'gray-50'}/>

      <div className="p-3 w-full">

        <Card className="w-full">
          <CardBody>

            <div className='flex justify-between items-center py-2'>
              <Typography variant="h5" color="blue-gray" className="flex items-center">
                <AiOutlineMedicineBox className='mr-2 text-xl' /> My Drug Requests ({filteredReqs.length})
              </Typography>

              <div className='flex space-x-1'>

                <button
                  className="bg-baseColor hover:bg-hoverBaseColor flex items-center px-3 py-2 text-xs font-semibold text-cardColor border-none rounded-md"
                  onClick={ ()=>{ 

                    setOpen(true),
                    setRequestData({
                      drugName: '',
                      qty: '',
                      desc: '',
                    });
                    
                    setIsEdit(false)
                  
                  } } 
                >
                  <FaPlus className='mr-1' />
                  Create Request
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
                                Drug Name
                            </th>
                            <th scope="col" className="text-start px-3 py-3 text-sm font-semibold text-gray-600 dark:text-neutral-500">
                                Quantity
                            </th>
                            <th scope="col" className="text-start px-3 py-3 text-sm font-semibold text-gray-600 dark:text-neutral-500">
                                Description
                            </th>
                            <th scope="col" className="text-start px-3 py-3 text-sm font-semibold text-gray-600 dark:text-neutral-500">
                                Status
                            </th>
                            
                          </tr>
                        </thead>
                        <tbody className="overflow-y-auto">
                          
                          {filteredReqs.length != 0 && filteredReqs.map((item, index)=>{

                            return <tr key={index} 
                            onClick={(e) => {
                              if (!e.target.tagName.toLowerCase() === 'input' || e.target.type !== 'checkbox') {
                                e.stopPropagation(); setBedData(item), setOpen(true), setId(item._id), setIsEdit(true)
                              }
                            }}
                            
                            className='cursor-pointer border-b border-gray-300 hover:bg-tableHoverColor'>
                            <td className="w-4 p-2.5">
                              <div className="flex items-center">
                                <input id="checkbox-table-search-1" type="checkbox" onChange={e => handleRowCheckboxChange(e, item._id)} className="w-4 h-4 text-baseColor bg-gray-100 border-gray-300 rounded focus:ring-0 dark:focus:ring-baseColor dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"/>
                              </div>
                            </td>
                            <td className="text-start px-3 py-2 whitespace-nowrap text-xs text-gray-800">{item.drugName}</td>
                            <td className="text-start px-3 py-2 whitespace-nowrap text-xs text-gray-800">{item.qty}</td>
                            <td className="text-start px-3 py-2 whitespace-nowrap text-xs text-gray-800">{item.desc}</td>

                            <td className="text-start px-3 py-2 whitespace-nowrap text-xs text-white">
                              <span className="py-1.5 font-semibold tracking-wider px-6 bg-baseColor hover:bg-hoverBaseColor rounded-lg">
                                {item.status || 'Sent'}
                              </span>
                            </td>
                            
                          </tr>
                          })}

                        </tbody>
                      </table>

                      {filteredReqs.length === 0 && <div className='w-full'>
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
                    <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-xl md:px-4 lg:max-w-3xl">
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
                                  <h3 className="text-lg font-medium leading-6 text-gray-900">Add Drug Request</h3>
                                </div>
                              </div>
                              <div className="mt-2 text-black md:col-span-2 md:mt-0 w-full">
                                <form method="POST" onSubmit={submit}>
                                    
                                  <div className="grid grid-cols-6 gap-6">
                                    
                                    
                                    <div className="col-span-6 sm:col-span-4">
                                      <label htmlFor="drugName" className="block text-sm font-medium text-gray-700">
                                        Drug Name
                                      </label>
                                      <input
                                        onChange={handleChange}
                                        value={requestData.drugName}
                                        type="text"
                                        name="drugName"
                                        id="drugName"
                                        autoComplete="drugName"
                                        className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-baseColor focus:ring-baseColor sm:text-sm"
                                        required
                                      />
                                    </div>

                                    <div className="col-span-6 sm:col-span-2">
                                      <label htmlFor="qty" className="block text-sm font-medium text-gray-700">
                                        Quantity
                                      </label>
                                      <input
                                        onChange={handleChange}
                                        value={requestData.qty}
                                        type="number"
                                        name="qty"
                                        id="qty"
                                        autoComplete="qty"
                                        className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-baseColor focus:ring-baseColor sm:text-sm"
                                      />
                                    </div>


                                    <div className="col-span-6">
                                      <label htmlFor="desc" className="block text-sm font-medium text-gray-700">
                                        Description
                                      </label>
                                      <textarea
                                        onChange={handleChange}
                                        value={requestData.desc}
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

      <Footer />
    </main>
  )
}


export async function getServerSideProps() {
  if (!mongoose.connections[0].readyState){
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_URI)
  }
  
  let dbDrugRequest = await DrugRequest.find()

  // Pass data to the page via props
  return {
    props: {
      dbDrugRequest: JSON.parse(JSON.stringify(dbDrugRequest)),
    }
  }
}

export default MyDrugRequest