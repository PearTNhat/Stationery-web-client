import { Route, Routes } from 'react-router-dom'
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
// import Modal from './components/model/Modal'
import { useAppSelector } from './hooks/redux'
import Modal from './components/model/Modal'

// import Hero from '~/sections/Hero'
function App() {
  const { childrenModal, isOpenModal } = useAppSelector((state) => state.modal)
  return (
    <div className='bg-baseBackground h-screen text-baseText'>
      <Modal isOpen={isOpenModal}>{childrenModal}</Modal>
      <Routes>
        <Route path={paths.PUBLIC} element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path={paths.LOGIN} element={<Login />} />
          <Route path={paths.REGISTER} element={<Register />} />
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
