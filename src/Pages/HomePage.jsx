import About from '@/components/Home/About'
import Fetcher from '@/components/Home/Fetcher'
import FindCars from '@/components/Home/FindCars'
import Icons from '@/components/Home/Icons'
import Logos from '@/components/Home/Logos'
import ManiSection from '@/components/Home/ManiSection'
import Section from '@/components/Home/Section'
import ShowRoom from '@/components/Home/ShowRoom'
import Footer from '@/components/Navbar/Footer'
import Navbar from '@/components/Navbar/Navbar'
import React from 'react'

function HomePage() {
  return (
    <div>
        <Navbar/>
        <ManiSection/>
        <Icons/>
        <FindCars/>
        <Logos/>
        <Section/>
        <Fetcher/>
        <About/>
        <ShowRoom/>
        <Footer/>
    </div>
  )
}

export default HomePage