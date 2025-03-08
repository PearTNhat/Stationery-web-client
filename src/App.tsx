import { Route, Routes } from 'react-router-dom'
import { useAppSelector } from './hooks/redux'
import { adminPath, pulictPath } from './constance/paths'
import PublicLayout from './pages/public/home/PublicLayout'
import Home from './pages/public/home/home/Home'
import Login from './pages/public/auth/Login'
import Register from './pages/public/auth/Register'
import DashBoard from './pages/admin/dashBoard/DashBoard'
import AdminLayout from './pages/admin/AdminLayout'
import ManageDepartments from './pages/admin/department/ManageDepartments'
import UserManagement from './pages/admin/user/UserManagement'
import ProductsManagement from './pages/admin/product/ProductsManagement'
import Modal from './components/model/Modal'
import AuthPage from './pages/public/auth/AuthPage'
import ProductPage from './pages/public/home/product/ProductPage'
import ProductDetail from './pages/public/home/product/ProductDetails'
import Contact from './pages/public/home/contact/Contact'
import PaymentConfirmation from './pages/public/home/product/PaymentConfirmation'

// import Hero from '~/sections/Hero'
function App() {
  const { childrenModal, isOpenModal } = useAppSelector((state) => state.modal)
  return (
    <div className='bg-baseBackground h-screen text-baseText'>
      <Modal isOpen={isOpenModal}>{childrenModal}</Modal>
      <Routes>
        <Route path={pulictPath.PUBLIC} element={<PublicLayout />}>
          <Route path='/auth' element={<AuthPage />} />
          <Route path={pulictPath.LOGIN} element={<Login />} />
          <Route path={pulictPath.REGISTER} element={<Register />} />
          <Route index element={<Home />} />
          <Route path={pulictPath.PRODUCT} element={<ProductPage />} />
          <Route path='/product/:id' element={<ProductDetail />} />
          <Route path='/products/payment/:id' element={<PaymentConfirmation />} />
          <Route path={pulictPath.CONTACT} element={<Contact />} />
        </Route>
        <Route path={adminPath.ADMIN} element={<AdminLayout />}>
          <Route index element={<DashBoard />} />
          <Route path={adminPath.USER} element={<UserManagement />} />
          <Route path={adminPath.PRODUCT} element={<ProductsManagement />} />
          <Route path={adminPath.DEPARTMENT} element={<ManageDepartments />} />
          <Route path={adminPath.DEPARTMENT} element={<ManageDepartments />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
