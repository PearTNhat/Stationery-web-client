import React, { useState, useEffect } from 'react'
import { FaEdit, FaSave, FaCamera } from 'react-icons/fa'
import { User } from '~/types/user'

interface ProfileHeaderProps {
  initialData: User | null
  onSave: (updatedData: User | null) => void
}

const normalizeUserData = (user: any): User => {
  if ('result' in user) {
    user = user.result
  }

  return {
    ...user,
    dob: user?.dob ?? '',
    phone: user?.phone ?? '',
    avatar: user?.avatar ?? '',
    addresses:
      user?.addresses?.length > 0
        ? user.addresses.map((addr: any, index: number) => ({
            ...addr,
            isDefault: addr?.isDefault ?? index === 0 // gán default nếu chưa có
          }))
        : [{ addressID: '1', addressName: '', isDefault: true }]
  }
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ initialData, onSave }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<User | null>(null)
  const [originalData, setOriginalData] = useState<User | null>(null)
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null)

  useEffect(() => {
    if (initialData) {
      const normalizedData = normalizeUserData(initialData)
      setFormData(normalizedData)
      setOriginalData(normalizedData)
      setPreviewAvatar(normalizedData.avatar || null)
    } else {
      setFormData(null)
      setOriginalData(null)
      setPreviewAvatar(null)
    }
  }, [initialData])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => (prev ? { ...prev, [name]: value } : null))
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        setPreviewAvatar(base64String)
        setFormData((prev) => (prev ? { ...prev, avatar: base64String } : null))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
    setIsEditing(false)
  }

  const handleEditToggle = () => {
    if (isEditing) {
      onSave(formData)
      setIsEditing(false)
    } else {
      if (originalData) {
        setFormData(originalData)
        setPreviewAvatar(originalData.avatar || null)
      }
      setIsEditing(true)
    }
  }

  // 🧠 Lấy địa chỉ mặc định hoặc fallback về cái đầu tiên
  const defaultAddress = formData?.addresses?.find((a) => a.isDefault) || formData?.addresses?.[0]

  return (
    <div className='bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-2xl max-w-4xl mx-auto border border-gray-200'>
      <div className='flex justify-between items-center mb-8 border-b pb-4'>
        <h2 className='text-3xl font-bold text-gray-800 tracking-wide'>Profile Information</h2>
        <button
          onClick={handleEditToggle}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full shadow-md text-white font-medium transition-all duration-300 ${
            isEditing
              ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
              : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
          }`}
        >
          {isEditing ? <FaSave /> : <FaEdit />}
          {isEditing ? 'Save' : 'Edit'}
        </button>
      </div>

      <div className='flex items-center space-x-6 mb-10'>
        <div className='relative group'>
          <img
            src={previewAvatar || 'https://via.placeholder.com/100'}
            alt='Avatar'
            className='w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg transition-transform group-hover:scale-105'
          />
          {isEditing && (
            <label className='absolute bottom-1 right-1 bg-blue-600 p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-all shadow-md'>
              <FaCamera className='text-white text-sm' />
              <input type='file' accept='image/*' onChange={handleAvatarChange} className='hidden' />
            </label>
          )}
        </div>
        <div>
          <h3 className='text-2xl font-semibold text-gray-900'>
            {formData?.firstName} {formData?.lastName}
          </h3>
          <p className='text-gray-500'>Displayed on your public profile</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className='space-y-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {/* First Name */}
          <div>
            <label className='block text-sm font-semibold text-gray-700 mb-2'>First Name</label>
            {isEditing ? (
              <input
                type='text'
                name='firstName'
                value={formData?.firstName || ''}
                onChange={handleInputChange}
                className='w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm transition-all text-gray-900'
              />
            ) : (
              <p className='text-gray-900 bg-gray-100 p-3 rounded-lg shadow-inner'>
                {formData?.firstName || 'Chưa cập nhật'}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className='block text-sm font-semibold text-gray-700 mb-2'>Last Name</label>
            {isEditing ? (
              <input
                type='text'
                name='lastName'
                value={formData?.lastName || ''}
                onChange={handleInputChange}
                className='w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm transition-all text-gray-900'
              />
            ) : (
              <p className='text-gray-900 bg-gray-100 p-3 rounded-lg shadow-inner'>
                {formData?.lastName || 'Chưa cập nhật'}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className='block text-sm font-semibold text-gray-700 mb-2'>Email</label>
            {isEditing ? (
              <input
                type='email'
                name='email'
                value={formData?.email || ''}
                onChange={handleInputChange}
                className='w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm transition-all text-gray-900'
              />
            ) : (
              <p className='text-gray-900 bg-gray-100 p-3 rounded-lg shadow-inner'>
                {formData?.email || 'Chưa cập nhật'}
              </p>
            )}
          </div>

          {/* DOB */}
          <div>
            <label className='block text-sm font-semibold text-gray-700 mb-2'>Date of Birth</label>
            {isEditing ? (
              <input
                type='date'
                name='dob'
                value={formData?.dob || ''}
                onChange={handleInputChange}
                className='w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm transition-all text-gray-900'
              />
            ) : (
              <p className='text-gray-900 bg-gray-100 p-3 rounded-lg shadow-inner'>
                {formData?.dob || 'Chưa cập nhật'}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className='block text-sm font-semibold text-gray-700 mb-2'>Phone Number</label>
            {isEditing ? (
              <input
                type='tel'
                name='phone'
                value={formData?.phone || ''}
                onChange={handleInputChange}
                className='w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm transition-all text-gray-900'
              />
            ) : (
              <p className='text-gray-900 bg-gray-100 p-3 rounded-lg shadow-inner'>
                {formData?.phone || 'Chưa cập nhật'}
              </p>
            )}
          </div>

          {/* Address */}
          <div className='md:col-span-2'>
            <label className='block text-sm font-semibold text-gray-700 mb-2'>Address</label>
            {isEditing ? (
              <input
                type='text'
                name='address'
                value={defaultAddress?.addressName || ''}
                onChange={(e) => {
                  const updatedAddresses = formData?.addresses?.map((addr) =>
                    addr.isDefault ? { ...addr, addressName: e.target.value } : addr
                  )
                  setFormData((prev) => (prev ? { ...prev, addresses: updatedAddresses || [] } : null))
                }}
                className='w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm transition-all text-gray-900'
              />
            ) : (
              <p className='text-gray-900 bg-gray-100 p-3 rounded-lg shadow-inner'>
                {defaultAddress?.addressName || 'Chưa cập nhật'}
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  )
}

export default ProfileHeader
