import React from 'react'
import { ProductSearchParams } from '~/types/filter'

type Props = {
  setSearchParams: (params: ProductSearchParams) => void
  currentParams: { sortBy?: string }
}

const SortByPrice: React.FC<Props> = ({ currentParams, setSearchParams }) => {
  return (
    <div className='mb-4'>
      <label className='block font-medium mb-2'>Sort by Price</label>
      <select
        className='w-full p-2 border rounded-lg'
        value={currentParams.sort || ''}
        onChange={(e) => {
          setSearchParams({ ...currentParams, sortBy: e.target.value })
        }}
      >
        <option value=''>Default</option>
        <option value='-discountPrice'>Ascending</option>
        <option value='discountPrice'>Descending</option>
      </select>
    </div>
  )
}

export default SortByPrice
