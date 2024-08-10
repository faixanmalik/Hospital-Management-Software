import { useEffect, useState } from "react";
import Head from "next/head";

import mongoose from "mongoose";
import Hospital from "@/model/Hospital";
import AyurvedicCenter from "@/model/AyurvedicCenter";
import TopCards from "@/components/TopCards";
import Sidebar from "@/components/Sidebar";

import { FaRegHospital, FaUserDoctor } from "react-icons/fa6";
import { GiHospitalCross } from "react-icons/gi";
import Header from "@/components/Header";



export default function Home({ dbHospitals, dbAyurvedicCenters }) {


  return (
    <>
    <main className="w-full flex min-h-screen bg-gray-100">

      <div className="w-[20%]">
        <Sidebar />
      </div>

      <div className="w-full">

        <Header/>


        <div className="p-3">
          {/* Top-Cards */}
          <div className="flex space-x-5 w-full h-fit">

            <TopCards 
              bg="#f8dddd"
              textColor="#f6848c"
              href='/panel/hospitals'
              title="Hospitals"
              subtitle="Total Hospitals"
              amount={dbHospitals.length || 0}
              icon={FaRegHospital}
            />
            <TopCards 
              bg="#d5f3f2"
              textColor="#0db7af"
              href='/panel/doctors'
              title="Doctors"
              subtitle="Total Doctors"
              amount={dbDoctors.length || 0}
              icon={FaUserDoctor}
            />
            <TopCards 
              bg="#f8ecdc"
              textColor="#eea31b"
              href='/panel/ayurvedicCenters'
              title="Ayurvedic Centers"
              subtitle="Total Ayurvedic Centers"
              amount={dbAyurvedicCenters.length || 0}
              icon={GiHospitalCross}
            />


          </div>

        </div>
        

      </div>

    </main>
    </>
  )
}


export async function getServerSideProps() {
  if (!mongoose.connections[0].readyState){
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_URI)
  }
  
  let dbHospitals = await Hospital.find()
  let dbAyurvedicCenters = await AyurvedicCenter.find()

  // Pass data to the page via props
  return {
    props: {
      dbHospitals: JSON.parse(JSON.stringify(dbHospitals)),
      dbAyurvedicCenters: JSON.parse(JSON.stringify(dbAyurvedicCenters)),
    }
  }
}