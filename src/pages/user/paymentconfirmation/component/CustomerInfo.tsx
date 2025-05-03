import { useState, useEffect } from 'react'
import { FaEdit, FaSave } from 'react-icons/fa'
import { useAppDispatch } from '~/hooks/redux'
import { UserInfoOrder } from '~/types/order'

interface CustomerInfoProps {
  selectedShippingInfo: { addressName: string; phone: string } | null
  userInfo: UserInfoOrder
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfoOrder>>
}

export default function CustomerInfo({ selectedShippingInfo, userInfo, setUserInfo }: CustomerInfoProps) {
  const [isEditing, setIsEditing] = useState(false)

  // Nếu selectedShippingInfo thay đổi và không phải đang chỉnh sửa
  useEffect(() => {
    if (!isEditing && selectedShippingInfo?.phone) {
      setUserInfo((prev) => ({ ...prev, phone: selectedShippingInfo.phone }))
    }
  }, [selectedShippingInfo, isEditing])

  const handleSave = () => {
    setIsEditing(false)

    // dispatch({
    //   type: 'user/updateCustomerInfo',
    //   payload: {
    //     name: customerName,
    //     phone: customerPhone,
    //     note: customerNote
    //   }
    // })

    // console.log('Saved:', { customerName, customerPhone, customerNote })
  }

  return (
    <div className='mt-6 bg-gray-100 p-4 rounded-lg'>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-lg font-semibold text-gray-800'>Customer Information</h2>
        <button
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-white font-medium transition-all shadow-md ${
            isEditing ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isEditing ? <FaSave /> : <FaEdit />}
          {isEditing ? 'Save' : 'Edit'}
        </button>
      </div>

      {/* Full Name */}
      <div className='flex justify-between p-2 border rounded-lg bg-white'>
        <span className='font-semibold'>Full Name:</span>
        {isEditing ? (
          <input
            type='text'
            value={userInfo.name}
            onChange={(e) => setUserInfo((prev) => ({ ...prev, name: e.target.value }))}
            className='ml-2 border border-gray-300 rounded-md px-2 py-1 w-1/2'
          />
        ) : (
          <span className='text-gray-800'>{userInfo.name || 'N/A'}</span>
        )}
      </div>

      {/* Phone Number */}
      <div className='flex justify-between p-2 border rounded-lg bg-white mt-2'>
        <span className='font-semibold'>Phone:</span>
        {isEditing ? (
          <input
            type='text'
            value={userInfo.phone}
            onChange={(e) => setUserInfo((prev) => ({ ...prev, phone: e.target.value }))}
            className='ml-2 border border-gray-300 rounded-md px-2 py-1 w-1/2'
          />
        ) : (
          <span className='text-gray-800'>{userInfo.phone || 'N/A'}</span>
        )}
      </div>

      {/* Email (readonly) */}
      <div className='flex justify-between p-2 border rounded-lg bg-white mt-2'>
        <span className='font-semibold'>Email:</span>
        <span className='text-gray-700'>{userInfo.email || 'N/A'}</span>
      </div>

      {/* Note */}
      <div className='mt-2'>
        <label className='block font-semibold mb-1'>Note (optional):</label>
        {isEditing ? (
          <textarea
            value={userInfo.note || ''}
            onChange={(e) => setUserInfo((prev) => ({ ...prev, note: e.target.value }))}
            className='w-full p-2 border border-gray-300 rounded-md'
            placeholder='Any additional notes...'
          />
        ) : (
          <p className='bg-white p-2 rounded-md border text-gray-700 min-h-[60px]'>
            {userInfo.note || 'No notes added.'}
          </p>
        )}
      </div>
    </div>
  )
}
