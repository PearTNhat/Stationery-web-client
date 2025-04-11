// pages/ProductDetail.tsx
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { ProductImages } from './ProductImages'
import { ProductInfo } from './ProductInfo'
import { ProductTabs } from './ProductTabs'
import { SimilarProducts } from './SimilarProducts'
import { apiGetAllProducts, apiGetDetailProduct } from '~/api/product'
import { apiAddItemToCart } from '~/api/cart'
import { useAppSelector } from '~/hooks/redux'
import { showToastError, showToastSuccess } from '~/utils/alert'
import { Image, ProductDeatilResponse } from '~/types/product'
import AxiosError from 'axios'

export default function ProductDetail() {
  const { slug } = useParams()
  const { accessToken } = useAppSelector((state) => state.user)
  const [product, setProduct] = useState<ProductDeatilResponse | null>(null)
  const [images, setImages] = useState<Image[]>([])
  const [fechAgain, setFetchAgain] = useState(false)
  const [similarProducts, setSimilarProducts] = useState<ProductDeatilResponse[]>([])
  const navigate = useNavigate()

  const handleAddToCart = async (productDetailId: string, colorId: string, sizeId: string, quantity: number) => {
    const result = await apiAddItemToCart({
      productId: productDetailId,
      colorId,
      sizeId,
      quantity,
      accessToken: accessToken || ''
    })
    if (typeof result === 'string') {
      showToastError(result)
    } else {
      showToastSuccess('Đã thêm vào giỏ hàng!')
    }
  }

  const handleBuyNow = (productId: string, colorId: string, sizeId: string, quantity: number) => {
    const selectedColor = product?.productColors.find((c) => c.color.colorId === colorId)
    const selectedProductDetail = selectedColor?.productDetails.find((d) => d.size.sizeId === sizeId)
    const selectedImage = selectedColor?.images?.[0]?.url || ''
    const price = selectedProductDetail?.discountPrice || 0

    const order = {
      orderId: 'ORDER' + Date.now(),
      items: [
        {
          id: Date.now(),
          name: product?.name || '',
          price,
          quantity,
          image: selectedImage,
          color: selectedColor?.color.name || '',
          size: selectedProductDetail?.size.name || ''
        }
      ],
      totalAmount: price * quantity
    }
    console.log('order', order)
    navigate(`/products/payment-confirnation`, { state: { order } })
  }

  const handleViewDetails = (id: number) => {
    console.log(`Xem chi tiết sản phẩm ${id}`)
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
        sortBy: 'totalRating'
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
          productColor={product?.productColors}
          name={product?.name}
          totalRating={product?.totalRating}
          setImages={setImages}
          productId={product?.productId}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
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
        onAddToCart={handleAddToCart}
        onViewDetails={handleViewDetails}
      />
    </div>
  )
}
