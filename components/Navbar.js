import Link from 'next/link'
import React from 'react'
import { FaUserDoctor } from 'react-icons/fa6'

const Navbar = () => {
  return (
    <div className='bg-white py-2.5 px-4'>
      
      <div className='flex items-center justify-between '>
        <div>Logo</div>
        <div className='flex items-center space-x-7'>
          <Link href={'/'}>Home</Link>
          <Link href={'/doctors'}>Doctors</Link>
          <Link href={'/centersList'}>Ayurvedic Center</Link>
        </div>
        <div>
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