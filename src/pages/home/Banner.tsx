import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface Banner {
  id: number
  image: string
  title: string
  content: string
  buttonText: string
  buttonLink: string
}

interface BannerProps {
  banners: Banner[]
}

export default function BannerSlider({ banners }: BannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 7000);

    return () => clearInterval(intervalId)
  }, [banners.length])

  return (
    <section className='relative w-full min-h-[700px] overflow-hidden'>
      {banners.map((banner, index) => (
      <motion.div
        key={banner.id}
        className='absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000'
        style={{
          backgroundImage: `url(${banner.image})`,
          opacity: currentIndex === index ? 1 : 0,
          pointerEvents: currentIndex === index ? 'auto' : 'none',
        }}
      >
        <div className='absolute inset-0 bg-black opacity-50'></div>
        <div className='relative h-full flex flex-col items-center justify-center text-center px-6'>
          <h2 className='text-6xl font-bold text-white drop-shadow-2xl'>{banner.title}</h2>
          <p className='mt-6 text-xl text-white drop-shadow-2xl'>{banner.content}</p>
          <Link
            to={banner.buttonLink}
            className='mt-8 inline-block px-8 py-4 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-700 hover:to-blue-500 transition-colors shadow-2xl transform hover:scale-105'
          >
            {banner.buttonText}
          </Link>
        </div>
      </motion.div>
      ))}

      {/* Navigation Dots */}
      <div className='absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10'>
        {banners.map((_, index) => (
          <button
            key={index}
            className={`w-4 h-4 rounded-full transition-all duration-300 transform ${
              currentIndex === index ? 'bg-white scale-150' : 'bg-gray-400 scale-100'
            }`}
            onClick={() => setCurrentIndex(index)}
            style={{ position: 'relative', zIndex: 20 }}
          />
        ))}
      </div>
    </section>
  )
}
