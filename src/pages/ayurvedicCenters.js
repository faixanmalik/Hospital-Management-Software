import React, { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import mongoose from 'mongoose'
import Link from 'next/link'
import AyurvedicCenter from '@/model/AyurvedicCenter'
import { Dialog, DialogBackdrop, DialogPanel, Radio, RadioGroup } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Rating } from '@material-tailwind/react'
import { MdEmail, MdOutlineBedroomChild } from 'react-icons/md'
import { FaLocationDot, FaRegHospital, FaTransgender, FaUserDoctor } from 'react-icons/fa6'
import { FaBed, FaPhoneAlt, FaUserAlt } from 'react-icons/fa'


const ayurvedicCenters = ({ user, logout, dbAyurvedicCenters }) => {

  const [open, setOpen] = useState(false)
  const [data, setData] = useState(null)


  let images = [ 
    'https://plus.unsplash.com/premium_photo-1682130157004-057c137d96d5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG9zcGl0YWx8ZW58MHx8MHx8fDA%3D', 
    'https://images.unsplash.com/photo-1512678080530-7760d81faba6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG9zcGl0YWx8ZW58MHx8MHx8fDA%3D',
    'https://images.unsplash.com/photo-1512102438733-bfa4ed29aef7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aG9zcGl0YWx8ZW58MHx8MHx8fDA%3D',
    'https://plus.unsplash.com/premium_photo-1664475477169-46b784084d4e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8aG9zcGl0YWx8ZW58MHx8MHx8fDA%3D',
    'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fGhvc3BpdGFsfGVufDB8fDB8fHww',
  ]

  // Function to pick a random image
  function getRandomImage(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }

  console.log(data);

  return (
    <div>
      <Navbar user={user} logout={logout} bg={'white'} logoColor={'primary'} hoverSigninBG={'gray-50'}/>


      <div className='py-14'>

        {dbAyurvedicCenters.length > 0 && <h2 className="mb-8 lg:mb-16 text-3xl font-semibold tracking-wide leading-tight text-center text-gray-900 dark:text-white md:text-4xl">Ayurvedic Centers</h2>}
        
        <div className='grid grid-cols-6 gap-6 px-3'>
          
          
          {dbAyurvedicCenters.length > 0 && dbAyurvedicCenters.map((item, index)=>{

            let image = getRandomImage(images)
            
            return <div key={index} onClick={ ()=> { setData(item), setOpen(true) } } className="col-span-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <img className="rounded-t-lg object-cover object-top h-96 w-full" src={ item.profilePic || image  } alt="" />
              <div className="py-4 px-2">
                
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{item.name}</h5>
                <p className="mb-2 text-sm font-medium tracking-widest text-baseColor dark:text-gray-400">{item.location}</p>

                <button href={'#'} className="mt-10 flex justify-center mx-auto w-full  text-sm font-medium text-white py-2 bg-baseColor rounded-lg hover:bg-hoverBaseColor">
                  Read More
                </button>
                
              </div>
          </div>})}
          

          {dbAyurvedicCenters.length === 0 && <div className='w-full col-span-6'>
            <img className='mx-auto w-96' src="/nodatafound.jpg" alt="" />
          </div>}

        </div>
    
      </div>

      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in md:block"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
            <DialogPanel
              transition
              className="flex w-full transform text-left text-base transition data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in md:my-8 md:max-w-2xl md:px-4 data-[closed]:md:translate-y-0 data-[closed]:md:scale-95 lg:max-w-4xl"
            >
              <div className="relative flex-col w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                >
                  <span className="sr-only">Close</span>
                  <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                </button>

                <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                  <div className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                    <img alt={'hospital'} src={data && data.profilePic || getRandomImage(images)} className="object-cover object-center" />
                  </div>
                  <div className="sm:col-span-8 lg:col-span-7">

                    <section aria-labelledby="information-heading" className="mt-2">
                      <h3 id="information-heading" className="sr-only">
                        Hospital information
                      </h3>

                      <div className='items-center'>
                        <h5 className="text-sm font-medium tracking-widest text-gray-600 dark:text-white">{data && data.centerID}</h5>
                        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{data && data.name}</h5>

                        <Rating value={4} />

                        <div className='flex-col mt-5 space-y-5'>

                          <h1 className='flex items-center'>
                            <FaPhoneAlt className='text-baseColor text-lg mr-3'/>
                            {data && data.contactNo || 'Not Added'}
                          </h1>
                          <h1 className='flex items-center'>
                            <MdEmail className='text-baseColor text-lg mr-3'/>
                            {data && data.email || 'Not Added'}
                          </h1>

                          <h1 className='flex items-center'>
                            <FaLocationDot className='text-baseColor text-lg mr-3'/>
                            {data && data.location || 'Not Added'}
                          </h1>


                        </div>

                      </div>

                    </section>

                  
                  </div>
                </div>


                <div className="mt-8 grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                  
                  <div className="sm:col-span-12">

                    <section aria-labelledby="information-heading" className="mt-2">
                      <h3 id="information-heading" className="sr-only">
                        Hospital information
                      </h3>

                      <div>
                        <h5 className="mb-2 text-xl font-bold tracking-wider text-gray-900 dark:text-white">Overview of {data && data.name}</h5>
                        <p className='text-sm tracking-wide'>{data && data.desc || 'Not Added'}</p>
                      </div>

                    </section>
                  
                  </div>
                </div>

              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>



      <Footer/>
    </div>
  )
}


export async function getServerSideProps() {
  if (!mongoose.connections[0].readyState){
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_URI)
  }
  
  let dbAyurvedicCenters = await AyurvedicCenter.find();

  // Pass data to the page via props
  return {
    props: {
      dbAyurvedicCenters: JSON.parse(JSON.stringify(dbAyurvedicCenters)),
    }
  }
}

export default ayurvedicCenters