import { usePorfile } from '@/Context/ProfileContext'
import { useLogo } from '@/Utils/LogoEx'
import { useUserNotification } from '@/hooks/QueryHooks/useNotification'
import { Notification03Icon, UserIcon } from 'hugeicons-react'
import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import { authService } from '@/API/services/authService'

function UserNav() {
  const logo = useLogo()
  const {data}=useUserNotification()
  const {profile, setProfile}=usePorfile()
  const handleLogout = () => {
    authService.logout()
      .then(() =>{
        setProfile(null)
      })
  }
  return (
    <header className="border-b">
    <div className="max-w-[85rem] mx-auto px-4 py-4 flex items-center justify-between">
      <Link to="/" className="font-bold text-xl">
        <img src={logo} alt="" className='w-20' />
      </Link>
      <nav className="hidden md:flex items-center space-x-8">
        <Link to="/" className="text-sm">
          Home
        </Link>
        <Link to="/cars" className="text-sm">
          Cars
        </Link>
        <Link to="/about" className="text-sm">
          About
        </Link>
        <Link to="/contact" className="text-sm">
          Contact
        </Link>
      </nav>
      <div className="flex items-center space-x-4">
        <Link to={'/user/notification'} className=" rounded-full relative">
          <Notification03Icon />
          {data?.data?.count > 0 && <div className='size-3.5 bg-red-600 absolute -top-1 right-0 rounded-full text-[10px] text-white grid place-content-center'>{data?.data?.count}</div>}
        </Link>
        {/* <Link to='/user' className="relative">
          <UserIcon  />
        </Link> */}
        {profile &&
        <button onClick={handleLogout} className='bg-foreground text-background px-3 py-1 text-sm font-medium'>Logout</button>
        }
      </div>
    </div>
  </header>
  )
}

export default UserNav