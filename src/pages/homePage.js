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
      <section class="py-24 relative">
        <div class="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
          <div class="w-full justify-start items-center gap-12 grid lg:grid-cols-2 grid-cols-1">
            <div class="w-full justify-center items-start gap-6 grid sm:grid-cols-2 grid-cols-1 lg:order-first order-last">
              <div class="pt-24 lg:justify-center sm:justify-end justify-start items-start gap-2.5 flex">
                <img class="rounded-xl object-cover" src="https://images.unsplash.com/photo-1625563016057-3964c9b5fdb8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNlbnRlcnMlMjBjbGluaWN8ZW58MHx8MHx8fDA%3D" alt="about Us image" />
              </div>
              <img class="sm:ml-0 ml-auto rounded-xl object-cover" src="https://images.unsplash.com/photo-1615631508158-ce306dc0dcb4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2VudGVycyUyMGNsaW5pY3xlbnwwfHwwfHx8MA%3D%3D" alt="about Us image" />
            </div>
            <div class="w-full flex-col justify-center lg:items-start items-center gap-10 inline-flex">
              <div class="w-full flex-col justify-center items-start gap-8 flex">
                <div class="w-full flex-col justify-start lg:items-start items-center gap-3 flex">
                  <h2 class="text-gray-900 text-4xl font-bold font-manrope leading-normal lg:text-start text-center">
                    Holistic Healing for Mind, Body, and Spirit
                  </h2>
                  <p class="text-gray-500 text-base font-normal leading-relaxed lg:text-start text-center">
                    Welcome to our Ayurvedic Department, where ancient wisdom and natural remedies meet modern wellness practices. Our dedicated team of Ayurvedic practitioners offers personalized treatments designed to restore balance and promote overall well-being, helping you achieve harmony in every aspect of your life.
                  </p>
                </div>
                <div class="w-full lg:justify-start justify-center items-center sm:gap-10 gap-5 inline-flex">
                  <div class="flex-col justify-start items-start inline-flex">
                    <h3 class="text-gray-900 text-4xl font-bold font-manrope leading-normal">25+</h3>
                    <h6 class="text-gray-500 text-base font-normal leading-relaxed">Years of Expertise</h6>
                  </div>
                  <div class="flex-col justify-start items-start inline-flex">
                    <h4 class="text-gray-900 text-4xl font-bold font-manrope leading-normal">200+</h4>
                    <h6 class="text-gray-500 text-base font-normal leading-relaxed">Natural Remedies</h6>
                  </div>
                  <div class="flex-col justify-start items-start inline-flex">
                    <h4 class="text-gray-900 text-4xl font-bold font-manrope leading-normal">1000+</h4>
                    <h6 class="text-gray-500 text-base font-normal leading-relaxed">Satisfied Patients</h6>
                  </div>
                </div>
              </div>
              <button class="bg-baseColor hover:bg-hoverBaseColor flex items-center px-3 py-2 text-xs font-semibold text-cardColor border-none rounded-md">
                Discover More
              </button>
            </div>
          </div>
        </div>
      </section>
      <Statistic />
      <Testimonials />


      <Footer/>

    </div>
  )
}

export default HomePage