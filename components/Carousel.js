import React from 'react'

const Carousel = () => {
  return (
    <div className='flex items-center px-5 bg-gradient-to-r from-[#f4fafe] to-[#cce3f4]'>

      <div className='flex-col space-y-3 justify-center my-auto'>
        
        <h1 className='text-black font-bold text-4xl tracking-widest'>Your Health Matters</h1>
        <h1 className='text-gray-600 text-sm'>At Your Health Matters, we're dedicated to providing comprehensive medical care to help you achieve optimal health and wellness.</h1>

        <button className="bg-baseColor hover:bg-hoverBaseColor flex items-center px-3 py-2 text-xs font-semibold text-cardColor border-none rounded-md">
          Find a Doctor
        </button>

      </div>
      <div>
        <img className='' src="/doctor.png" alt="" />
      </div>
    </div>
  )
}

export default Carousel