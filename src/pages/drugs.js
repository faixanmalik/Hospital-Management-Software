import React from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Drug from '@/model/Drug'
import mongoose from 'mongoose'
import Link from 'next/link'

const Drugs = ({ dbDrugs }) => {


  let femaleSrc = [ 'female1.png', 'female2.png']
  let maleSrc = [ 'male1.png', 'male2.png']

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
              <img className="rounded-t-lg object-cover object-top h-96 w-full" src={` ${ item.gender === 'Male' ? getRandomImage(maleSrc) : getRandomImage(femaleSrc) }`} alt="" />
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