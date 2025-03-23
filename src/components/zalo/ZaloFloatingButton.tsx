import React from 'react';

const ZaloFloatingButton: React.FC = () => {
  const zaloLink = 'https://zalo.me/YOUR_ZALO_ID';

  return (
    <div className="fixed bottom-5 right-5 z-50 group">
      <a
        href={zaloLink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-20 h-20 bg-[#00A2FF] rounded-full shadow-xl shadow-blue-500/50 transition-all duration-300 hover:scale-110 animate-pulse"
      >
        <img
          src="https://deliverbit.com/images/7982070.png"
          alt="Zalo"
          className="w-12 h-12"
        />
      </a>
      {/* Tooltip */}
      <span className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md">
        Contact Zalo now!
      </span>
    </div>
  );
};

export default ZaloFloatingButton;
