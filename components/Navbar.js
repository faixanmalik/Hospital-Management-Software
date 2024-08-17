import Link from 'next/link'
import React from 'react'
import { FaUserDoctor } from 'react-icons/fa6'

const Navbar = () => {
  return (
    <div className='bg-white py-2.5 px-4'>
      
      <div className='flex items-center justify-between '>
        <div className='w-full'>
          <Link href={'/'}>
            <img className='w-12 h-10' src="/navbarlogo.png" alt="" />
          </Link>
        </div>
        <div className='flex w-full justify-center items-center text-gray-800  font-semibold space-x-7'>
          <Link className='hover:text-baseColor' href={'/'}>Home</Link>
          <Link className='hover:text-baseColor' href={'/doctors'}>Doctors</Link>
          <Link className='hover:text-baseColor' href={'/centersList'}>Ayurvedic Center</Link>
        </div>
        <div className='w-full flex justify-end'>
          <button className="bg-baseColor hover:bg-hoverBaseColor flex items-center px-3 py-2 text-xs font-semibold text-cardColor border-none rounded-md">
            <FaUserDoctor className='mr-2' />
            Find a Doctor
          </button>
        </div>
      </div>
    </div>
  )
}

export default Navbar