import React, { useState } from 'react';
import { FaHome, FaClipboardList, FaBox, FaBell, FaChartBar, FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { departmentPath } from '~/constance/paths';

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`fixed top-0 left-0 h-screen bg-gray-800 text-white transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-16'
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {isOpen && <div className="text-2xl font-bold text-blue-400 cursor-pointer">Stationery's X</div>}
        <button onClick={toggleSidebar} className="focus:outline-none">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>
      </div>

      <nav className="mt-4">
        <ul className="space-y-2">
          <li>
            <Link to={departmentPath.DASHBOARD} className="flex items-center p-4 hover:bg-gray-700 transition-colors">
              <FaHome className="w-6 h-6" />
              {isOpen && <span className="ml-3">Dashboard</span>}
            </Link>
          </li>
          <li>
            <Link to={departmentPath.PRODUCT} className="flex items-center p-4 hover:bg-gray-700 transition-colors">
              <FaBox className="w-6 h-6" />
              {isOpen && <span className="ml-3">Danh mục sản phẩm</span>}
            </Link>
          </li>
          <li>
            <Link to={departmentPath.DASHBOARD} className="flex items-center p-4 hover:bg-gray-700 transition-colors">
              <FaClipboardList className="w-6 h-6" />
              {isOpen && <span className="ml-3">Quản lý yêu cầu</span>}
            </Link>
          </li>
          <li>
            <Link to={departmentPath.DASHBOARD} className="flex items-center p-4 hover:bg-gray-700 transition-colors">
              <FaBell className="w-6 h-6" />
              {isOpen && <span className="ml-3">Thông báo</span>}
            </Link>
          </li>
          <li>
            <Link to={departmentPath.DASHBOARD} className="flex items-center p-4 hover:bg-gray-700 transition-colors">
              <FaChartBar className="w-6 h-6" />
              {isOpen && <span className="ml-3">Báo cáo</span>}
            </Link>
          </li>
        </ul>
      </nav>

      <div className="absolute bottom-0 w-full">
        <Link to={departmentPath.DASHBOARD} className="flex items-center p-4 hover:bg-gray-700 transition-colors border-t border-gray-700">
          <FaSignOutAlt className="w-6 h-6" />
          {isOpen && <span className="ml-3">Đăng xuất</span>}
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;