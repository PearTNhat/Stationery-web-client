import React from 'react';

const TestimonialSection: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-800 animate-fade-in">Ý Kiến Khách Hàng</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { quote: 'Dịch vụ tuyệt vời, sản phẩm chất lượng cao!', name: 'Nguyễn Văn A', role: 'Hiệu trưởng' },
            { quote: 'Giao hàng nhanh, nhân viên nhiệt tình.', name: 'Trần Thị B', role: 'Quản lý' },
            { quote: 'Giá cả hợp lý, đáng để hợp tác lâu dài.', name: 'Lê Văn C', role: 'Doanh nghiệp' }
          ].map((item, index) => (
            <div 
              key={index}
              className="bg-gray-50 p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              <p className="text-gray-600 italic mb-6">"{item.quote}"</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                  {item.name[0]}
                </div>
                <div className="ml-4">
                  <p className="font-semibold text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;