import { useState, useEffect } from 'react'
import { FaEdit, FaSave } from 'react-icons/fa'
import { useAppSelector, useAppDispatch } from '~/hooks/redux'

interface CustomerInfoProps {
  selectedShippingInfo: { addressName: string; phone: string } | null
}

export default function CustomerInfo({ selectedShippingInfo }: CustomerInfoProps) {
  const dispatch = useAppDispatch()
  const { userData } = useAppSelector((state) => state.user)
  const [isEditing, setIsEditing] = useState(false)

  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [customerNote, setCustomerNote] = useState('')

  // Cập nhật thông tin từ userData ban đầu
  useEffect(() => {
    if (!isEditing && userData) {
      const fullName = `${userData.firstName ?? ''} ${userData.lastName ?? ''}`.trim()
      setCustomerName(fullName)

      const defaultPhone = userData.addresses?.find((addr: any) => addr.isDefault)?.phone
      const fallbackPhone = userData.phone ?? ''
      setCustomerPhone(defaultPhone ?? fallbackPhone)
    }
  }, [userData, isEditing])

  // Nếu selectedShippingInfo thay đổi và không phải đang chỉnh sửa
  useEffect(() => {
    if (!isEditing && selectedShippingInfo?.phone) {
      setCustomerPhone(selectedShippingInfo.phone)
    }
  }, [selectedShippingInfo, isEditing])

  const handleSave = () => {
    setIsEditing(false)

    dispatch({
      type: 'user/updateCustomerInfo',
      payload: {
        name: customerName,
        phone: customerPhone,
        note: customerNote
      }
    })

    console.log('Saved:', { customerName, customerPhone, customerNote })
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
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className='ml-2 border border-gray-300 rounded-md px-2 py-1 w-1/2'
          />
        ) : (
          <span className='text-gray-800'>{customerName || 'N/A'}</span>
        )}
      </div>

      {/* Phone Number */}
      <div className='flex justify-between p-2 border rounded-lg bg-white mt-2'>
        <span className='font-semibold'>Phone:</span>
        {isEditing ? (
          <input
            type='text'
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
            className='ml-2 border border-gray-300 rounded-md px-2 py-1 w-1/2'
          />
        ) : (
          <span className='text-gray-800'>{customerPhone || 'N/A'}</span>
        )}
      </div>

      {/* Email (readonly) */}
      <div className='flex justify-between p-2 border rounded-lg bg-white mt-2'>
        <span className='font-semibold'>Email:</span>
        <span className='text-gray-700'>{userData?.email || 'N/A'}</span>
      </div>

      {/* Note */}
      <div className='mt-2'>
        <label className='block font-semibold mb-1'>Note (optional):</label>
        {isEditing ? (
          <textarea
            value={customerNote}
            onChange={(e) => setCustomerNote(e.target.value)}
            className='w-full p-2 border border-gray-300 rounded-md'
            placeholder='Any additional notes...'
          />
        ) : (
          <p className='bg-white p-2 rounded-md border text-gray-700 min-h-[60px]'>
            {customerNote || 'No notes added.'}
          </p>
        )}
      </div>
    </div>
  )
}
