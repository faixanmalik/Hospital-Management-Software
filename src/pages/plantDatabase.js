import React, { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import mongoose from 'mongoose'
import Link from 'next/link'
import PlantData from '@/model/PlantDatabase'
import { Rating } from '@material-tailwind/react'
import ReactSelect from 'react-select'

const PlantDatabase = ({ user, logout, dbPlantDatabase }) => {

  const [data, setData] = useState(null)
  const [plantName, setPlantName] = useState('')

  useEffect(() => {

    if(dbPlantDatabase.length > 0) {
      setData(dbPlantDatabase[2])
    }

  }, [dbPlantDatabase])

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if(name === 'plantName') {

      let plantData = dbPlantDatabase.filter((item)=>{
        return item.sinhalaName === value
      })
      setData(plantData[0])
      setPlantName(value)

    }

  };

  return (
    <div>
      <Navbar user={user} logout={logout} bg={'white'} logoColor={'primary'} hoverSigninBG={'gray-50'}/>


      <div className='py-14 px-10'>

        <h2 className="mb-8 lg:mb-16 text-3xl font-semibold tracking-wide leading-tight text-center text-gray-900 dark:text-white md:text-4xl">Plant Database</h2>

        <div>
          <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
            <div className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
              <img alt={'Plant Data'} src={data && data.profilePic || getRandomImage(images)} className="object-cover object-center" />
            </div>
            <div className="sm:col-span-8 lg:col-span-7">

              <section aria-labelledby="information-heading" className="mt-2">
                <h3 id="information-heading" className="sr-only">
                  Hospital information
                </h3>

                <div className='items-center'>

                  <Rating value={4} />

                  <div className="">
                    <ReactSelect
                      id='plantName' 
                      name="plantName"
                      className='mt-1'
                      value={{ value: plantName, label: plantName || 'Change Plant Datbase' }}
                      onChange={selectedOption => handleChange({ target: { name: 'plantName', value: selectedOption.value } })}
                      options={
                        dbPlantDatabase
                        .filter((item)=> item.sinhalaName != '')
                        .map((item)=>{
                          return { value: item.sinhalaName, label: item.sinhalaName }
                        })
                      }
                    />
                  </div>

                  <div className='flex-col mt-5 space-y-5'>

                    <h1 className='flex items-center'>
                      Sinahala Name:
                      <span className='text-baseColor text-lg ml-3'>
                        {data && data.sinhalaName || 'Not Added'}
                      </span>
                    </h1>

                    <h1 className='flex items-center'>
                      Tamil Name:
                      <span className='text-baseColor text-lg ml-3'>
                        {data && data.tamilName || 'Not Added'}
                      </span>
                    </h1>

                    <h1 className='flex items-center'>
                      Scientific Name:
                      <span className='text-baseColor text-lg ml-3'>
                        {data && data.scientificSynonyms || 'Not Added'}
                      </span>
                    </h1>

                    <h1 className='flex items-center'>
                      Family Name:
                      <span className='text-baseColor text-lg ml-3'>
                        {data && data.familyName || 'Not Added'}
                      </span>
                    </h1>

                    <h1 className='flex items-center'>
                      English Name:
                      <span className='text-baseColor text-lg ml-3'>
                        {data && data.englishName || 'Not Added'}
                      </span>
                    </h1>

                    <h1 className='flex items-center'>
                      Prev Name In Website:
                      <span className='text-baseColor text-lg ml-3'>
                        {data && data.prevNameInWebsite || 'Not Added'}
                      </span>
                    </h1>

                    <h1 className='flex items-center'>
                      Conservation Status:
                      <span className='text-baseColor text-lg ml-3'>
                        {data && data.conservationStatus || 'Not Added'}
                      </span>
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
                  <h5 className="mb-2 text-xl font-bold tracking-wider text-gray-900 dark:text-white">Overview of {data && data.sinhalaName}</h5>
                  <p className='text-sm tracking-wide'>{data && data.desc || 'Not Added'}</p>
                </div>

              </section>
            
            </div>
          </div>
        </div>
    
      </div>

      <Footer/>
    </div>
  )
}


export async function getServerSideProps() {
  if (!mongoose.connections[0].readyState){
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_URI)
  }
  
  let dbPlantDatabase = await PlantData.find();

  // Pass data to the page via props
  return {
    props: {
      dbPlantDatabase: JSON.parse(JSON.stringify(dbPlantDatabase)),
    }
  }
}



export default PlantDatabase