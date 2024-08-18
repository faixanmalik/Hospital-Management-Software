import React from 'react'

const Card = () => {

  let data = [
    {
      title: 'Primary Care',
      desc: 'Our primary care services include routine checkups, preventative care, and treatment for common illnesses and injuries.',
      src: '/service1.png',
      href: '',
    },
    {
      title: 'Chronic Disease Management',
      desc: 'We provide specialized care for patients with chronic conditions such as diabetes, high blood pressure, and asthma.',
      src: '/service2.png',
      href: '',
    },
    {
      title: 'Women&apos;s Health',
      desc: 'We offer a range of women&apos;s health services, including gynecological exams, prenatal care, and menopause management.',
      src: '/service3.png',
      href: '',
    },
  ]
  return (
    
    <div className='py-14'>

      <h2 className="mb-8 lg:mb-16 text-3xl font-bold tracking-tight leading-tight text-center text-gray-900 dark:text-white md:text-4xl">Our Services</h2>
      <div className='flex justify-between px-3'>
        
        
        {data.map((item)=>{ 
          return <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <a href="#">
            <img className="rounded-t-lg w-full" src={`${item.src}`} alt="" />
          </a>
          <div className="p-5">
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{item.title}</h5>
            <p className="mb-3 text-sm font-normal text-gray-700 dark:text-gray-400">{item.desc}</p>
            <button href={'#'} className="inline-flex items-center text-sm font-medium text-center text-baseColor rounded-lg hover:underline">
                Read More
                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
            </button>
          </div>
        </div>})}

      </div>
    
    </div>
  )
}

export default Card