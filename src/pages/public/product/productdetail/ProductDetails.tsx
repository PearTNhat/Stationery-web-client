// pages/ProductDetail.tsx
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { ProductImages } from './ProductImages'
import { ProductInfo } from './ProductInfo'
import { ProductTabs } from './ProductTabs'
import { SimilarProducts } from './SimilarProducts'
import { apiGetAllProducts, apiGetDetailProduct } from '~/api/product'
import AxiosError from 'axios'
import { Image, ProductDeatilResponse } from '~/types/product'
import { showToastError } from '~/utils/alert'

export default function ProductDetail() {
  const { slug } = useParams()
  const [product, setProduct] = useState<ProductDeatilResponse | null>(null)
  const [images, setImages] = useState<Image[]>([])
  const [fechAgain, setFetchAgain] = useState(false)
  const [similarProducts, setSimilarProducts] = useState<ProductDeatilResponse[]>([])

  const handleAddToCart = (id: number) => {
    console.log(`Thêm sản phẩm ${id} vào giỏ hàng`)
  }
  const getProductDetail = async () => {
    try {
      const response = await apiGetDetailProduct(slug)
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
  const getSimilarProduct = async () => {
    try {
      const response = await apiGetAllProducts({
        page: 0,
        limit: 10,
        sortBy: 'totalRating',
        ascending: false
      })
      if (response.code == 200) {
        setSimilarProducts(response.result.content)
      } else {
        showToastError(response.message || response.error)
      }
    } catch (error) {
      if (error instanceof Error) {
        showToastError(error.message)
      } else {
        showToastError(error as string)
      }
    }
  }
  useEffect(() => {
    getProductDetail()
  }, [slug, fechAgain])
  useEffect(() => {
    getSimilarProduct()
    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 400)
  }, [slug])
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
      <ProductTabs
        pId={product?.productId}
        totalRating={product?.totalRating}
        desc={product?.description}
        reviews={product?.reviews}
        setFetchAgain={setFetchAgain}
      />
      <SimilarProducts
        similarProducts={similarProducts}
        // onAddToCart={handleAddToCart}
        // onViewDetails={handleViewDetails}
      />
    </div>
  )
}
