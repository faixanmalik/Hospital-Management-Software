import Carousel from '@/components/Carousel'
import Navbar from '@/components/Navbar'
import Sponser from '@/components/Sponser'
import Card from '@/components/Card'
import React from 'react'
import Footer from '@/components/Footer'
import Statistic from '@/components/Statistic'
import Testimonials from '@/components/Testimonials'

const HomePage = () => {
  return (
    <div>

      <Navbar />
      <Carousel />
      <Sponser />
      <Card />
      <Statistic />
      <Testimonials />


      <Footer/>

    </div>
  )
}

export default HomePage