// components/product/ProductInfo.tsx
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NumberToStart from '~/components/numberToStar/NumberToStart'
import QuantitySelector from '~/components/product_attributes/QuantitySelector'
import { ColorSize, SizeSlug } from '~/types/color'
import { ProductDetail } from '~/types/product'
import { calculatePercent, formatNumber } from '~/utils/helper'

type ProductInfoProps = {
  colorSize: ColorSize[] | []
  productDetail?: ProductDetail
  name?: string
  totalRating?: number
  onAddToCart: (productId: string, quantity: number) => Promise<void>
  onBuyNow: (productId: string, colorId: string, sizeId: string, quantity: number) => void
  productId?: string
}

export const ProductInfo: React.FC<ProductInfoProps> = ({
  colorSize,
  name,
  productDetail,
  totalRating,
  onAddToCart,
  onBuyNow,
  productId
}) => {
  const naviagte = useNavigate()
  const [selectedColor, setSelectedColor] = useState<string>(productDetail?.color?.colorId ?? '')
  const [selectedSize, setSelectedSize] = useState<string>(productDetail?.color?.colorId ?? '')
  const [sizes, setSizes] = useState<SizeSlug[]>([])
  const [quantity, setQuantity] = useState(1)
  console.log(selectedColor, selectedSize, 'selectedColor')
  useEffect(() => {
    setSelectedColor(productDetail?.color?.colorId ?? '')
    setSelectedSize(productDetail?.size?.sizeId ?? '')
    colorSize?.forEach((item) => {
      if (item.colorId === productDetail?.color?.colorId) {
        setSizes(item.sizes)
      }
    })
  }, [productDetail])
  return (
    <div className='w-full md:w-1/2'>
      <h1 className='text-2xl font-bold text-blue-700'>{name}</h1>
      <div>
        {/* Giá đã giảm */}
        <p className='text-[19px] max-sm:text-xs font-semibold text-blue-500'>
          {formatNumber(productDetail?.discountPrice ?? 0)} ₫
        </p>
        <div className='flex items-center '>
          {/* Giá chưa giảm */}
          {productDetail?.originalPrice !== 0 && (
            <>
              <p className='line-through text-[#6b7280] text-sm '>{formatNumber(productDetail?.originalPrice ?? 0)}₫</p>
              {/* % */}
              <p className={`ml-1 text-red-400 text-sm font-bold`}>
                - {calculatePercent(productDetail?.originalPrice, productDetail?.discountPrice)}%
              </p>
            </>
          )}
        </div>
      </div>
      <div className='flex items-center text-sm'>
        <NumberToStart number={totalRating ?? 0} />
      </div>
      <p className='mt-2'>
        Status:
        <span
          className={`mt-2 font-semibold ${(productDetail?.stockQuantity ?? 0 > 0) ? 'text-blue-600' : 'text-red-600'}`}
        >
          {(productDetail?.stockQuantity ?? 0 > 0) ? ' In Stock' : ' Out of Stock'}
        </span>
      </p>
      {/* size */}
      <div className='mt-4'>
        <label className='block text-gray-700 font-semibold'>Choose size:</label>
        <div className='flex gap-2 mt-2'>
          {sizes.map((size) =>
            size.size ? (
              <button
                key={size.size}
                onClick={() => {
                  naviagte(`/products/${size.slug}`)
                }}
                className={`px-3 py-1 border rounded-lg text-sm ${selectedSize === size.size ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                {size.size}
              </button>
            ) : null
          )}
        </div>
      </div>
      {/* color */}
      <div className='flex text-gray-500 text-sm gap-2 mt-2'>
        {colorSize?.map((item) => (
          <div key={item.colorId} className='flex gap-3 mt-2'>
            <button
              onClick={() => {
                naviagte(`/products/${item.sizes[0].slug}`)
              }}
              className={`w-5 h-5 rounded-full border-2 transition-all ${
                selectedColor === item.colorId
                  ? 'border-black scale-110 ring-1 ring-offset-1 ring-black'
                  : 'border-transparent'
              }`}
              style={{ backgroundColor: item.hex }}
            ></button>
          </div>
        ))}
      </div>

      <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />

      <div className='mt-4 flex gap-4'>
        <button
          className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg w-1/2'
          // onClick={() => onBuyNow(productId ?? '', colorId, sizeId, quantity)}
        >
          Buy Now
        </button>
        {/* <Button
          className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg w-1/2'
          onClick={() => {
            console.log('Dữ liệu gửi đi:', {
              productId: productDetail?.productDetailId,
              colorId: currentParams.colorId,
              sizeId: currentParams.sizeId,
              quantity
            })
            if (productDetail) {
              onAddToCart(productDetail.productDetailId, quantity)
            }
          }}
        >
          Add to Cart
        </Button> */}
      </div>
    </div>
  )
}

export default ProductInfo
