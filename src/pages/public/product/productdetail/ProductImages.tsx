import React, { useState, useEffect } from 'react'
import { Image } from '~/types/product'

type ProductImagesProps = {
  images: Image[]
}

export const ProductImages: React.FC<ProductImagesProps> = ({ images }) => {
  const [currentImage, setCurrentImage] = useState<Image | null>(null)

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentImage((prev) => images[(prev ? images.indexOf(prev) + 1 : 0) % images.length])
  //   }, 3000)
  //   return () => clearInterval(interval)
  // }, [images])

  return (
    <div className='w-full md:w-1/2'>
      <img src={images[0]?.url} alt={'product'} className='block w-full h-96 object-contain rounded-lg' />
    </div>
  )
}
