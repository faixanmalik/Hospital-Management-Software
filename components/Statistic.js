import React from 'react'

const Statistic = () => {
  return (
    <section className="text-gray-600 body-font">
      <div className="px-5 py-14 mx-auto">
        <div className="flex flex-wrap -m-4 text-center">
          <div className="p-4 sm:w-1/4 w-1/2">
            <h2 className="title-font font-medium sm:text-4xl text-3xl text-baseColor">2.7K</h2>
            <p className="leading-relaxed">Patients</p>
          </div>
          <div className="p-4 sm:w-1/4 w-1/2">
            <h2 className="title-font font-medium sm:text-4xl text-3xl text-baseColor">0.9K</h2>
            <p className="leading-relaxed">Doctors</p>
          </div>
          <div className="p-4 sm:w-1/4 w-1/2">
            <h2 className="title-font font-medium sm:text-4xl text-3xl text-baseColor">35</h2>
            <p className="leading-relaxed">Hospitals</p>
          </div>
          <div className="p-4 sm:w-1/4 w-1/2">
            <h2 className="title-font font-medium sm:text-4xl text-3xl text-baseColor">4</h2>
            <p className="leading-relaxed">Wellness Center</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Statistic