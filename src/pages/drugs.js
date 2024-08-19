import React from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Drug from '@/model/Drug'
import mongoose from 'mongoose'
import Link from 'next/link'

const Drugs = ({ dbDrugs }) => {


  let images = [ 
    'https://plus.unsplash.com/premium_photo-1672163163579-e5d4aedd26af?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWVkaWNpbmVzfGVufDB8fDB8fHww', 
    'https://images.unsplash.com/photo-1573207185685-5109f337fdf6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVkaWNpbmVzfGVufDB8fDB8fHww',
    'https://images.unsplash.com/photo-1600091474842-83bb9c05a723?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWVkaWNpbmVzfGVufDB8fDB8fHww',
    'https://plus.unsplash.com/premium_photo-1673185180737-fcdda085a9fb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bWVkaWNpbmVzfGVufDB8fDB8fHww',
    'https://plus.unsplash.com/premium_photo-1668487826666-baa00865bc13?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bWVkaWNpbmVzfGVufDB8fDB8fHww',
    'https://images.unsplash.com/photo-1603807008857-ad66b70431aa?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG1lZGljaW5lc3xlbnwwfHwwfHx8MA%3D%3D',
  ]


  // Function to pick a random image
  function getRandomImage(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }


  return (
    <div>
      <Navbar />


      <div className='py-14'>

        {dbDrugs.length > 0 && <h2 className="mb-8 lg:mb-16 text-3xl font-semibold tracking-wide leading-tight text-center text-gray-900 dark:text-white md:text-4xl">Drugs List</h2>}
        
        <div className='grid grid-cols-6 gap-6 px-3'>
          
          
          {dbDrugs.length > 0 && dbDrugs.map((item, index)=>{
            
            
            return <Link key={index} href={'/'} className="col-span-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <img className="rounded-t-lg object-cover object-top h-96 w-full" src={ getRandomImage(images) } alt="" />
              <div className="py-4 px-2">
                
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{item.drugName}</h5>
                <p className="mb-2 text-sm font-medium tracking-widest text-baseColor dark:text-gray-400">{item.drugType}</p>

                <button href={'#'} className="mt-10 flex justify-center mx-auto w-full  text-sm font-medium text-white py-2 bg-baseColor rounded-lg hover:bg-hoverBaseColor">
                  Book an appointment
                </button>
                
              </div>
          </Link>})}
          

          {dbDrugs.length === 0 && <div className='w-full col-span-6'>
            <img className='mx-auto w-96' src="/nodatafound.jpg" alt="" />
          </div>}


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
  
  let dbDrugs = await Drug.find();

  // Pass data to the page via props
  return {
    props: {
      dbDrugs: JSON.parse(JSON.stringify(dbDrugs)),
    }
  }
}

export default Drugs