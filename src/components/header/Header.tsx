import { useEffect, useState } from 'react'
import { ShoppingCart, Menu, X } from 'lucide-react'
import { useNavigate, NavLink, Link } from 'react-router-dom'
import { publicPaths } from '~/constance/paths'
import { useAppDispatch, useAppSelector } from '~/hooks/redux'
import { userActions } from '~/store/slices/user'
import { showToastError, showToastSuccess } from '~/utils/alert'
import { dropDownProfile } from '~/constance/dropdown'
import Cart from '~/pages/public/cart/Cart'
import { apiLogout } from '~/api/authenticate'
import { fetchCategories } from '~/store/actions/category'
import { CartItem } from '~/types/cart'
import { apiGetCartItems } from '~/api/cart'
import { fetchMyVocher } from '~/store/actions/promotion'
import SearchWithSuggestions from '../search/SearchWithSuggestions'

function Header() {
  const navigate = useNavigate()
  const [theme, setTheme] = useState<string>(localStorage.getItem('theme') || 'light')
  const dispatch = useAppDispatch()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isLoggedIn, userData, accessToken } = useAppSelector((state) => state.user)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  console.log(userData)

  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen)
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
        const response = await apiGetCartItems(accessToken)
        console.log('Cart response:', response)
        if (typeof response !== 'string' && response && Array.isArray(response.result)) {
          setCartItems(response.result)
        } else {
          console.error('Unexpected response format:', response)
        }
      }
    } catch (err) {
      console.error('Failed to fetch cart:', err)
    }
  }

  useEffect(() => {
    if (isLoggedIn && accessToken && userData?.userId) {
      fetchCart()
      dispatch(fetchCategories())
      dispatch(fetchMyVocher({ accessToken }))
    }
  }, [isLoggedIn, accessToken])

  return (
    <nav className='fixed top-0 left-0 right-0 z-50 shadow-md bg-white px-6 py-3 flex items-center justify-between md:px-10 dark:bg-gray-800'>
      {/* Logo */}
      <Link to='/'>
        <div className='text-2xl font-bold text-blue-600 cursor-pointer dark:text-blue-400'>Stationery's P</div>
      </Link>

      {/* Desktop Menu */}
      <div className='hidden md:flex space-x-6 text-gray-700 dark:text-gray-300'>
        <NavLink
          to={publicPaths.PUBLIC}
          className={({ isActive }) =>
            isActive
              ? 'text-blue-600 font-bold dark:text-blue-400'
              : 'text-gray-700 hover:text-blue-500 transition dark:hover:text-blue-400'
          }
        >
          Home
        </NavLink>
        <NavLink
          to={publicPaths.ABOUT}
          className={({ isActive }) =>
            isActive
              ? 'text-blue-600 font-bold dark:text-blue-400'
              : 'text-gray-700 hover:text-blue-500 transition dark:hover:text-blue-400'
          }
        >
          About
        </NavLink>
        <NavLink
          to={publicPaths.PRODUCT}
          className={({ isActive }) =>
            isActive
              ? 'text-blue-600 font-bold dark:text-blue-400'
              : 'text-gray-700 hover:text-blue-500 transition dark:hover:text-blue-400'
          }
        >
          Product
        </NavLink>
        <NavLink
          to={publicPaths.SERVICE}
          className={({ isActive }) =>
            isActive
              ? 'text-blue-600 font-bold dark:text-blue-400'
              : 'text-gray-700 hover:text-blue-500 transition dark:hover:text-blue-400'
          }
        >
          Service
        </NavLink>
        <NavLink
          to={publicPaths.CONTACT}
          className={({ isActive }) =>
            isActive
              ? 'text-blue-600 font-bold dark:text-blue-400'
              : 'text-gray-700 hover:text-blue-500 transition dark:hover:text-blue-400'
          }
        >
          Contact
        </NavLink>
      </div>

      {/* Search Component */}
      <div className='hidden md:block'>
        <SearchWithSuggestions />
      </div>

      {/* Icons Section */}
      <div className='flex items-center space-x-4'>
        {/* Cart */}
        <div className='relative cursor-pointer' onClick={handleCartToggle}>
          <ShoppingCart
            size={24}
            className='text-gray-700 hover:text-blue-500 transition dark:text-gray-300 dark:hover:text-blue-400'
          />
          <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full'>
            {cartItems.length}
          </span>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className='p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition dark:bg-gray-700 dark:hover:bg-gray-600'
          aria-label='Toggle dark mode'
        >
          {theme === 'light' ? '🌞' : '🌙'}
        </button>

        {/* User Profile */}
        {isLoggedIn ? (
          <div className='d-dropdown d-dropdown-hover d-dropdown-end'>
            <div tabIndex={0} className='w-10 h-10 rounded-full overflow-hidden'>
              <img src={userData?.avatar} alt={userData?.lastName} className='w-full h-full object-cover' />
            </div>
            <ul
              tabIndex={0}
              className='d-dropdown-content d-menu bg-base-100 rounded-md z-10 w-52 p-2 shadow-md dark:bg-gray-700'
            >
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
                      className={`flex items-center w-full px-4 py-2 ${
                        item.style
                          ? item.style
                          : 'text-gray-700 hover:bg-gray-100 transition dark:text-gray-300 dark:hover:bg-gray-600'
                      }`}
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
              className='px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-500'
            >
              Login
            </button>
            <button
              onClick={() => navigate('/auth?mode=register')}
              className='px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition dark:bg-blue-500 dark:hover:bg-blue-600'
            >
              Register
            </button>
          </div>
        )}

        {/* Mobile Menu Button */}
        <button className='md:hidden' onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label='Toggle menu'>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className='absolute top-16 left-0 w-full bg-white shadow-md md:hidden z-[999999] dark:bg-gray-700'>
          <div className='flex flex-col space-y-4 p-4 text-gray-700 dark:text-gray-300'>
            <NavLink
              to={publicPaths.PUBLIC}
              className={({ isActive }) =>
                isActive
                  ? 'text-blue-600 font-bold dark:text-blue-400'
                  : 'text-gray-700 hover:text-blue-500 transition dark:hover:text-blue-400'
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to={publicPaths.ABOUT}
              className={({ isActive }) =>
                isActive
                  ? 'text-blue-600 font-bold dark:text-blue-400'
                  : 'text-gray-700 hover:text-blue-500 transition dark:hover:text-blue-400'
              }
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </NavLink>
            <NavLink
              to={publicPaths.PRODUCT}
              className={({ isActive }) =>
                isActive
                  ? 'text-blue-600 font-bold dark:text-blue-400'
                  : 'text-gray-700 hover:text-blue-500 transition dark:hover:text-blue-400'
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Product
            </NavLink>
            <NavLink
              to={publicPaths.SERVICE}
              className={({ isActive }) =>
                isActive
                  ? 'text-blue-600 font-bold dark:text-blue-400'
                  : 'text-gray-700 hover:text-blue-500 transition dark:hover:text-blue-400'
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Service
            </NavLink>
            <NavLink
              to={publicPaths.CONTACT}
              className={({ isActive }) =>
                isActive
                  ? 'text-blue-600 font-bold dark:text-blue-400'
                  : 'text-gray-700 hover:text-blue-500 transition dark:hover:text-blue-400'
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </NavLink>
            <div className='flex items-center space-x-4 border-t pt-4 dark:border-gray-600'>
              <div className='relative cursor-pointer' onClick={handleCartToggle}>
                <ShoppingCart size={24} className='text-gray-700 dark:text-gray-300' />
                <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full'>
                  {cartItems.length}
                </span>
              </div>
              <button onClick={toggleTheme} className='p-2 rounded-full bg-gray-200 dark:bg-gray-600'>
                {theme === 'light' ? '🌞' : '🌙'}
              </button>
            </div>
            {/* Mobile Login/Register */}
            {!isLoggedIn && (
              <>
                <button
                  onClick={() => {
                    navigate('/auth?mode=login')
                    setIsMenuOpen(false)
                  }}
                  className='px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-500'
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    navigate('/auth?mode=register')
                    setIsMenuOpen(false)
                  }}
                  className='px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition dark:bg-blue-500 dark:hover:bg-blue-600'
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Cart Modal */}
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
