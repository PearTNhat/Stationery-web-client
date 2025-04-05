// pages/ProductDetail.tsx
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { ProductImages } from './ProductImages'
import { ProductInfo } from './ProductInfo'
import { ProductTabs } from './ProductTabs'
import { SimilarProducts } from './SimilarProducts'
import { apiGetDetailProduct } from '~/api/product'
import AxiosError from 'axios'
import { Image, ProductDeatilResponse } from '~/types/product'
import { showToastError } from '~/utils/alert'

export default function ProductDetail() {
  const { slug } = useParams()
  const [product, setProduct] = useState<ProductDeatilResponse | null>(null)
  const [images, setImages] = useState<Image[]>([])

  const handleAddToCart = (id: number) => {
    console.log(`Thêm sản phẩm ${id} vào giỏ hàng`)
  }
  const getProductDetail = async () => {
    try {
      const response = await apiGetDetailProduct(slug)
      console.log(response)
      if (response.code == 200) {
        setProduct(response.result)
      } else {
        showToastError(response.message || response.error)
      }
    } catch (error) {
      if (error instanceof Error || error instanceof AxiosError) {
        // showToastError(error.message)
      }
    }
  }
  const handleViewDetails = (id: number) => {
    console.log(`Xem chi tiết sản phẩm ${id}`)
  }
  useEffect(() => {
    getProductDetail()
  }, [slug])
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 400)
  }, [])
  console.log(images)
  return (
    <div className='max-w-7xl mx-auto p-8 bg-white rounded-lg shadow-lg mt-16'>
      <div className='flex flex-col md:flex-row gap-6'>
        <ProductImages images={images} />
        <ProductInfo
          setImages={setImages}
          productColor={product?.productColors}
          name={product?.name}
          totalRating={product?.totalRating}
          onAddToCart={handleAddToCart}
        />
      </div>
      <ProductTabs desc={product?.description} reviews={product?.reviews} />
      {/* <SimilarProducts
        similarProducts={similarProducts}
        onAddToCart={handleAddToCart}
        onViewDetails={handleViewDetails}
      /> */}
    </div>
  )
}
