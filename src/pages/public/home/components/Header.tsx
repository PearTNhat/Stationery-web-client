import React from 'react'
import { Link } from 'react-router-dom'
import ThemeToggle from '~/components/theme/Theme'
import { paths } from '~/constance/paths'

const Header = () => {
  return (
    <div className='d-navbar shadow-sm border-baseBorder border'>
      <div className='flex-1'>
        <div className='rounded-full overflow-hidden w-16 h-16'>
          <img
            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvAcbcrnO8u8gq7IzJu4npQO7Bu2J2VZKb_Q&s'
            alt=''
          />
        </div>
      </div>
      <div className='flex-none'>
        <div className='flex items-center gap-5 cursor-pointer'>
          <Link to={paths.REGISTER} className=''>
            Register
          </Link>
          <Link to={paths.LOGIN} className=''>
            Login
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </div>
  )
}

export default Header
