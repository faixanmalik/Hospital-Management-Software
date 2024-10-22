import React from 'react'

import { FaMapLocationDot, FaMaskFace, FaRegHospital, FaUserDoctor } from "react-icons/fa6";
import { GiHospitalCross } from "react-icons/gi";
import { FaBed, FaSignOutAlt } from "react-icons/fa";
import { AiOutlineMedicineBox } from "react-icons/ai";

import {
  Card,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
} from "@heroicons/react/24/solid";
import Link from 'next/link';
import { useRouter } from 'next/router';


const Sidebar = () => {

  const router = useRouter();

  // Logout function
  const logout = ()=>{
    localStorage.removeItem("myUser");
    setUser({value:null});
    router.push(`/login`);
  }


  return (

    <Card className="h-full min-h-screen bg-white shadow-xl shadow-blue-gray-900/5">
      <div className="">
        <img src="/newlogo.png" alt="" />
      </div>
      <List className='h-full'>

        <div className='h-full'>
          
          <Link href={"/panel/hospitals"}>
            <ListItem className={` ${router.asPath === '/panel/hospitals' && 'bg-[#f0f2f4]' } `}>
              <ListItemPrefix>
                <FaRegHospital className='text-xl '/>
              </ListItemPrefix>
              Hospitals
            </ListItem>
          </Link>

          <Link href={"/panel/doctors"}>
            <ListItem className={` ${router.asPath === '/panel/doctors' && 'bg-[#f0f2f4]' } `}>
              <ListItemPrefix>
                <FaUserDoctor className='text-xl '/>
              </ListItemPrefix>
              Doctors
            </ListItem>
          </Link>

          <Link href={"/panel/appointments"}>
            <ListItem className={` ${router.asPath === '/panel/appointments' && 'bg-[#f0f2f4]' } `}>
              <ListItemPrefix>
                <FaMaskFace className='text-xl '/>
              </ListItemPrefix>
              Appointments
            </ListItem>
          </Link>

          <Link href={"/panel/beds"}>
            <ListItem className={` ${router.asPath === '/panel/beds' && 'bg-[#f0f2f4]' } `}>
              <ListItemPrefix>
                <FaBed className='text-xl '/>
              </ListItemPrefix>
              Beds
            </ListItem>
          </Link>
          
          
          <Link href={"/panel/drugs"}>
            <ListItem className={` ${router.asPath === '/panel/drugs' && 'bg-[#f0f2f4]' } `}>
              <ListItemPrefix>
                <AiOutlineMedicineBox className='text-xl '/>
              </ListItemPrefix>
              Drugs
            </ListItem>
          </Link>

          <Link href={"/panel/drugsRequest"}>
            <ListItem className={` ${router.asPath === '/panel/drugsRequest' && 'bg-[#f0f2f4]' } `}>
              <ListItemPrefix>
                <AiOutlineMedicineBox className='text-xl '/>
              </ListItemPrefix>
              Drugs Requests
            </ListItem>
          </Link>

          <Link href={"/panel/drugsSuppliers"}>
            <ListItem className={` ${router.asPath === '/panel/drugsSuppliers' && 'bg-[#f0f2f4]' } `}>
              <ListItemPrefix>
                <FaMapLocationDot className='text-xl '/>
              </ListItemPrefix>
              Drugs Suppliers
            </ListItem>
          </Link>

          

          <Link href={"/panel/ayurvedicCenters"}>
            <ListItem className={` ${router.asPath === '/panel/ayurvedicCenters' && 'bg-[#f0f2f4]' } `}>
              <ListItemPrefix>
                <GiHospitalCross className='text-xl '/>
              </ListItemPrefix>
              Ayurvedic Centers
            </ListItem>
          </Link>

          <Link href={"/panel/plantDatabase"}>
            <ListItem className={` ${router.asPath === '/panel/plantDatabase' && 'bg-[#f0f2f4]' } `}>
              <ListItemPrefix>
                <GiHospitalCross className='text-xl '/>
              </ListItemPrefix>
              Plant Database
            </ListItem>
          </Link>

          {/* <Link href={"/panel/appointments"}>
            <ListItem className={` ${router.asPath === '/panel/ayurvedicCenters' && 'bg-[#f0f2f4]' } `}>
              <ListItemPrefix>
                <GiHospitalCross className='text-xl '/>
              </ListItemPrefix>
              Appointments
            </ListItem>
          </Link> */}


          {/* InBox */}
          {/* <ListItem>
            <ListItemPrefix>
              <InboxIcon className="h-5 w-5" />
            </ListItemPrefix>
            Inbox
            <ListItemSuffix>
              <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
            </ListItemSuffix>
          </ListItem> */}

        </div>

        <div>
          <ListItem className="bg-[#f0f2f4]" onClick={()=> logout()}>
            <ListItemPrefix>
              <FaSignOutAlt className='text-xl '/>
            </ListItemPrefix>
            Log Out
          </ListItem>
        </div>


      </List>
    </Card>
  )
}

export default Sidebar