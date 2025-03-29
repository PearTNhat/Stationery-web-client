import { memo } from 'react'
import { DOTS, usePagination } from '~/hooks/usePaginnation'

type PaginationProps = {
  siblingCount?: number
  currentPage: number
  totalPageCount: number
  onPageChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({ siblingCount, currentPage, totalPageCount, onPageChange }) => {
  const paginationRange = usePagination({ siblingCount, currentPage, totalPageCount })

  return (
    <div className='flex items-center justify-center gap-2 p-4'>
      <button
        type='button'
        disabled={currentPage === 1}
        className={`w-10 h-10 flex items-center justify-center rounded-full border transition-all
            ${currentPage === 1 ? 'cursor-not-allowed bg-gray-200' : 'hover:bg-gray-100'}`}
        onClick={() => onPageChange(currentPage - 1)}
      >
        &#9664;
      </button>
      {paginationRange?.map((el: string | number, index: number) => {
        if (el === DOTS) {
          return (
            <span key={index} className='w-10 h-10 flex items-center justify-center'>
              {DOTS}
            </span>
          )
        }
        return (
          <button
            key={index}
            className={`w-10 h-10 flex items-center justify-center rounded-full border transition-all 
              ${currentPage === el ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
            onClick={() => onPageChange(el as number)}
          >
            {el}
          </button>
        )
      })}
      <button
        type='button'
        disabled={currentPage === totalPageCount}
        className={`
          'w-10 h-10 flex items-center justify-center rounded-full border transition-all 
          ${currentPage === totalPageCount ? 'cursor-not-allowed bg-gray-200' : 'hover:bg-gray-100'}`}
        onClick={() => onPageChange(currentPage + 1)}
      >
        &#9654;
      </button>
    </div>
  )
}

export default memo(Pagination)
