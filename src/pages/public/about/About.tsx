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
        imageUrl="/public/images/logo_stationery.svg"
        title="Giới thiệu về shop"
        description="Chúng tôi là cửa hàng văn phòng phẩm uy tín, tự hào mang đến những sản phẩm chất lượng cao, đa dạng và đáng tin cậy, đáp ứng mọi nhu cầu của sinh viên, giáo viên, nhân viên văn phòng và doanh nghiệp. Với danh mục sản phẩm phong phú bao gồm bút viết, sổ tay, giấy in, dụng cụ học tập, thiết bị văn phòng và nhiều phụ kiện khác, chúng tôi cam kết cung cấp hàng hóa chính hãng từ các thương hiệu nổi tiếng, đảm bảo độ bền và tính ứng dụng cao. Đội ngũ nhân viên nhiệt tình, giàu kinh nghiệm luôn sẵn sàng tư vấn để khách hàng tìm được giải pháp tối ưu nhất. Bên cạnh đó, chúng tôi còn cung cấp dịch vụ giao hàng nhanh chóng, giá cả cạnh tranh và chính sách hậu mãi chu đáo, nhằm mang lại trải nghiệm mua sắm tiện lợi và hài lòng nhất cho bạn."
      />
      <Partners partners={partnersData} />
      <Timeline items={timelineData} />
      <Certificates certificates={certificatesData} />
    </div>
  );
};

export default About;