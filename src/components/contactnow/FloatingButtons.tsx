import React from 'react'

const FloatingButtons: React.FC = () => {
  const zaloLink = 'https://zalo.me/0969895549'
  const phoneNumber = 'tel:0969895549'

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
    </div>
  )
}

export default FloatingButtons
