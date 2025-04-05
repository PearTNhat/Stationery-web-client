// components/product/ProductInfo.tsx
import React, { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Button from '~/components/button/Button'
import NumberToStart from '~/components/numberToStar/NumberToStart'
import ColorSelector from '~/components/product_attributes/ColorSelector'
import QuantitySelector from '~/components/product_attributes/QuantitySelector'
import SizeSelector from '~/components/product_attributes/SizeSelector'
import { Color, Image, ProductColor, ProductDetail, Size } from '~/types/product'
import { calculatePercent, formatNumber } from '~/utils/helper'

type ProductInfoProps = {
  productColor?: ProductColor[]
  setImages: (images: Image[]) => void
  name?: string
  totalRating?: number
  onAddToCart: (id: number) => void
}

export const ProductInfo: React.FC<ProductInfoProps> = ({
  productColor,
  name,
  totalRating,
  setImages,
  onAddToCart
}) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const currentParams = useMemo(
    () => Object.fromEntries([...searchParams]) as { sizeId?: string; colorId?: string },
    [searchParams]
  )
  const [productDetail, setProductDetail] = useState<ProductDetail | null>(null)
  const [colors, setColors] = useState<Color[]>([])
  const [sizes, setSizes] = useState<Size[]>([])
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    setColors(productColor?.map((pc) => pc.color) ?? [])
  }, [productColor])
  useEffect(() => {
    for (const pc of productColor || []) {
      if (pc.color.colorId !== currentParams.colorId) continue
      for (const pd of pc.productDetails) {
        if (currentParams?.sizeId) {
          if (pd?.size?.sizeId === currentParams?.sizeId) {
            setProductDetail(pd)
            setSizes(pc.productDetails.map((pd) => pd.size))
            setImages(pc.images)
            break
          }
        } else {
          setProductDetail(pc.productDetails[0])
          if (pd?.size) {
            setSizes(pc.productDetails.map((pd) => pd.size))
            setSearchParams({ ...currentParams, sizeId: pc.productDetails[0]?.size?.sizeId })
          }
          setImages(pc.images)
          break
        }
      }
    }
  }, [currentParams, productColor])
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
                - {calculatePercent(productDetail?.originalPrice ?? 0, productDetail?.discountPrice ?? 0)}%
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
      {sizes.length > 0 && <SizeSelector sizes={sizes} currentParams={currentParams} />}

      <ColorSelector colors={colors} currentParams={currentParams} />
      <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />

      <div className='mt-4 flex gap-4'>
        <Button className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg w-1/2'>
          <Link to={`/products/payment/${productDetail?.productDetailId}`}>Buy Now</Link>
        </Button>
        <Button className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg w-1/2'>Add to Cart</Button>
      </div>
    </div>
  )
}

export default ProductInfo
