// pages/ProductDetail.tsx
import React, { useEffect, useState } from 'react'
import { sampleProduct, sampleSimilarProducts } from '~/constance/seed/product'
import { ProductImages } from './ProductImages'
import { ProductInfo } from './ProductInfo'
import { ProductTabs } from './ProductTabs'
import { SimilarProducts } from './SimilarProducts'

export default function ProductDetail() {
  const [product] = useState(sampleProduct)
  const [similarProducts] = useState(sampleSimilarProducts)

  const handleAddToCart = (id: number) => {
    console.log(`Thêm sản phẩm ${id} vào giỏ hàng`)
  }

  const handleViewDetails = (id: number) => {
    console.log(`Xem chi tiết sản phẩm ${id}`)
  }
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 400)
  }, [])
  return (
    <div className='max-w-7xl mx-auto p-8 bg-white rounded-lg shadow-lg mt-16'>
      <div className='flex flex-col md:flex-row gap-6'>
        <ProductImages product={product} />
        <ProductInfo product={product} onAddToCart={handleAddToCart} />
      </div>
      <ProductTabs product={product} />
      <SimilarProducts
        similarProducts={similarProducts}
        onAddToCart={handleAddToCart}
        onViewDetails={handleViewDetails}
      />
    </div>
  )
}
