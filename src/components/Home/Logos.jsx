import React from 'react'
import { logos } from '@/Utils/Logos'
import Slider from 'react-infinite-logo-slider'

function Logos() {
  return (
    <div className='py-20'>
      <Slider
            width="200px"
            duration={40}
            pauseOnHover={true}
            blurBorders={true}
            blurBorderColor={'#fff'}
            >
            {logos.map((logo) =>{
              return (
            <Slider.Slide className=''>
            <img className='w-24 grayscale hover:grayscale-0' src={logo} alt="" />
            </Slider.Slide>)
            })}
            
        </Slider>
    </div>
  )
}

export default Logos
