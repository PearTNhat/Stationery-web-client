// components/product/SimilarProducts.tsx
import React from 'react'
import Card from '~/components/card/Card'
import { Product } from '~/types/product'

type SimilarProductsProps = {
  similarProducts: Product[]
  // onAddToCart: (id: number) => void
  // onViewDetails: (id: number) => void
}

export const SimilarProducts: React.FC<SimilarProductsProps> = ({ similarProducts }) => {
  return (
    <div className='mt-12'>
      <h3 className='text-2xl font-bold text-center'>Similar Products</h3>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6'>
        {similarProducts.map((product) => (
          <Card
            key={product.productId}
            product={product}
            // onAddToCart={() => onAddToCart(product.productId)}
            // onViewDetails={() => onViewDetails(product.productId)}
          />
        ))}
      </div>
    </div>
  )
}
