import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { FaUserDoctor } from 'react-icons/fa6'

const Navbar = () => {

  const router = useRouter();

  return (
    <div className='bg-white py-2.5 px-4'>
      
      <div className='flex items-center justify-between '>
        <div className='w-full'>
          <Link href={'/'}>
            <img className='w-12 h-10' src="/navbarlogo.png" alt="" />
          </Link>
        </div>
        <div className='flex w-full justify-center items-center text-gray-800  font-semibold space-x-7'>
          <Link className={`${router.asPath === '/' && 'text-baseColor'} hover:text-baseColor`} href={'/'}>Home</Link>
          <Link className={`${router.asPath === '/doctors' && 'text-baseColor'} hover:text-baseColor`} href={'/doctors'}>Doctors</Link>
          <Link className={`${router.asPath === '/ayurvedicCenters' && 'text-baseColor'} hover:text-baseColor`} href={'/ayurvedicCenters'}>Ayurvedic Center</Link>
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