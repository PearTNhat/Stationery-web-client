// src/pages/UserProfile.tsx
import React, { useEffect, useState } from 'react'
import ProfileHeader from './ProfileHeader'
import PasswordChange from './PasswordChange'
import OrderTabs from './OrderTab'
import Sidebar from './Sidebar'
import { useAppDispatch, useAppSelector } from '~/hooks/redux'
import { useNavigate } from 'react-router-dom'
import { User } from '~/types/user'
import { apiGetUserInfo, apiUpdateUserInfo } from '~/api/users'
import { showAlertError, showAlertSucess } from '~/utils/alert'
import { fetchCurrentUser } from '~/store/actions/user'

interface Order {
  id: string
  status: 'Đang chuẩn bị hàng' | 'Đã xác nhận đơn hàng' | 'Đang Giao' | 'Đã hủy'
  date: string
}

const UserProfile: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState<string>('profile')
  const { accessToken, isLoggedIn, userData } = useAppSelector((state) => state.user)
  const [loading, setLoading] = useState(false)

  const orders: Order[] = [
    { id: '001', status: 'Đang chuẩn bị hàng', date: '2025-03-06' },
    { id: '002', status: 'Đã xác nhận đơn hàng', date: '2025-03-05' },
    { id: '003', status: 'Đang Giao', date: '2025-03-04' },
    { id: '004', status: 'Đã hủy', date: '2025-03-03' }
  ]

  const handleLogout = (): void => {
    console.log('Đã đăng xuất')
    // Logic đăng xuất: xóa token, chuyển hướng
    navigate('/')
  }

  const handleSaveProfile = async (updatedData: User | null, file: File | null) => {
    if (!updatedData) {
      console.warn('No data to update')
      return
    }
    const formData = new FormData()
    if (file) {
      formData.append('file', file)
    }
    formData.append('document', JSON.stringify({ ...updatedData }))
    if (!accessToken) {
      showAlertError('You must be logged in to update your profile.')
      return
    }
    const res = await apiUpdateUserInfo({ accessToken, formData })
    if (res.code === 200) {
      showAlertSucess('Update profile successfully')
      dispatch(fetchCurrentUser({ token: accessToken }))
    } else {
      showAlertError(res.message || 'Failed to update profile')
    }
    // Gọi API để cập nhật dữ liệu nếu cần
  }

  useEffect(() => {
    if (!isLoggedIn || !accessToken) {
      navigate('/')
      return
    }
    dispatch(fetchCurrentUser({ token: accessToken }))
  }, [accessToken, isLoggedIn, dispatch, navigate])

  // src/pages/UserProfile.tsx
  const renderContent = () => {
    if (loading) {
      return <div className='text-center text-gray-500'>Đang tải...</div>
    }
    if (Object.keys(userData || {}).length === 0) {
      return <div className='text-center text-gray-500'>Không có dữ liệu người dùng</div>
    }
    switch (activeSection) {
      case 'profile':
        // Truyền userData.result thay vì userData

        return <ProfileHeader initialData={userData ?? null} onSave={handleSaveProfile} />
      case 'password':
        return <PasswordChange />
      case 'orders':
        return <OrderTabs orders={orders} />
      default:
        return null
    }
  }

  return (
    <div className='min-h-screen bg-gray-100 flex mt-16'>
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} onLogout={handleLogout} />
      <div className='flex-1 p-10'>{renderContent()}</div>
    </div>
  )
}

export default UserProfile
