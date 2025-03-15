import React from 'react';

interface Service {
  title: string;
  description: string;
  icon: string;
  image: string;
}

const ServiceList: React.FC = () => {
  const services: Service[] = [
    {
      title: 'Cung cấp vật phẩm cho trường học',
      description: 'Sách, vở, bút và dụng cụ học tập chất lượng cao cho các cơ sở giáo dục.',
      icon: '🎓',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b'
    },
    {
      title: 'Văn phòng phẩm doanh nghiệp',
      description: 'Giải pháp toàn diện cho văn phòng với giao hàng tận nơi nhanh chóng.',
      icon: '🏢',
      image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d'
    },
    {
      title: 'Thiết kế & in ấn theo yêu cầu',
      description: 'Danh thiếp, catalogue, biểu mẫu với thiết kế sáng tạo, chất lượng cao.',
      icon: '🎨',
      image: 'https://images.unsplash.com/photo-1545239351-ef4e1e9a07b1'
    },
    {
      title: 'Dịch vụ đóng gói quà tặng',
      description: 'Đóng gói quà tặng tinh tế, chuyên nghiệp cho mọi dịp đặc biệt.',
      icon: '🎁',
      image: 'https://images.unsplash.com/photo-1510087142098-4f1a321b0c5b'
    }
  ];

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-800 animate-fade-in">Dịch Vụ Đẳng Cấp</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {services.map((service, index) => (
            <div 
              key={index}
              className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden"
            >
              <div className="relative h-48">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                  <span className="text-5xl text-white">{service.icon}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceList;