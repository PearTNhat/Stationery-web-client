import React, { useState } from 'react'

const FloatingButtons: React.FC = () => {
  const zaloLink = 'https://zalo.me/0969895549'
  const phoneNumber = 'tel:0969895549'
  const chatbotUrl = 'http://127.0.0.1:5000/'
  const [isChatbotOpen, setIsChatbotOpen] = useState(false)

  return (
    <div className='fixed bottom-5 right-5 z-50 flex flex-col gap-3'>
      {/* Nút Gọi điện */}
      <a
        href={phoneNumber}
        className='flex items-center justify-center w-16 h-16 bg-[#00A2FF] rounded-full shadow-xl shadow-blue-500/50 transition-all duration-300 hover:scale-110 animate-pulse'
      >
        <img src='https://cdn-icons-png.flaticon.com/512/724/724664.png' alt='Call' className='w-10 h-10' />
      </a>

      {/* Nút Zalo */}
      <a
        href={zaloLink}
        target='_blank'
        rel='noopener noreferrer'
        className='flex items-center justify-center w-16 h-16 bg-[#00A2FF] rounded-full shadow-xl shadow-blue-500/50 transition-all duration-300 hover:scale-110 animate-pulse'
      >
        <img src='https://deliverbit.com/images/7982070.png' alt='Zalo' className='w-10 h-10' />
      </a>

      {/* Nút Chatbot */}
      <button
        onClick={() => setIsChatbotOpen(!isChatbotOpen)}
        className='flex items-center justify-center w-16 h-16 bg-[#FF9800] rounded-full shadow-xl shadow-orange-500/50 transition-all duration-300 hover:scale-110'
      >
        <img src='https://cdn-icons-png.flaticon.com/512/2950/2950706.png' alt='Chatbot' className='w-10 h-10' />
      </button>

      {/* Giao diện chatbot */}
      <div
        className={`fixed bottom-20 right-5 w-96 h-[500px] bg-white border border-gray-300 shadow-xl rounded-xl overflow-hidden transition-opacity duration-300 ${isChatbotOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <div className='flex justify-between items-center bg-[#FF9800] text-white p-3'>
          <span>Chatbot</span>
          <button onClick={() => setIsChatbotOpen(false)} className='text-white font-bold'>
            ✖
          </button>
        </div>
        <iframe
          src={chatbotUrl}
          className='w-full h-full border-none'
          title='Chatbot'
          style={{ display: isChatbotOpen ? 'block' : 'none' }}
        />
      </div>
    </div>
  )
}

export default FloatingButtons
