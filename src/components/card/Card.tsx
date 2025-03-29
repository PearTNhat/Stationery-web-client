import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FaShoppingCart } from 'react-icons/fa'
import Button from '../button/Button'
import { Link } from 'react-router-dom'
import ColorSelector from '../product_attributes/ColorSelector'
import ProductModal from '../model/ProductModal'
import { Color, Product, ProductColor, ProductDetail } from '~/types/product'
import NumberToStart from '~/components/numberToStar/NumberToStart'

interface ProductCardProps {
  product: Product
  onAddToCart: (id: string) => void
  onViewDetails: (id: string) => void
}

const Card: React.FC<ProductCardProps> = ({ product, onAddToCart, onViewDetails }) => {
  const [selectedColor, setSelectedColor] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [productDetails, setProductDetails] = useState<ProductDetail | null>(null)
  const [productColor, setProductColor] = useState<ProductColor | null>(null)
  const [colors, setColors] = useState<Color[]>([])

  const handleColorSelect = (color: string) => {
    setSelectedColor(color)
    setIsModalOpen(true) // Mở modal khi chọn màu
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setSelectedColor('') // Reset màu khi đóng modal
  }
  useEffect(() => {
    let isFound: boolean = false
    console.log('product', product)
    for (const pc of product.productColors) {
      for (const pd of pc.productDetails) {
        if (pd.stockQuantity > 0) {
          isFound = true
          setProductDetails(pd)
          setProductColor(pc)
          setSelectedColor(pc.color.colorId)
        }
        break
      }
      if (isFound) break
    }
    setColors(product.productColors.map((color) => color.color))
  }, [product])
  return (
    <motion.div className='bg-white text-gray-900 rounded-2xl shadow-lg p-5 flex flex-col items-center space-y-4 transition-all duration-300 hover:shadow-2xl'>
      <Link to={`/products/${productDetails?.slug}`}>
        <motion.img
          src={productColor?.images[1]?.url}
          alt={product.name}
          className='w-52 h-52 object-cover rounded-xl shadow-md'
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
      </Link>
      <h3 className='text-lg font-bold text-center'>{product.name}</h3>
      <div className='flex items-center justify-between w-full px-4'>
        <span className='text-xl font-semibold text-blue-500'>${productDetails?.originalPrice}</span>
        <div className='flex items-center text-xs'>
          <NumberToStart number={product.totalRating} />
        </div>
      </div>

      <div className='flex justify-between w-full text-gray-500 text-sm px-4'>
        <span>Stock: {productDetails?.stockQuantity}</span>
        <span>Sold: {productDetails?.soldQuantity}</span>
      </div>

      <ColorSelector colors={colors} selectedColor={selectedColor} onColorSelect={handleColorSelect} />

      <div className='flex space-x-4 w-full mt-2'>
        <Link to={`/products/${productDetails?.slug}`} className='w-full'>
          <Button className='bg-blue-500 text-white px-4 py-2 w-full rounded-lg shadow-md transition hover:bg-blue-600'>
            View Details
          </Button>
        </Link>
        <button
          onClick={() => onAddToCart(product.productId)}
          className='bg-yellow-400 text-black p-3 rounded-lg shadow-md transition hover:bg-yellow-500'
        >
          <FaShoppingCart size={20} />
        </button>
      </div>

      {isModalOpen && (
        <ProductModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          productName={product.name}
          productPrice={productDetails?.originalPrice}
          productDescription={product.description}
          selectedColor={selectedColor}
          productImage={productColor?.images[0]?.url}
          colors={colors}
          productId={product.productId}
        />
      )}
    </motion.div>
  )
}

export default Card
