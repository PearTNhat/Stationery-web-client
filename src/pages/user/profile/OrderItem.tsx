// src/components/OrderItem.tsx
import React from 'react';

interface OrderItemProps {
  orderId: string;
  status: 'Đang chuẩn bị hàng' | 'Đã xác nhận đơn hàng' | 'Đang Giao' | 'Đã hủy';
  date: string;
}

const OrderItem: React.FC<OrderItemProps> = ({ orderId, status, date }) => {
  const statusStyles: Record<string, string> = {
    'Đang chuẩn bị hàng': 'bg-yellow-100 text-yellow-800',
    'Đã xác nhận đơn hàng': 'bg-blue-100 text-blue-800',
    'Đang Giao': 'bg-green-100 text-green-800',
    'Đã hủy': 'bg-red-100 text-red-800',
  };

  return (
    <div className="flex justify-between items-center p-4 border-b">
      <div>
        <p className="font-medium">Đơn hàng #{orderId}</p>
        <p className="text-sm text-gray-600">{date}</p>
      </div>
      <span className={`px-3 py-1 rounded-full text-sm ${statusStyles[status]}`}>
        {status}
      </span>
    </div>
  );
};

export default OrderItem;