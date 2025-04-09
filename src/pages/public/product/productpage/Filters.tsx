import React from 'react'
import CategoryFilter from '~/components/filter/CategoryFilter'
import PriceRange from '~/components/filter/PriceRange'
import SortByPrice from '~/components/filter/SortByPrice'
import TagFilter from '~/components/filter/TagFilter'
import Voucher from '~/components/voucher/Voucher'
import { ProductSearchParams } from '~/types/filter'

type FiltersProps = {
  selectedCategory: string
  setSelectedCategory: (value: string) => void
  setFilters: (filters: { bestSeller: boolean; isNew: boolean; discounted: boolean }) => void
  coupons: { id: number; discount: number; minOrder: number; code: string; expiry: string }[]
  appliedCoupon: string | null
  onApplyDiscount: (code: string) => void
  setSearchParams: (serchParams: ProductSearchParams) => void
  currentParams: ProductSearchParams
}
const Filters: React.FC<FiltersProps> = ({
  selectedCategory,
  setSelectedCategory,
  filters,
  setFilters,
  coupons,
  appliedCoupon,
  onApplyDiscount,
  setSearchParams,
  currentParams
}) => {
  return (
    <aside className='w-1/5 bg-gray-100 p-4 rounded-lg shadow'>
      <h2 className='text-xl text-blue-700 font-semibold mb-4'>Product Filters</h2>

      <CategoryFilter selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      <SortByPrice currentParams={currentParams} setSearchParams={setSearchParams} />
      <PriceRange currentParams={currentParams} setSearchParams={setSearchParams} />
      <TagFilter currentParams={currentParams} setSearchParams={setSearchParams} />

      <Voucher coupons={coupons} onApplyDiscount={onApplyDiscount} />
      {appliedCoupon && (
        <div className='mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg'>
          Applied Coupon: <strong>{appliedCoupon}</strong>
        </div>
      )}
    </aside>
  )
}

export default Filters
