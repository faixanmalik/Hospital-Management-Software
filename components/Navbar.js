import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Typography,
} from "@material-tailwind/react";



const Navbar = ( { user, logout, bg='transparent', hoverSigninBG='white', logoColor='white' }) => {

  const router = useRouter();

  return (
    <div className={`bg-${bg} text-gray-800 py-2.5 px-4`}>
      
      <div className='flex items-center justify-between '>
        <div className=''>
          <Link href={'/'}>
            <img className='h-14' src="/logo/websiteLogo.png" alt="" />
          </Link>
        </div>
        <div className={`flex justify-center items-center font-semibold space-x-7`}>
          <Link className={`${router.asPath === '/' && 'text-baseColor'} hover:text-baseColor`} href={'/'}>Home</Link>
          <Link className={`${router.asPath === '/hospitals' && 'text-baseColor'} hover:text-baseColor`} href={'/hospitals'}>Hospitals</Link>
          <Link className={`${router.asPath === '/doctors' && 'text-baseColor'} hover:text-baseColor`} href={'/doctors'}>Doctors</Link>
          <Link className={`${router.asPath === '/ayurvedicCenters' && 'text-baseColor'} hover:text-baseColor`} href={'/ayurvedicCenters'}>Wellnes Center</Link>
          <Link className={`${router.asPath === '/drugs' && 'text-baseColor'} hover:text-baseColor`} href={'/drugs'}>Drugs</Link>
          <Link className={`${router.asPath === '/plantDatabase' && 'text-baseColor'} hover:text-baseColor`} href={'/plantDatabase'}>Plant Database</Link>
        </div>
        <div className='flex '>
          
          {user 
          ? <>
            <Menu>
              <MenuHandler>
                <Avatar
                  src="https://docs.material-tailwind.com/img/face-2.jpg"
                  alt="avatar"
                  withBorder={true}
                  className="p-0.5 cursor-pointer"
                />
              </MenuHandler>
              <MenuList className='p-1'>
                

                <MenuItem onClick={()=> router.push(`/myDrugRequest`)} className="flex items-center gap-2">
                  <Typography variant="small" className="font-medium">
                    Drug Requests
                  </Typography>
                </MenuItem>

                <MenuItem onClick={()=> router.push(`/myAppointments`)} className="flex items-center gap-2">
                  <Typography variant="small" className="font-medium">
                    My Appointments
                  </Typography>
                </MenuItem>

                <hr className="my-1 border-blue-gray-50" />
                <MenuItem onClick={()=>logout()} className="flex items-center gap-2 ">
                  <Typography variant="small" className="font-medium">
                    Sign Out
                  </Typography>
                </MenuItem>
              </MenuList>
            </Menu>
          </>
          : <Link href={'/login'} className="w-fit tracking-wide px-8 bg-baseColor hover:bg-hoverBaseColor flex items-center py-2 text-sm font-semibold text-cardColor border-none rounded-md">
            Login
          </Link>}
          


        </div>
      </div>
    </div>
  )
}

export default Navbar