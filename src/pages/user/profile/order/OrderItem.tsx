// src/components/OrderItem.tsx
import React from 'react'
import {
  FiPackage,
  FiCheckCircle,
  FiTruck,
  FiX,
  FiEye,
  FiMapPin,
  FiCalendar,
  FiShoppingBag,
  FiUser
} from 'react-icons/fi'
import { FaRegSmile, FaRegFrown } from 'react-icons/fa'

interface OrderItemProps {
  orderId: string
  status: 'Đang chuẩn bị hàng' | 'Đã xác nhận đơn hàng' | 'Đang Giao' | 'Đã hủy'
  date: string
  total?: number
  items?: number
  customer?: string
}

const OrderItem: React.FC<OrderItemProps> = ({ orderId, status, date, total, items, customer }) => {
  const statusStyles: Record<
    string,
    {
      bg: string
      text: string
      icon: React.ReactNode
      border: string
      gradient: string
    }
  > = {
    'Đang chuẩn bị hàng': {
      bg: 'bg-amber-100',
      text: 'text-amber-800',
      icon: <FiPackage className='mr-1' />,
      border: 'border-amber-200',
      gradient: 'from-amber-400 to-amber-500'
    },
    'Đã xác nhận đơn hàng': {
      bg: 'bg-blue-100',
      text: 'text-blue-800',
      icon: <FiCheckCircle className='mr-1' />,
      border: 'border-blue-200',
      gradient: 'from-blue-400 to-blue-500'
    },
    'Đang Giao': {
      bg: 'bg-green-100',
      text: 'text-green-800',
      icon: <FiTruck className='mr-1' />,
      border: 'border-green-200',
      gradient: 'from-green-400 to-green-500'
    },
    'Đã hủy': {
      bg: 'bg-red-100',
      text: 'text-red-800',
      icon: <FiX className='mr-1' />,
      border: 'border-red-200',
      gradient: 'from-red-400 to-red-500'
    }
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }
    return new Date(dateString).toLocaleDateString('vi-VN', options)
  }

  return (
    <div
      className={`group flex flex-col p-5 border-2 ${statusStyles[status].border} rounded-xl bg-white hover:shadow-lg transition-all`}
    >
      <div className='flex justify-between items-start mb-3'>
        <div>
          <div className='flex items-center'>
            <span
              className={`bg-gradient-to-r ${statusStyles[status].gradient} text-white p-2 rounded-lg mr-3 shadow-sm`}
            >
              {status === 'Đã hủy' ? <FaRegFrown size={18} /> : <FaRegSmile size={18} />}
            </span>
            <div>
              <h3 className='font-bold text-gray-800 text-lg'>Đơn hàng #{orderId}</h3>
              {customer && (
                <div className='flex items-center text-sm text-gray-600 mt-1'>
                  <FiUser className='mr-1' />
                  {customer}
                </div>
              )}
            </div>
          </div>
          <div className='flex items-center text-sm text-gray-500 mt-2 ml-1'>
            <FiCalendar className='mr-1' />
            {formatDate(date)}
          </div>
        </div>
        <span
          className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusStyles[status].bg} ${statusStyles[status].text}`}
        >
          {statusStyles[status].icon}
          {status}
        </span>
      </div>

      <div className='flex justify-between items-center pt-3 border-t border-gray-100 mt-2'>
        <div className='flex items-center text-sm text-gray-600'>
          <FiShoppingBag className='mr-1' />
          {items ? `${items} sản phẩm` : 'Đang cập nhật'}
        </div>
        <div className='font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500'>
          {total ? `${total.toLocaleString('vi-VN')}₫` : '--'}
        </div>
      </div>

      <div className='mt-5 flex space-x-3'>
        <button className='flex items-center text-sm py-2 px-4 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-colors'>
          <FiEye className='mr-2' />
          Xem chi tiết
        </button>
        <button
          className={`flex items-center text-sm py-2 px-4 rounded-lg text-white font-medium bg-gradient-to-r ${statusStyles[status].gradient} shadow-md hover:shadow-lg transition-all`}
        >
          <FiMapPin className='mr-2' />
          {status === 'Đã hủy' ? 'Xem lý do' : 'Theo dõi đơn'}
        </button>
      </div>
    </div>
  )
}

export default OrderItem
