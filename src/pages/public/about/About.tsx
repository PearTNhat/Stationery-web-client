import React from 'react';
import Banner from './Banner';
import Introduction from './Introduction';
import Partners from './Partners';
import Timeline from './Timeline';
import Certificates from './Certificates';

const About: React.FC = () => {
  const partnersData = [
    { id: 1, logoUrl: '/path/to/logo1.png', name: 'ĐH A' },
    { id: 2, logoUrl: '/path/to/logo2.png', name: 'ĐH B' },
    // Thêm các trường khác
  ];

  const timelineData = [
    { year: '2015', description: 'Thành lập cửa hàng đầu tiên' },
    { year: '2018', description: 'Mở rộng chi nhánh thứ 2' },
    // Thêm các mốc khác
  ];

  const certificatesData = [
    { id: 1, imageUrl: '/path/to/cert1.png', title: 'Chứng nhận chất lượng' },
    { id: 2, imageUrl: '/path/to/cert2.png', title: 'Chứng nhận uy tín' },
    // Thêm các chứng nhận khác
  ];

  return (
    <div>
      <Banner imageUrl="https://vanphongpham247.vn/wp-content/uploads/2022/03/van-phong-pham-247.jpg" altText="Banner về chúng tôi" />
      <Introduction
        imageUrl="/path/to/intro-image.jpg"
        title="Giới thiệu về shop"
        description="Chúng tôi là cửa hàng văn phòng phẩm uy tín, cung cấp sản phẩm chất lượng cao cho sinh viên và doanh nghiệp."
      />
      <Partners partners={partnersData} />
      <Timeline items={timelineData} />
      <Certificates certificates={certificatesData} />
    </div>
  );
};

export default About;