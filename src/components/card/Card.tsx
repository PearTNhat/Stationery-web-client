import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FaShoppingCart } from 'react-icons/fa'
import Button from '../button/Button'
import { Link } from 'react-router-dom'

import { FetchColor, Product, ProductDetail } from '~/types/product'
import NumberToStart from '~/components/numberToStar/NumberToStart'
import { calculatePercent, formatNumber } from '~/utils/helper'
import { DefaultProduct } from '~/assets/images'
import ColorSelector from '../product_attributes/ColorSelector'

interface ProductCardProps {
  product: Product
  onViewDetails: (id: string) => void
  onAddToCart: (productId?: string, quantity?: number) => void
}

const Card: React.FC<ProductCardProps> = ({ product, onViewDetails, onAddToCart }) => {
  const [selectedColor, setSelectedColor] = useState<string>(product.productDetail.color?.colorId ?? '')
  const [productDetail, setProductDetail] = useState<ProductDetail | null>(null)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [colors, setColors] = useState<FetchColor[]>([])
  const handleColorSelect = (color: string) => {
    setSelectedColor(color)
    setIsModalOpen(true) // Mở modal khi chọn màu
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setSelectedColor('') // Reset màu khi đóng modal
  }
  useEffect(() => {
    setColors(product.fetchColor)
    setProductDetail(product.productDetail)
    // setMinPrice(minPrice)
    setSelectedColor(product.productDetail.color?.colorId ?? '')
    setColors(product.fetchColor)
  }, [product])
  return (
    <motion.div className='bg-white text-gray-900 rounded-2xl shadow-lg p-5 flex flex-col items-center space-y-4 transition-all duration-300 hover:shadow-2xl'>
      <Link to={`/products/${productDetail?.slug}`} className='w-full flex justify-center'>
        <motion.img
          src={product?.img ? product.img : DefaultProduct}
          alt={product?.name}
          className='w-52 h-52 object-cover rounded-xl shadow-md'
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
      </Link>
      <h3 className='text-lg font-bold text-center'>{product?.name}</h3>
      <div className='flex items-center justify-between w-full px-4'>
        <div>
          {/* Giá đã giảm */}
          <p className='text-[19px] max-sm:text-xs font-semibold text-blue-500'>
            {formatNumber(productDetail?.discountPrice ?? 0)} ₫
          </p>
          <div className='flex items-center '>
            {/* Giá chưa giảm */}
            {productDetail?.originalPrice !== 0 && (
              <>
                <p className='line-through text-[#6b7280] text-sm '>
                  {formatNumber(productDetail?.originalPrice ?? 0)}₫
                </p>
                {/* % */}
                <p className={`ml-1 text-red-400 text-sm font-bold`}>
                  - {calculatePercent(productDetail?.originalPrice ?? 0, productDetail?.discountPrice ?? 0)}%
                </p>
              </>
            )}
          </div>
        </div>
        <div className='flex items-center text-sm'>
          <NumberToStart number={product.totalRating} />
        </div>
      </div>

      <div className='flex justify-between w-full text-gray-500 text-sm px-4'>
        <span>Stock: {product.quantity}</span>
        <span>Sold: {product.soldQuantity}</span>
      </div>

      <ColorSelector colors={colors} selectedColor={selectedColor} />

      <div className='flex space-x-4 w-full mt-2'>
        <Link to={`/products/${productDetail?.slug}`} className='w-full'>
          <Button className='bg-blue-500 text-white px-4 py-2 w-full rounded-lg shadow-md transition hover:bg-blue-600'>
            View Details
          </Button>
        </Link>
        <button
          className='bg-yellow-400 text-black p-3 rounded-lg shadow-md transition hover:bg-yellow-500'
          onClick={() => {
            if (selectedColor && productDetails?.size?.sizeId) {
              onAddToCart(product.productId, selectedColor, productDetails.size.sizeId, 1)
            }
          }}
        >
          <FaShoppingCart size={20} />
        </button>
      </div>

      {/* {isModalOpen && (
        <ProductModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          productName={product.name}
          productPrice={product?.originalPrice}
          productDescription={product.description}
          selectedColor={selectedColor ?? undefined}
          productImage={productColor?.images[0]?.url}
          colors={colors}
          productId={product.productId}
        />
      )} */}
    </motion.div>
  )
}

export default Card
