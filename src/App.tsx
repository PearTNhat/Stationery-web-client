import { Route, Routes } from 'react-router-dom'
import { useAppSelector } from './hooks/redux'
import { adminPaths, publicPaths, userPaths } from './constance/paths'
import Login from './pages/public/auth/Login'
import Register from './pages/public/auth/Register'
import DashBoard from './pages/admin/dashBoard/DashBoard'
import AdminLayout from './pages/admin/AdminLayout'
import ManageDepartments from './pages/admin/department/ManageDepartments'
import UserManagement from './pages/admin/user/UserManagement'
import ProductsManagement from './pages/admin/product/ProductsManagement'
import Modal from './components/model/Modal'
import AuthPage from './pages/public/auth/AuthPage'
import VoucherManagement from './pages/admin/voucher/VoucherManagement'
import CommentContainer from './components/comment/CommentContainer'

// import Hero from '~/sections/Hero'
import ProductPage from './pages/public/product/productpage/ProductPage'
import ProductDetail from './pages/public/product/productdetail/ProductDetails'
import PaymentConfirmation from './pages/user/paymentconfirmation/PaymentConfirmation'
import Contact from './pages/public/contact/Contact'
import PublicLayout from './pages/public/PublicLayout'
import Home from './pages/home/Home'
import UserProfile from './pages/user/profile/UserProfile'
import About from './pages/public/about/About'
import Service from './pages/public/service/Service'
import { departmentPath } from './constance/paths'
import DepartmentLayout from './pages/department/DepartmentLayout'
import Dashboard from './pages/department/dashboard/Dashboard'
import Product from './pages/department/product/Product'

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
          <Route path={userPaths.PROFILE} element={<UserProfile />} />
          <Route path='/products/:id' element={<ProductDetail />} />
          <Route path='/products/payment/:id' element={<PaymentConfirmation />} />
          <Route path={publicPaths.CONTACT} element={<Contact />} />
          <Route path={publicPaths.SERVICE} element={<Service />} />
          <Route path={publicPaths.ABOUT} element={<About />} />
          <Route path={'/comment'} element={<CommentContainer />} />
        </Route>
        <Route path={departmentPath.DASHBOARD} element={<DepartmentLayout />}>
          <Route index element={<Dashboard />} />
          <Route path={departmentPath.PRODUCT} element={<Product />} />
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
