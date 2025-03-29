// components/product/ProductInfo.tsx
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '~/components/button/Button'
import ColorSelector from '~/components/product_attributes/ColorSelector'
import QuantitySelector from '~/components/product_attributes/QuantitySelector'
import SizeSelector from '~/components/product_attributes/SizeSelector'
import { Product } from '~/constance/seed/product'

type ProductInfoProps = {
  product: Product
  onAddToCart: (id: number) => void
}

export const ProductInfo: React.FC<ProductInfoProps> = ({ product, onAddToCart }) => {
  const [size, setSize] = useState('Medium')
  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState('')
  const colors = [
    { name: 'Red', hex: '#EF4444' },
    { name: 'Blue', hex: '#3B82F6' },
    { name: 'Green', hex: '#22C55E' }
  ]

  return (
    <div className='w-full md:w-1/2'>
      <h1 className='text-2xl font-bold text-blue-700'>{product.name}</h1>
      {product.discount ? (
        <p className='text-lg text-blue-600 font-semibold'>
          ${product.price} <span className='text-gray-500 line-through ml-2'>${product.originalPrice}</span>
        </p>
      ) : (
        <p className='text-lg text-blue-600 font-semibold'>${product.price}</p>
      )}
      <p className='text-gray-700 mt-2'>{product.description}</p>
      <p className='mt-2'>
        Status:
        <span className={`mt-2 font-semibold ${product.stock > 0 ? 'text-blue-600' : 'text-red-600'}`}>
          {product.stock > 0 ? ' In Stock' : ' Out of Stock'}
        </span>
      </p>

      <SizeSelector selectedSize={size} onSizeChange={setSize} />
      <ColorSelector colors={colors} selectedColor={selectedColor} onColorSelect={setSelectedColor} />
      <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />

      <div className='mt-4 flex gap-4'>
        <Button className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg w-1/2'>
          <Link to={`/products/payment/${product.id}`}>Buy Now</Link>
        </Button>
        <Button
          className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg w-1/2'
          onClick={() => onAddToCart(product.id)}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  )
}

export default ProductInfo
