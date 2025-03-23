import { useEffect, useState } from 'react'
import { ShoppingCart, Search, Menu, X } from 'lucide-react'
import { useNavigate, NavLink } from 'react-router-dom'
import { publicPaths } from '~/constance/paths'
import { useAppDispatch, useAppSelector } from '~/hooks/redux'
import { userActions } from '~/store/slices/user'
import { showToastSuccess } from '~/utils/alert'
import Cart from '~/pages/public/cart/Cart'

function Header() {
  const [theme, setTheme] = useState<string>(localStorage.getItem('theme') || 'light')
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isLoggedIn, userData } = useAppSelector((state) => state.user)
  const [isCartOpen, setIsCartOpen] = useState(false); 

  const sampleCartItems = [
    {
      id: 1,
      name: "Product 1",
      price: 20.0,
      quantity: 2,
      image: "https://stbcuulong.edu.vn/wp-content/uploads/2023/06/L4_KNTT_TiengViet4.1-scaled.jpg",
    },
    {
      id: 2,
      name: "Product 2",
      price: 15.0,
      quantity: 1,
      image: "https://stbcuulong.edu.vn/wp-content/uploads/2023/06/L4_KNTT_TiengViet4.1-scaled.jpg",
    },
  ];

  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen); // Mở hoặc đóng giỏ hàng
  };

  useEffect(() => {
    if (theme) {
      localStorage.setItem('theme', theme)
      document.documentElement.setAttribute('data-theme', theme)
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  useEffect(() => {
    console.log('isLoggedIn', isLoggedIn)
  }, [isLoggedIn])
  return (
    <nav className='fixed top-0 left-0 right-0 z-50 shadow-md bg-white px-6 py-3 flex items-center justify-between md:px-10'>
      {/* Logo */}
      <div className='text-2xl font-bold text-blue-600 cursor-pointer'>Stationery's P</div>

      {/* Menu trên màn hình lớn */}
      <div className='hidden md:flex space-x-6 text-gray-700'>
        <NavLink to={publicPaths.PUBLIC} className={({ isActive }) => isActive ? 'text-blue-600 font-bold' : 'text-gray-700 hover:text-blue-500 transition'}>
          Home
        </NavLink>
        <NavLink to={publicPaths.ABOUT} className={({ isActive }) => isActive ? 'text-blue-600 font-bold' : 'text-gray-700 hover:text-blue-500 transition'}>
          About
        </NavLink>
        <NavLink to={publicPaths.PRODUCT} className={({ isActive }) => isActive ? 'text-blue-600 font-bold' : 'text-gray-700 hover:text-blue-500 transition'}>
          Product
        </NavLink>
        <NavLink to={publicPaths.SERVICE} className={({ isActive }) => isActive ? 'text-blue-600 font-bold' : 'text-gray-700 hover:text-blue-500 transition'}>
          Service
        </NavLink>
        <NavLink to={publicPaths.CONTACT} className={({ isActive }) => isActive ? 'text-blue-600 font-bold' : 'text-gray-700 hover:text-blue-500 transition'}>
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
          <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full'>{sampleCartItems.length}</span>
        </div>

        {/* Chuyển đổi chế độ sáng/tối */}
        <button onClick={toggleTheme} className='p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition'>
          {theme === 'light' ? '🌞' : '🌙'}
        </button>

        {/* Đăng Nhập & Đăng Ký */}
        {isLoggedIn ? (
          <div
            className='w-10 rounded-full overflow-hidden'
            onClick={() => {
              dispatch(userActions.logout())
              showToastSuccess('Logout successfully')
            }}
          >
            <img src='https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp' />
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
            <NavLink to={publicPaths.PUBLIC} className={({ isActive }) => isActive ? 'text-blue-600 font-bold' : 'text-gray-700 hover:text-blue-500 transition'}>
              Home
            </NavLink>
            <NavLink to={publicPaths.ABOUT} className={({ isActive }) => isActive ? 'text-blue-600 font-bold' : 'text-gray-700 hover:text-blue-500 transition'}>
              About
            </NavLink>
            <NavLink to={publicPaths.PRODUCT} className={({ isActive }) => isActive ? 'text-blue-600 font-bold' : 'text-gray-700 hover:text-blue-500 transition'}>
              Product
            </NavLink>
            <NavLink to={publicPaths.SERVICE} className={({ isActive }) => isActive ? 'text-blue-600 font-bold' : 'text-gray-700 hover:text-blue-500 transition'}>
              Service
            </NavLink>
            <NavLink to={publicPaths.CONTACT} className={({ isActive }) => isActive ? 'text-blue-600 font-bold' : 'text-gray-700 hover:text-blue-500 transition'}>
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
        cartItems={sampleCartItems} // Truyền dữ liệu mẫu vào modal giỏ hàng
      />
    </nav>
  )
}

export default Header
