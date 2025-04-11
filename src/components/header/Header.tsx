import { useEffect, useState } from 'react'
import { ShoppingCart, Search, Menu, X } from 'lucide-react'
import { useNavigate, NavLink, Link } from 'react-router-dom'
import { publicPaths } from '~/constance/paths'
import { useAppDispatch, useAppSelector } from '~/hooks/redux'
import { userActions } from '~/store/slices/user'
import { showToastError, showToastSuccess } from '~/utils/alert'
import { dropDownProfile } from '~/constance/dropdown'
import Cart from '~/pages/public/cart/Cart'
import { apiLogout } from '~/api/authenticate'
import { CartItem } from '~/types/cart'
import { apiGetCartItems } from '~/api/cart'

function Header() {
  const [theme, setTheme] = useState<string>(localStorage.getItem('theme') || 'light')
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isLoggedIn, userData, accessToken } = useAppSelector((state) => state.user)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen) // Mở hoặc đóng giỏ hàng
  }

  useEffect(() => {
    if (theme) {
      localStorage.setItem('theme', theme)
      document.documentElement.setAttribute('data-theme', theme)
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  const handleLogout = async () => {
    try {
      const response = await apiLogout({ token: accessToken })

      console.log('Logout response:', response)
      if (response.code == 200) {
        dispatch(userActions.logout())
        showToastSuccess('Logout successfully')
        navigate('/auth?mode=login')
      } else {
        showToastError(response.message || 'Logout failed')
      }
    } catch (error) {
      console.error('Logout error:', error)
      showToastError('Logout failed. Please try again.')
    }
  }
  const fetchCart = async () => {
    try {
      if (isLoggedIn && accessToken) {
        const items = await apiGetCartItems(accessToken)
        console.log('Cart items header:', items)
        if (Array.isArray(items)) {
          setCartItems(items)
        } else {
          console.error('Unexpected response format:', items)
        }
      }
    } catch (err) {
      console.error('Failed to fetch cart:', err)
    }
  }

  useEffect(() => {
    if (isLoggedIn && accessToken && userData?.userId) {
      fetchCart()
    }
  }, [isLoggedIn, accessToken])

  return (
    <nav className='fixed top-0 left-0 right-0 z-50 shadow-md bg-white px-6 py-3 flex items-center justify-between md:px-10'>
      {/* Logo */}
      <div className='text-2xl font-bold text-blue-600 cursor-pointer'>Stationery's P</div>

      {/* Menu trên màn hình lớn */}
      <div className='hidden md:flex space-x-6 text-gray-700'>
        <NavLink
          to={publicPaths.PUBLIC}
          className={({ isActive }) =>
            isActive ? 'text-blue-600 font-bold' : 'text-gray-700 hover:text-blue-500 transition'
          }
        >
          Home
        </NavLink>
        <NavLink
          to={publicPaths.ABOUT}
          className={({ isActive }) =>
            isActive ? 'text-blue-600 font-bold' : 'text-gray-700 hover:text-blue-500 transition'
          }
        >
          About
        </NavLink>
        <NavLink
          to={publicPaths.PRODUCT}
          className={({ isActive }) =>
            isActive ? 'text-blue-600 font-bold' : 'text-gray-700 hover:text-blue-500 transition'
          }
        >
          Product
        </NavLink>
        <NavLink
          to={publicPaths.SERVICE}
          className={({ isActive }) =>
            isActive ? 'text-blue-600 font-bold' : 'text-gray-700 hover:text-blue-500 transition'
          }
        >
          Service
        </NavLink>
        <NavLink
          to={publicPaths.CONTACT}
          className={({ isActive }) =>
            isActive ? 'text-blue-600 font-bold' : 'text-gray-700 hover:text-blue-500 transition'
          }
        >
          Contact
        </NavLink>
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
        <div className='relative cursor-pointer' onClick={handleCartToggle}>
          <ShoppingCart size={24} className='text-gray-700 hover:text-blue-500 transition' />
          <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full'>
            {cartItems.length}
          </span>
        </div>

        {/* Chuyển đổi chế độ sáng/tối */}
        <button onClick={toggleTheme} className='p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition'>
          {theme === 'light' ? '🌞' : '🌙'}
        </button>

        {/* Đăng Nhập & Đăng Ký */}
        {isLoggedIn ? (
          <div className=' d-dropdown d-dropdown-hover  d-dropdown-end '>
            <div tabIndex={0} className='w-10 rounded-full overflow-hidden'>
              <img src={userData?.avatar} alt={userData?.lastName} />
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
            <NavLink
              to={publicPaths.PUBLIC}
              className={({ isActive }) =>
                isActive ? 'text-blue-600 font-bold' : 'text-gray-700 hover:text-blue-500 transition'
              }
            >
              Home
            </NavLink>
            <NavLink
              to={publicPaths.ABOUT}
              className={({ isActive }) =>
                isActive ? 'text-blue-600 font-bold' : 'text-gray-700 hover:text-blue-500 transition'
              }
            >
              About
            </NavLink>
            <NavLink
              to={publicPaths.PRODUCT}
              className={({ isActive }) =>
                isActive ? 'text-blue-600 font-bold' : 'text-gray-700 hover:text-blue-500 transition'
              }
            >
              Product
            </NavLink>
            <NavLink
              to={publicPaths.SERVICE}
              className={({ isActive }) =>
                isActive ? 'text-blue-600 font-bold' : 'text-gray-700 hover:text-blue-500 transition'
              }
            >
              Service
            </NavLink>
            <NavLink
              to={publicPaths.CONTACT}
              className={({ isActive }) =>
                isActive ? 'text-blue-600 font-bold' : 'text-gray-700 hover:text-blue-500 transition'
              }
            >
              Contact
            </NavLink>
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
      {/* Giỏ hàng Modal */}
      <Cart
        isOpen={isCartOpen}
        onClose={handleCartToggle}
        cartItems={cartItems}
        accessToken={accessToken || ''}
        onRefresh={fetchCart}
      />
    </nav>
  )
}

export default Header
