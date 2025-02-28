import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'

const PublicLayout: React.FC = () => {
  return (
    <div>
      <Header />
      <div className=''>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default PublicLayout
