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
          
          {user.value
          ? <>
            <Menu>
              <MenuHandler>
                <Avatar
                  // src="https://docs.material-tailwind.com/img/face-1.jpg"
                  src="data:image/png;base64,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"
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