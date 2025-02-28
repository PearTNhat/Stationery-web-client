import { Route, Routes } from 'react-router-dom'
import { paths } from './constance/paths'
import PublicLayout from './pages/public/home/PublicLayout'
import Home from './pages/public/home/home/Home'
import Login from './pages/public/auth/Login'
import Register from './pages/public/auth/Register'

// import Hero from '~/sections/Hero'
function App() {
  return (
    <div className='bg-baseBackground h-screen text-baseText'>
      <Routes>
        <Route path={paths.PUBLIC} element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path={paths.LOGIN} element={<Login />} />
          <Route path={paths.REGISTER} element={<Register />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
