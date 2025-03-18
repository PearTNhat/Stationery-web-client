import { Route, Routes } from 'react-router-dom'
import { useAppSelector } from './hooks/redux'
import { adminPaths, publicPaths } from './constance/paths'
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
import VoucherManagement from './pages/admin/voucher/VoucherManagement'
import CommentContainer from './components/comment/CommentContainer'

// import Hero from '~/sections/Hero'
function App() {
  const { childrenModal, isOpenModal } = useAppSelector((state) => state.modal)
  return (
    <div className='bg-baseBackground h-screen text-baseText'>
      <Modal isOpen={isOpenModal}>{childrenModal}</Modal>
      <Routes>
        <Route path={publicPaths.PUBLIC} element={<PublicLayout />}>
          <Route path='/auth' element={<AuthPage />} />
          <Route path={publicPaths.LOGIN} element={<Login />} />
          <Route path={publicPaths.REGISTER} element={<Register />} />
          <Route index element={<Home />} />
          <Route path={publicPaths.PRODUCT} element={<ProductPage />} />
          <Route path='/products/:id' element={<ProductDetail />} />
          <Route path='/products/payment/:id' element={<PaymentConfirmation />} />
          <Route path={publicPaths.CONTACT} element={<Contact />} />
          <Route path={'/comment'} element={<CommentContainer />} />
        </Route>
        <Route path={adminPaths.ADMIN} element={<AdminLayout />}>
          <Route index element={<DashBoard />} />
          <Route path={adminPaths.USER} element={<UserManagement />} />
          <Route path={adminPaths.PRODUCT} element={<ProductsManagement />} />
          <Route path={adminPaths.DEPARTMENT} element={<ManageDepartments />} />
          <Route path={adminPaths.VOUCHER} element={<VoucherManagement />} />
        </Route>
        <Route path='*' element={<h1>Not Found</h1>} />
      </Routes>
    </div>
  )
}

export default App
