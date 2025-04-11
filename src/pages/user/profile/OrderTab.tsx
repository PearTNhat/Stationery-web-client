// src/components/OrderTabs.tsx
import React, { useState } from 'react';
import OrderItem from './OrderItem';

interface Order {
  id: string
  status: 'Đang chuẩn bị hàng' | 'Đã xác nhận đơn hàng' | 'Đang Giao' | 'Đã hủy'
  date: string
}

interface OrderTabsProps {
  orders: Order[]
}

const OrderTabs: React.FC<OrderTabsProps> = ({ orders }) => {
  const [activeTab, setActiveTab] = useState('Đang chuẩn bị hàng');

  const tabs = ['Đang chuẩn bị hàng', 'Đã xác nhận đơn hàng', 'Đang Giao', 'Đã hủy']

  const filteredOrders = orders.filter((order) => order.status === activeTab);

  return (
    <div className='bg-white p-6 rounded-lg shadow-md'>
      <h2 className='text-2xl font-bold mb-4'>Quản lý đơn hàng</h2>
      <div className='flex space-x-4 mb-6 border-b'>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 px-4 ${
              activeTab === tab ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600 hover:text-blue-500'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className='space-y-2'>
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <OrderItem key={order.id} orderId={order.id} status={order.status} date={order.date} />
          ))
        ) : (
          <p className='text-gray-500'>Không có đơn hàng nào trong trạng thái này.</p>
        )}
      </div>
    </div>
  )
}

export default OrderTabs