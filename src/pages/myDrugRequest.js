import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Appointment from '@/model/Appointment';
import DrugRequest from '@/model/DrugRequest';
import { Card, CardBody, Typography } from '@material-tailwind/react';
import moment from 'moment/moment';
import mongoose from 'mongoose';
import React, { useEffect, useState } from 'react'
import { AiOutlineMedicineBox } from 'react-icons/ai';
import { FaPlus } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

const MyDrugRequest = ({ userEmail, user, logout, dbDrugRequest }) => {


  const [filteredReqs, setFilteredReqs] = useState([])

  useEffect(() => {

    let filteredReqs = dbDrugRequest.filter((item)=>{
      return item.email === userEmail
    })
    setFilteredReqs(filteredReqs);
    
  }, [dbDrugRequest])


  return (
    <main className="w-full min-h-screen bg-gray-100">
      
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
                >
                  <FaPlus className='mr-1' />
                  Drug Request
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
                                Drug ID
                            </th>
                            <th scope="col" className="text-start px-3 py-3 text-sm font-semibold text-gray-600 dark:text-neutral-500">
                                Drug Name
                            </th>
                            <th scope="col" className="text-start px-3 py-3 text-sm font-semibold text-gray-600 dark:text-neutral-500">
                                Supplier Name
                            </th>
                            <th scope="col" className="text-start px-3 py-3 text-sm font-semibold text-gray-600 dark:text-neutral-500">
                                Drug Type
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
                            <td className="text-start px-3 py-2 whitespace-nowrap text-xs font-medium text-gray-800">{item.doctorID}</td>
                            <td className="text-start px-3 py-2 whitespace-nowrap text-xs text-gray-800">{item.doctorName}</td>

                            <td className="text-start px-3 py-2 whitespace-nowrap text-xs text-gray-800">
                              {moment(item.appointmentDate).format('D MMM YYYY')}
                            </td>
                            <td className="text-start px-3 py-2 whitespace-nowrap text-xs text-gray-800">{item.appointmentTime}</td>
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