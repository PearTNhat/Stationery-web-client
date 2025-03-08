import { Route, Routes } from 'react-router-dom'
import { useAppSelector } from './hooks/redux'
import { paths } from './constance/paths'
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
        <Route path={paths.PUBLIC} element={<PublicLayout />}>
          <Route path='/auth' element={<AuthPage />} />
          <Route path={paths.LOGIN} element={<Login />} />
          <Route path={paths.REGISTER} element={<Register />} />
          <Route index element={<Home />} />
          <Route path={paths.PRODUCT} element={<ProductPage />} />
          <Route path='/products/:id' element={<ProductDetail />} />
          <Route path='/products/payment/:id' element={<PaymentConfirmation />} />
          <Route path={paths.CONTACT} element={<Contact />} />
        </Route>
        <Route path={paths.ADMIN} element={<AdminLayout />}>
          <Route index element={<DashBoard />} />
          <Route path={paths.USER} element={<UserManagement />} />
          <Route path={paths.PRODUCT} element={<ProductsManagement />} />
          <Route path={paths.DEPARTMENT} element={<ManageDepartments />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
