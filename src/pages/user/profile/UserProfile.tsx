// src/pages/UserProfile.tsx
import React, { useState } from 'react';
import ProfileHeader from './ProfileHeader';
import PasswordChange from './PasswordChange';
import OrderTabs from './OrderTab';
import Sidebar from './Sidebar';

interface User {
  avatar?: string;
  username: string;
  fullName: string;
  email: string;
  birthDate: string;
  gender: string;
  phone: string;
  address: string;
}

interface Order {
  id: string;
  status: 'Đang chuẩn bị hàng' | 'Đã xác nhận đơn hàng' | 'Đang Giao' | 'Đã hủy';
  date: string;
}

const UserProfile: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('profile');
  const [user, setUser] = useState<User>({
    avatar: 'https://khoinguonsangtao.vn/wp-content/uploads/2022/02/anh-dai-dien-fb-dep.jpg',
    username: 'johndoe',
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    birthDate: '1990-01-01',
    gender: 'Nam',
    phone: '+84123456789',
    address: '123 Main Street, Hanoi',
  });

  const orders: Order[] = [
    { id: '001', status: 'Đang chuẩn bị hàng', date: '2025-03-06' },
    { id: '002', status: 'Đã xác nhận đơn hàng', date: '2025-03-05' },
    { id: '003', status: 'Đang Giao', date: '2025-03-04' },
    { id: '004', status: 'Đã hủy', date: '2025-03-03' },
  ];

  const handleLogout = (): void => {
    console.log('Đã đăng xuất');
    // Thêm logic đăng xuất thực tế (ví dụ: xóa token, redirect)
  };

  const handleSaveProfile = (updatedData: User) => {
    setUser(updatedData);
    console.log('Profile updated:', updatedData);
    // Thêm logic gọi API để lưu thông tin nếu cần
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return <ProfileHeader initialData={user} onSave={handleSaveProfile} />;
      case 'password':
        return <PasswordChange />;
      case 'orders':
        return <OrderTabs orders={orders} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onLogout={handleLogout}
      />
      <div className="flex-1 p-10">{renderContent()}</div>
    </div>
  );
};

export default UserProfile;