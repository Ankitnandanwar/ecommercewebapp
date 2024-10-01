import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'About'} text2={'Us'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img src={assets.about_img} alt="about_img" className='w-full md:max-w-[450px]'/>
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio, voluptas. Vel repellendus porro, quae sit, deserunt obcaecati corporis perspiciatis voluptatem assumenda a repudiandae nobis optio nemo, nisi expedita. Sequi, adipisci.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. In veritatis neque sunt! Quis nam vero doloribus nobis perferendis itaque quo aperiam unde nihil. Dicta reiciendis expedita, animi fuga possimus facilis?</p>
          <b className='text-gray-600'>Our Mission</b>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet voluptas sit quo porro impedit sed ut aliquid omnis consequuntur cum, quibusdam iusto, atque delectus. Dolore corrupti est ad deleniti magnam?</p>
        </div>
      </div>

      <div className='text-xl py-4'>
        <Title text1={'Why'} text2={'Choose Us'}/>
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-6'>
          <b className=''>Quality Assurance:</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque nam, sapiente eaque sit debitis, option.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-6'>
          <b className=''>Convenience:</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque nam, sapiente eaque sit debitis, option.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-6'>
          <b className=''>Exceptional Customer Service:</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque nam, sapiente eaque sit debitis, option.</p>
        </div>
      </div>

      <NewsLetterBox/>
    </div>
  )
}

export default About