import { Route, Routes } from 'react-router-dom'
import Login from './pages/public/auth/Login'
import Register from './pages/public/auth/Register'
import AuthPage from './pages/public/auth/AuthPage'
import ProductPage from './pages/public/product/productpage/ProductPage'
import ProductDetail from './pages/public/product/productdetail/ProductDetails'
import PaymentConfirmation from './pages/user/paymentconfirmation/PaymentConfirmation'
import Contact from './pages/public/contact/Contact'
import PublicLayout from './pages/public/PublicLayout'
import Home from './pages/home/Home'
import UserProfile from './pages/user/profile/UserProfile'
import About from './pages/public/about/About'
import Service from './pages/public/service/Service'
import { departmentPath, publicPath, userPath } from './constance/paths'
import DepartmentLayout from './pages/department/DepartmentLayout'
import Dashboard from './pages/department/dashboard/Dashboard'
import Product from './pages/department/product/Product'

function App() {
  return (
    <div className='bg-baseBackground h-screen text-baseText'>
      <Routes>
        <Route path={publicPath.PUBLIC} element={<PublicLayout />}>
          <Route index element={<Home/>} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path={publicPath.LOGIN} element={<Login />} />
          <Route path={publicPath.REGISTER} element={<Register />} />
          <Route path={userPath.PROFILE} element={<UserProfile />} />
          <Route path={publicPath.PRODUCT} element={<ProductPage/>} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/products/payment/:id" element={<PaymentConfirmation />} />
          <Route path={publicPath.ABOUT} element={<About />} />
          <Route path={publicPath.SERVICE} element={<Service />} />
          <Route path={publicPath.CONTACT} element={<Contact />} />
        </Route>
        <Route path={departmentPath.DASHBOARD} element={<DepartmentLayout />}>
          <Route index element={<Dashboard />} />
          <Route path={departmentPath.PRODUCT} element={<Product/>} />
        </Route>
        <Route path={"*"} element={<h1>Not</h1>}/>
      </Routes>
    
    </div>
  )
}

export default App
