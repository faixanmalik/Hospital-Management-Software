import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import Doctor from '@/model/Doctor'
import { Rating } from '@material-tailwind/react'
import mongoose from 'mongoose'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { FaPhoneAlt, FaUserAlt } from 'react-icons/fa'
import { FaRegHospital, FaTransgender } from 'react-icons/fa6'
import { MdEmail } from 'react-icons/md'
import { TiTick } from "react-icons/ti";
import ReactSelect from 'react-select'

const DoctorDetail = ({ dbDoctors }) => {

  const router = useRouter();
  const id = router.query.id;


  const [doctor, setDoctor] = useState(null)
  const [appointmentData, setAppointmentData] = useState({
    doctorName: '',
    name: '',
    doctorID: '',
    email: '',
    message: '',
    appointmentDate: '',
    appointmentTime: '',
  })

  useEffect(() => {
    const doctor = dbDoctors.filter((item)=>{
      return item._id === id;
    })
    setDoctor(doctor[0])
  }, [id])
  


  // let femaleSrc = [ 'female1.png', 'female2.png']
  let femaleSrc = ['female2.png']
  let maleSrc = [ 'male1.png', 'male2.png']

  // Function to pick a random image
  function getRandomImage(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }


  // Handle input changes for top-level fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointmentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const submit = async(e)=>{
    e.preventDefault();

    const data = { appointmentData, path:'Doctors' }

    let res = await fetch(`/api/addEntry`, {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    let response = await res.json()

    // if (response.success === true) {
    //   toast.success(response.message, { position: 'top-right', autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: 'light',});
    //   setOpen(false)
    //   setFilteredDoctors([...filteredDoctors, response.data]);
    // }
    // else {
    //   toast.error(response.message , { position: "top-right", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });
    // }

  }

  
  return (
    <div>
      <Navbar />
      <div className='py-14 min-h-screen'>

        {doctor && <h2 className="mb-8 lg:mb-16 text-3xl font-semibold tracking-wide leading-tight text-center text-gray-900 dark:text-white md:text-4xl">Doctor Detail</h2>}
        
        {doctor && <div className='flex space-x-10 px-20'>
          
          <div className='flex-col space-y-16 w-10/12'>
            
            <div className='flex space-x-7'>
              <div className='w-6/12'>
                <img className="rounded-lg object-cover object-top h-96 w-full" src={` ${ doctor.gender === 'Male' ? getRandomImage(maleSrc) : getRandomImage(femaleSrc) }`} alt="" />
              </div>
              <div>
                <h5 className="text-sm font-medium tracking-widest text-gray-600 dark:text-white">{doctor.doctorID}</h5>
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{doctor.name}</h5>
                <p className="mb-3 text-sm font-medium tracking-widest text-baseColor dark:text-gray-400">{doctor.specialization}</p>

                <Rating value={4} />

                <p className="my-5 text-sm font-medium tracking-wide text-gray-800 dark:text-gray-400">Fees: 40$</p>

                <div className='flex-col space-y-5'>

                  <h1 className='flex items-center'>
                    <FaUserAlt className='text-baseColor text-lg mr-3'/>
                    age: {doctor.age}
                  </h1>
                  <h1 className='flex items-center'>
                    <FaTransgender className='text-baseColor text-lg mr-3'/>
                    {doctor.gender}
                  </h1>
                  <h1 className='flex items-center'>
                    <FaPhoneAlt className='text-baseColor text-lg mr-3'/>
                    {doctor.contactNo}
                  </h1>
                  <h1 className='flex items-center'>
                    <MdEmail className='text-baseColor text-lg mr-3'/>
                    {doctor.email}
                  </h1>
                  <h1 className='flex items-center'>
                    <FaRegHospital className='text-baseColor text-xl mr-3'/>
                    {doctor.hospital}
                  </h1>
                  
                </div>

              </div>
            </div>


            <div>
              <h5 className="mb-5 text-xl font-bold tracking-wider text-gray-900 dark:text-white">Subspecialities</h5>
              <p className='text-sm tracking-wide flex'>
                <TiTick className='text-baseColor text-lg mr-3'/>
                {doctor.specialization}
              </p>
            </div>

            <div>
              <h5 className="mb-2 text-xl font-bold tracking-wider text-gray-900 dark:text-white">Overview of {doctor.name}</h5>
              <p className='text-sm tracking-wide'>{doctor.desc || `${doctor.name} is a board-certified family medicine physician with over 10 years of experience in providing primary care services to patients of all ages. She graduated from the University of California, Los Angeles with a degree in Biology before obtaining her medical degree from the University of California, San Francisco. ${doctor.name} is known for her compassionate and patient-centered approach to healthcare, and she takes the time to get to know each of her patients on a personal level. In her free time, ${doctor.name} enjoys hiking, traveling, and spending time with her family.`}</p>
            </div>


          </div>
          <div className='w-1/2 bg-gray-50 px-5 py-10'>

            <form method="POST" onSubmit={submit}>
                                    
              <div className="grid grid-cols-6 gap-6">

                <div className="col-span-6">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    onChange={handleChange}
                    value={appointmentData.name}
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="name"
                    className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-baseColor focus:ring-baseColor sm:text-sm"
                  />
                </div>
                

                <div className="col-span-6">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    onChange={handleChange}
                    value={appointmentData.email}
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-baseColor focus:ring-baseColor sm:text-sm"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="appointmentData" className="block text-sm font-medium text-gray-700">
                    Appointment Date
                  </label>
                  <input
                    onChange={handleChange}
                    value={appointmentData.appointmentDate}
                    type="date"
                    name="appointmentDate"
                    id="appointmentDate"
                    autoComplete="appointmentDate"
                    className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-baseColor focus:ring-baseColor sm:text-sm"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="appointmentTime" className="block text-sm font-medium text-gray-700">
                    Appointment Time
                  </label>
                  <input
                    onChange={handleChange}
                    value={appointmentData.appointmentTime}
                    type="time"
                    name="appointmentTime"
                    id="appointmentTime"
                    autoComplete="appointmentTime"
                    className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-baseColor focus:ring-baseColor sm:text-sm"
                  />
                </div>


                <div className="col-span-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    onChange={handleChange}
                    value={appointmentData.message}
                    rows={4}
                    name="message"
                    id="message"
                    autoComplete="message"
                    className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-baseColor focus:ring-baseColor sm:text-sm"
                  />
                </div>

              </div>

              <div className="mt-5 space-x-3 py-3 text-right">
                <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent bg-baseColor py-2 text-sm font-medium text-white shadow-sm hover:bg-hoverBaseColor focus:outline-none focus:ring-2 focus:ring-baseColor focus:ring-offset-2">Book Appointment</button>
              </div>
              
            </form>
          </div>

        </div>}

        {!doctor && <div className='w-full col-span-6'>
          <img className='mx-auto w-96' src="/nodatafound.jpg" alt="" />
        </div>}
    
      </div>



      <Footer />
    </div>
  )
}


export async function getServerSideProps() {
  if (!mongoose.connections[0].readyState){
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_URI)
  }
  
  let dbDoctors = await Doctor.find();

  // Pass data to the page via props
  return {
    props: {
      dbDoctors: JSON.parse(JSON.stringify(dbDoctors)),
    }
  }
}

export default DoctorDetail