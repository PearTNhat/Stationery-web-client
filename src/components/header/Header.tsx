import { useEffect, useState } from 'react'
import { ShoppingCart, Search, Menu, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { publicPaths } from '~/constance/paths'
import { useAppDispatch, useAppSelector } from '~/hooks/redux'
import { userActions } from '~/store/slices/user'
import { showToastSuccess } from '~/utils/alert'
import { dropDownProfile } from '~/constance/dropdown'

function Header() {
  const [theme, setTheme] = useState<string>(localStorage.getItem('theme') || 'light')
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isLoggedIn, userData } = useAppSelector((state) => state.user)
  console.log(userData)
  useEffect(() => {
    if (theme) {
      localStorage.setItem('theme', theme)
      document.documentElement.setAttribute('data-theme', theme)
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }
  const handleLogout = () => {
    dispatch(userActions.logout())
    showToastSuccess('Logout successfully')
    navigate('/')
  }

  useEffect(() => {
    console.log('isLoggedIn', isLoggedIn)
  }, [isLoggedIn])
  return (
    <nav className='shadow-md px-6 py-3 flex items-center justify-between md:px-10'>
      {/* Logo */}
      <div className='text-2xl font-bold text-blue-600 cursor-pointer'>Stationery's X</div>

      {/* Menu trên màn hình lớn */}
      <div className='hidden md:flex space-x-6 text-gray-700'>
        <Link to={publicPaths.PUBLIC} className='hover:text-blue-500 transition'>
          Home
        </Link>
        <Link to={publicPaths.PRODUCT} className='hover:text-blue-500 transition'>
          Product
        </Link>
        <Link to={publicPaths.PUBLIC} className='hover:text-blue-500 transition'>
          Service
        </Link>
        <Link to={publicPaths.PUBLIC} className='hover:text-blue-500 transition'>
          About
        </Link>
        <Link to={publicPaths.CONTACT} className='hover:text-blue-500 transition'>
          Contact
        </Link>
      </div>

      {/* Thanh tìm kiếm */}
      <div className='hidden md:flex relative w-80'>
        <input
          type='text'
          placeholder='Search product...'
          className='w-full pl-10 pr-4 py-2 border rounded-lg focus:ring focus:ring-blue-200'
        />
        <Search className='absolute top-2.5 left-3 text-gray-500' size={20} />
      </div>

      {/* Biểu tượng giỏ hàng & đổi giao diện & Đăng nhập */}
      <div className='flex items-center space-x-4'>
        {/* Giỏ hàng */}
        <div className='relative cursor-pointer'>
          <ShoppingCart size={24} className='text-gray-700 hover:text-blue-500 transition' />
          <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full'>3</span>
        </div>

        {/* Chuyển đổi chế độ sáng/tối */}
        <button onClick={toggleTheme} className='p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition'>
          {theme === 'light' ? '🌞' : '🌙'}
        </button>

        {/* Đăng Nhập & Đăng Ký */}
        {isLoggedIn ? (
          <div className=' d-dropdown d-dropdown-hover  d-dropdown-end '>
            <div tabIndex={0} className='w-10 rounded-full overflow-hidden'>
              <img src={userData?.avatar} alt={userData.last_name} />
            </div>
            <ul tabIndex={0} className='d-dropdown-content d-menu bg-base-100 rounded-md z-10 w-52 p-2 shadow-md'>
              {dropDownProfile.map((item) => {
                let Comp: React.ElementType = 'button'
                if (item.to) {
                  Comp = Link
                }
                return (
                  <li key={item.id} className={`${item.styleParent ? item.styleParent : ''}`}>
                    <Comp
                      {...(item.to ? { to: item.to } : {})}
                      onClick={item?.onClick ? handleLogout : undefined}
                      className={`flex items-center w-full px-4 py-2 ${item.style ? item.style : ' text-gray-700 hover:bg-gray-100 transition'}`}
                    >
                      {item.icon}
                      {item.name}
                    </Comp>
                  </li>
                )
              })}
            </ul>
          </div>
        ) : (
          <div className='hidden md:flex space-x-3'>
            <button
              onClick={() => navigate('/auth?mode=login')}
              className='px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition'
            >
              Login
            </button>
            <button
              onClick={() => navigate('/auth?mode=register')}
              className='px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition'
            >
              Register
            </button>
          </div>
        )}

        {/* Menu mobile */}
        <button className='md:hidden' onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Menu Mobile */}
      {isMenuOpen && (
        <div className='absolute top-16 left-0 w-full bg-white shadow-md md:hidden z-[999999]'>
          <div className='flex flex-col space-y-4 p-4 text-gray-700'>
            <Link to={publicPaths.PUBLIC} className='hover:text-blue-500 transition'>
              Home
            </Link>
            <Link to={publicPaths.PUBLIC} className='hover:text-blue-500 transition'>
              Product
            </Link>
            <Link to={publicPaths.PUBLIC} className='hover:text-blue-500 transition'>
              Service
            </Link>
            <Link to={publicPaths.PUBLIC} className='hover:text-blue-500 transition'>
              About
            </Link>
            <Link to={publicPaths.PUBLIC} className='hover:text-blue-500 transition'>
              Contact
            </Link>
            <div className='flex items-center space-x-4 border-t pt-4'>
              <ShoppingCart size={24} />
              <button onClick={toggleTheme} className='p-2 rounded-full bg-gray-200'>
                {theme === 'light' ? '🌞' : '🌙'}
              </button>
            </div>
            {/* Đăng Nhập & Đăng Ký trên mobile */}
            <button
              onClick={() => navigate('/auth?mode=login')}
              className='px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition'
            >
              Login
            </button>
            <button
              onClick={() => navigate('/auth?mode=register')}
              className='px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition'
            >
              Register
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Header
