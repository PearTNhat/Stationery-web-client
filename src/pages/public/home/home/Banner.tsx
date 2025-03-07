import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Banner {
  id: number;
  image: string;
  title: string;
  content: string;
  buttonText: string;
  buttonLink: string;
}

interface BannerProps {
  banners: Banner[];
}

export default function BannerSlider({ banners }: BannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [banners.length]);

  return (
    <section className="relative w-full min-h-[600px] overflow-hidden">
      {banners.map((banner, index) => (
        <motion.div
          key={banner.id}
          className="absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000"
          style={{ backgroundImage: `url(${banner.image})`, opacity: currentIndex === index ? 1 : 0 }}
        >
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
            <h2 className="text-5xl font-bold text-white drop-shadow-lg">{banner.title}</h2>
            <p className="mt-4 text-xl text-white drop-shadow-lg">{banner.content}</p>
            <a
              href={banner.buttonLink}
              className="mt-6 inline-block px-6 py-3 rounded-lg font-semibold text-gray-800 bg-white hover:bg-gray-200 transition-colors shadow-lg"
            >
              {banner.buttonText}
            </a>
          </div>
        </motion.div>
      ))}
      
      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentIndex === index ? 'bg-white scale-125' : 'bg-gray-400'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </section>
  );
}
