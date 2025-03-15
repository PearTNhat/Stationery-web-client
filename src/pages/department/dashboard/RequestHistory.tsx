import React from 'react';
import { GoInfo } from "react-icons/go";

interface Request {
  id: number;
  date: string;
  items: string;
  status: 'Đã gửi' | 'Đang xử lý' | 'Hoàn tất';
}

const RequestHistory: React.FC = () => {
  const requests: Request[] = [
    { id: 1, date: '10/03/2025', items: 'Bút bi, Giấy A4', status: 'Hoàn tất' },
    { id: 2, date: '09/03/2025', items: 'Băng keo, Sổ tay', status: 'Đang xử lý' },
    { id: 3, date: '08/03/2025', items: 'Kẹp giấy', status: 'Đã gửi' },
  ];

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Hoàn tất': return 'text-green-600 bg-green-100 px-2 py-1 rounded-lg';
      case 'Đang xử lý': return 'text-yellow-600 bg-yellow-100 px-2 py-1 rounded-lg';
      case 'Đã gửi': return 'text-blue-600 bg-blue-100 px-2 py-1 rounded-lg';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Lịch sử yêu cầu</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200 shadow-md rounded-lg">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-4 border border-gray-200">Mã yêu cầu</th>
              <th className="p-4 border border-gray-200">Ngày gửi</th>
              <th className="p-4 border border-gray-200">Sản phẩm</th>
              <th className="p-4 border border-gray-200">Chi tiết</th>
              <th className="p-4 border border-gray-200">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request.id} className="hover:bg-gray-50">
                <td className="p-4 border border-gray-200 text-center">{request.id}</td>
                <td className="p-4 border border-gray-200 text-center">{request.date}</td>
                <td className="p-4 border border-gray-200">{request.items}</td>
                <td className="p-4 border border-gray-200 text-center">
                  <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 hover:bg-blue-200 transition duration-200">
                    <GoInfo className="w-5 h-5 text-blue-600" />
                  </div>
                </td>
                <td className={`p-4 border border-gray-200 text-center font-semibold ${getStatusClass(request.status)}`}>
                  {request.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestHistory;