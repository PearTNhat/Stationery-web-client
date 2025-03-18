import { MapPin, Mail, Phone } from 'lucide-react'
import { FaFacebookF, FaTiktok, FaInstagram } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { publicPaths } from '~/constance/paths'
const Footer = () => {
  return (
    <footer className='bg-gray-800 text-white py-8'>
      <div className='container mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 px-4 mb-5'>
        <div className='space-y-3'>
          <h3 className='font-bold text-xl mb-3'>Address Information</h3>

          <div className='flex items-center gap-3'>
            <MapPin className='w-6 h-6' />
            <span>97 Man Thien Street, Hiep Phu, Thu Duc, Ho Chi Minh City</span>
          </div>

          <div className='flex items-center gap-3'>
            <Mail className='w-6 h-6' />
            <span>info@shopx.com</span>
          </div>

          <div className='flex items-center gap-3'>
            <Phone className='w-6 h-6' />
            <span>0969 895 549</span>
          </div>
        </div>
        <div>
          <h3 className='font-bold text-lg mb-2'>Quick Links</h3>
          <div className='flex flex-col space-y-2'>
            <Link to={publicPaths.PUBLIC} className='hover:text-blue-500 transition'>
              Home
            </Link>
            <Link to={publicPaths.ABOUT} className='hover:text-blue-500 transition'>
              About
            </Link>
            <Link to={publicPaths.PRODUCT} className='hover:text-blue-500 transition'>
              Product
            </Link>
            <Link to={publicPaths.SERVICE} className='hover:text-blue-500 transition'>
              Service
            </Link>
            <Link to={publicPaths.CONTACT} className='hover:text-blue-500 transition'>
              Contact
            </Link>
          </div>
        </div>
        <div>
          <h3 className='font-bold text-lg mb-2'>Featured Products</h3>
          <ul>
            <li>
              <a href='#' className='hover:text-blue-400'>
                Product 1
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-blue-400'>
                Product 2
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-blue-400'>
                Product 3
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className='font-bold text-lg mb-2'>Subscribe for Updates</h3>
          <div className='mt-4 flex space-x-4 mb-4'>
            <a
              href='https://www.facebook.com'
              target='_blank'
              rel='noopener noreferrer'
              className='bg-blue-600 p-3 rounded-full hover:bg-blue-700 transition-colors'
            >
              <FaFacebookF className='text-white text-xl' />
            </a>
            <a
              href='https://www.tiktok.com'
              target='_blank'
              rel='noopener noreferrer'
              className='bg-black p-3 rounded-full hover:bg-gray-800 transition-colors'
            >
              <FaTiktok className='text-white text-xl' />
            </a>
            <a
              href='https://www.instagram.com'
              target='_blank'
              rel='noopener noreferrer'
              className='bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 p-3 rounded-full hover:opacity-80 transition-opacity'
            >
              <FaInstagram className='text-white text-xl' />
            </a>
          </div>
          <div className='flex space-x-2'>
            <input type='email' placeholder='Enter your email' className='w-full p-2 rounded text-gray-900' />
            <button className='bg-blue-600 px-4 py-2 rounded-full hover:bg-blue-700'>Subscribe</button>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%', maxWidth: '100%' }}>
        <iframe
          src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.520141589769!2d106.78408977485802!3d10.847986989305186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752772b245dff1%3A0xb838977f3d419d!2zSOG7jWMgdmnhu4duIEPDtG5nIG5naOG7hyBCxrB1IENow61uaCBWaeG7hW4gVGjDtG5nIGPGoSBz4bufIHThuqFpIFRQLkhDTQ!5e0!3m2!1svi!2s!4v1740816613965!5m2!1svi!2s'
          width='90%'
          height='400'
          style={{ border: 0 }}
          allowFullScreen
          loading='lazy'
          referrerPolicy='no-referrer-when-downgrade'
        />
      </div>
      <hr className='border-gray-600 my-6' />
      <div className='text-center mt-8'>
        <p>&copy; 2025 Stationery's X. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
