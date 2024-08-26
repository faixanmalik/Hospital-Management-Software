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

const DoctorDetail = ({ dbDoctors }) => {

  const router = useRouter();
  const id = router.query.id;


  const [doctor, setDoctor] = useState(null)

  useEffect(() => {
    const doctor = dbDoctors.filter((item)=>{
      return item._id === id;
    })
    console.log(doctor[0])
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

                <p className="my-3 text-sm font-medium tracking-wide text-gray-800 dark:text-gray-400">Fees: 40$</p>

                <div className='flex-col space-y-3'>

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
          <div className='w-1/2 bg-red-50'>

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