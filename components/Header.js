import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Avatar, Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";


const Header = ({ showMobmenu }) => {


  const [user, setUser] = useState({value: null})
  
  const [businessName, setBusinessName] = useState('Hospital Management System')
  const router = useRouter()


  // Logout function
  const logout = ()=>{
    localStorage.removeItem("myUser");
    setUser({value:null});
    router.push(`/login`);
  }

  return (

    <div className={` bg-gradient-to-r from-gray-50 to-white shadow-inner border-b-2 border-gray-300 text-black px-4 py-2`}>
      <div className="flex justify-between items-center">
        <h5 className='font-semibold'>{businessName}</h5>
        
        <div className="flex space-x-5">

          <Menu>
            <MenuHandler>
              <Avatar
                src='https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60'
                alt="avatar"
                withBorder={true}
                className="p-0.5 cursor-pointer"
              />
            </MenuHandler>
            <MenuList className="px-1 py-2">
              <MenuItem>info</MenuItem>
              <MenuItem href="/myaccount">Edit Profile</MenuItem>
              <hr className="my-1" />
              <MenuItem
                className="!bg-black text-white" 
                overrideStyles={{ backgroundColor: 'black !important' }}
              onClick={logout}>Logout</MenuItem>
            </MenuList>
          </Menu>
          
        </div>
      </div>
    </div>
  );
};
export default Header;