import React from 'react'
import Card from '~/components/card/Card'
import { Product } from '~/types/product'

type ProductListProps = {
  products: Product[] | null
  onViewDetails: (product: Product) => void
}

export const ProductList: React.FC<ProductListProps> = ({ products, onViewDetails }) => {
  return (
    <div className='w-4/5'>
      <h1 className='text-4xl font-bold text-blue-800 mb-6 text-center'>Product List</h1>
      <div className='flex flex-wrap gap-3'>
        {products?.map((product) => (
          <div
            key={product.productId}
            className='lg:w-[calc(25%-9px)] md:w-[calc(33.33%-8px)] sm:w-[calc(50%-12px)] w-full'
          >
            <Card key={product.productId} product={product} onViewDetails={() => onViewDetails(product)} />
          </div>
        ))}
      </div>
    </div>
  )
}
