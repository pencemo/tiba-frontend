import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/Logo.svg'
import logo2 from '../../assets/Logo2.svg'
import { GibbousMoonIcon, Search01Icon, Sun02Icon, UserIcon } from 'hugeicons-react'
import { useChangeTheme } from '@/Context/Theme'
import { SlideLink } from './SlidLinks'
import { usePorfile } from '@/Context/ProfileContext'

function Navbar() {
  const [isScrolled, setScrolled] = useState(false)
  const {profile}=usePorfile()
  const {toggleTheme, isDark}=useChangeTheme()
  useEffect(()=>{
    window.addEventListener('scroll', () => {
      if(window.scrollY > 100){
        setScrolled(true)
      }else{
        setScrolled(false)
      }
    })
  }, [])

  return (
    <div className={`w-full fixed px-3 top-0 left-0 z-50 ${isScrolled ? 'bg-white dark:bg-zinc-900 text- zinc-900 py-5 shadow-md' : 'py-6'} transition-all duration-300`}>
        <div className='w-full max-w-[85rem] mx-auto flex justify-between items-center'>
            <Link to={'/'}>
                <img className='md:w-24 w-20' src={isDark? logo2 :logo} alt="" />
            </Link>
            <div className=' flex items-center gap-4 max-md:hidden'>
                <Link to={'/'} className='line relative font-medium mx-2'>Home</Link>
                <Link to={'/cars'} className='line relative font-medium mx-2'>All Cars</Link>
                <Link to={'/about'} className='line relative font-medium mx-2'>About</Link>
                {/* <Link to={'/'} className='line relative font-medium mx-2'>Services</Link> */}
                <Link to={'/contact'} className='line relative font-medium mx-2'>Contact</Link>
            </div>
            <div className='flex items-center gap-3 md:gap-6'>
                {/* <Link to={'/'} className=''>
                    <Search01Icon/>
                </Link> */}
                <button onClick={()=>toggleTheme()} className=''>
                    {isDark ?  <Sun02Icon/> : <GibbousMoonIcon/>}
                </button>
                {profile ?
                <Link to={'/user'} className=''>
                    <UserIcon/>
                </Link>:
                <Link to={'/login'} className='py-1.5 text-sm px-3 md:px-5 bg-foreground text-background'>
                    Login
                </Link>
                }
                <SlideLink/>
               
            </div>
        </div>
    </div>
  )
}

export default Navbar