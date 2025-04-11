// src/components/ProfileHeader.tsx
import React, { useState } from 'react'
import { FaEdit, FaSave, FaCamera } from 'react-icons/fa'
import { User } from '~/types/user'

interface ProfileHeaderProps {
  initialData: User | null
  onSave: (updatedData: ProfileHeaderProps['initialData']) => void
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ initialData, onSave }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(initialData)
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(initialData?.avatar || null)

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
  console.log(formData)
  return (
    <div className='bg-white p-6 rounded-xl shadow-lg max-w-3xl mx-auto'>
      {/* Header */}
      <div className='flex justify-between items-center mb-6 border-b pb-4'>
        <h2 className='text-2xl font-semibold text-gray-800'>Thông tin cá nhân</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className='flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md'
        >
          {isEditing ? (
            <>
              <FaSave className='mr-2' /> Lưu
            </>
          ) : (
            <>
              <FaEdit className='mr-2' /> Chỉnh sửa
            </>
          )}
        </button>
      </div>

      {/* Avatar */}
      <div className='flex items-center space-x-6 mb-8'>
        <div className='relative'>
          <img
            src={previewAvatar || 'https://via.placeholder.com/100'}
            alt='Avatar'
            className='w-28 h-28 rounded-full object-cover border-4 border-blue-100 shadow-sm'
          />
          {isEditing && (
            <label className='absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full cursor-pointer hover:bg-blue-600 transition-colors'>
              <FaCamera className='text-white' />
              <input type='file' accept='image/*' onChange={handleAvatarChange} className='hidden' />
            </label>
          )}
        </div>
        <div>
          <h3 className='text-xl font-medium text-gray-800'>{formData?.firstName + ' ' + formData?.lastName}</h3>
          <p className='text-gray-500'>{formData?.firstName + ' ' + formData?.lastName}</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className='space-y-6'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {[
            { label: 'Username', name: 'username', type: 'text' },
            { label: 'Họ tên', name: 'fullName', type: 'text' },
            { label: 'Email', name: 'email', type: 'email' },
            { label: 'Ngày sinh', name: 'birthDate', type: 'date' },
            {
              label: 'Giới tính',
              name: 'gender',
              type: 'select',
              options: ['Nam', 'Nữ', 'Khác']
            },
            { label: 'Số điện thoại', name: 'phone', type: 'tel' },
            { label: 'Địa chỉ', name: 'address', type: 'text', colSpan: true }
          ].map((field) => (
            <div key={field.name} className={field.colSpan ? 'md:col-span-2' : ''}>
              <label className='block text-sm font-medium text-gray-700 mb-1'>{field.label}</label>
              {isEditing ? (
                field.type === 'select' ? (
                  <select
                    name={field.name}
                    value={formData ? [field.name as keyof typeof formData] : ''}
                    onChange={handleInputChange}
                    className='w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
                  >
                    {field.options?.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData ? [field.name as keyof typeof formData] : ''}
                    onChange={handleInputChange}
                    className='w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
                  />
                )
              ) : (
                <p className='text-gray-800 bg-gray-50 p-2 rounded-md'>
                  {formData ? [field.name as keyof typeof formData] : ''}
                </p>
              )}
            </div>
          ))}
        </div>
      </form>
    </div>
  )
}

export default ProfileHeader
