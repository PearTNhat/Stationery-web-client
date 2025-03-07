import { Route, Routes } from 'react-router-dom'
import { paths } from './constance/paths'
import PublicLayout from './pages/public/home/PublicLayout'
import Home from './pages/public/home/home/Home'
import Login from './pages/public/auth/Login'
import Register from './pages/public/auth/Register'
import AuthPage from './pages/public/auth/AuthPage'
import ProductPage from './pages/public/home/product/ProductPage'
import ProductDetail from './pages/public/home/product/ProductDetails'
import Contact from './pages/public/home/contact/Contact'
import PaymentConfirmation from './pages/public/home/product/PaymentConfirmation'

// import Hero from '~/sections/Hero'
function App() {
  return (
    <div className='bg-baseBackground h-screen text-baseText'>
      <Routes>
        <Route path={paths.PUBLIC} element={<PublicLayout />}>
          <Route path="/auth" element={<AuthPage />} />
          <Route path={paths.LOGIN} element={<Login />} />
          <Route path={paths.REGISTER} element={<Register />} />
          <Route index element={<Home />} />
          <Route path={paths.PRODUCT} element={<ProductPage />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/products/payment/:id" element={<PaymentConfirmation />} />
          <Route path={paths.CONTACT} element={<Contact />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
