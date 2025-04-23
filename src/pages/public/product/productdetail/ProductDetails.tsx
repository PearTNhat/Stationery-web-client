// pages/ProductDetail.tsx
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ProductImages } from './ProductImages'
import { ProductInfo } from './ProductInfo'
import { ProductTabs } from './ProductTabs'
import { SimilarProducts } from './SimilarProducts'
import { apiFetchColorSizeProductDetail, apiGetAllProductsWithDefaultPD, apiGetDetailProduct } from '~/api/product'
import { useAppSelector } from '~/hooks/redux'
import { showToastError } from '~/utils/alert'
import { Image, Product, ProductDeatilResponse } from '~/types/product'
import AxiosError from 'axios'
import { apiGetReviewOfProduct } from '~/api/review'
import { Review } from '~/types/comment'
import { ColorSize } from '~/types/color'

export default function ProductDetail() {
  const { slug } = useParams()
  const { accessToken } = useAppSelector((state) => state.user)
  const [product, setProduct] = useState<Product | null>(null)
  const [images, setImages] = useState<Image[]>([])
  const [fechAgain, setFetchAgain] = useState(false)
  const [similarProducts, setSimilarProducts] = useState<ProductDeatilResponse[]>([])
  const [reviews, setReviews] = useState<Review[]>([])
  const [colorSize, setColorSize] = useState<ColorSize[]>([])
  const navigate = useNavigate()

  const handleBuyNow = (productId: string, colorId: string, sizeId: string, quantity: number) => {
    const selectedColor = 'red' //product?.productColors.find((c) => c.color.colorId === colorId)
    const selectedProductDetail = 'red' //selectedColor?.productDetails.find((d) => d.size.sizeId === sizeId)
    const selectedImage = 'red' //selectedColor?.images?.[0]?.url || ''
    const price = 0 //selectedProductDetail?.discountPrice || 0

    const order = {
      orderId: 'ORDER' + Date.now(),
      items: [
        {
          id: Date.now(),
          name: product?.name || '',
          price,
          quantity,
          image: selectedImage
          // color: selectedColor?.color.name || '',
          // size: selectedProductDetail?.size.name || ''
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

  const handleAddToCart = async (
    productId: string,
    colorId: string,
    sizeId: string,
    quantity: number
  ): Promise<void> => {
    console.log(`Added product ${productId} with color ${colorId}, size ${sizeId}, and quantity ${quantity} to cart`)
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
      const response = await apiGetAllProductsWithDefaultPD({
        page: '0',
        limit: '10',
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
  const fetchColorSize = async () => {
    try {
      const response = await apiFetchColorSizeProductDetail(slug)
      if (response.code == 200) {
        setColorSize(response.result)
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
  const getReviewOfProduct = async () => {
    try {
      const response = await apiGetReviewOfProduct({ slug })
      if (response.code == 200) {
        setReviews(response.result)
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
    getReviewOfProduct()
  }, [fechAgain])

  useEffect(() => {
    fetchColorSize()
  }, [])

  useEffect(() => {
    getProductDetail()
    getSimilarProduct()
    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 400)
  }, [slug])
  return (
    <div className='max-w-7xl mx-auto p-8 bg-white rounded-lg shadow-lg mt-16'>
      <div className='flex flex-col md:flex-row gap-6'>
        <ProductImages images={product?.productDetail?.images || []} />
        <ProductInfo
          colorSize={colorSize}
          productDetail={product?.productDetail}
          name={product?.name}
          totalRating={product?.totalRating}
          productDetailId={product?.productDetail?.productDetailId}
          accessToken={accessToken || ''}
          onBuyNow={handleBuyNow}
        />
      </div>
      <ProductTabs
        pId={product?.productId}
        totalRating={product?.totalRating}
        desc={product?.description}
        reviews={reviews}
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
