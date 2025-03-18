import React from 'react';

const ContactSection: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-r from-indigo-700 to-blue-600 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]"></div>
      </div>
      <div className="container mx-auto px-4 text-center relative z-10">
        <h2 className="text-4xl font-bold mb-8 animate-fade-in-down">Hãy Liên Hệ Ngay Hôm Nay!</h2>
        <p className="text-xl mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up">
          Chúng tôi sẵn sàng hỗ trợ bạn với mọi giải pháp văn phòng phẩm chuyên nghiệp.
        </p>
        <button className="bg-white text-indigo-700 px-10 py-4 rounded-full font-semibold shadow-lg hover:bg-indigo-100 transform hover:scale-105 transition-all duration-300">
          Gửi Yêu Cầu Ngay
        </button>
      </div>
    </section>
  );
};

export default ContactSection;