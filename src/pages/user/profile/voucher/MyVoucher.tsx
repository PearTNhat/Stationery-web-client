import Voucher from '~/components/voucher/Voucher'
import { useAppSelector } from '~/hooks/redux'

const MyVoucher = () => {
  const { myVouchers } = useAppSelector((state) => state.voucher)
  return (
    <div className='bg-white p-6 rounded-lg shadow-md'>
      <h2 className='text-2xl font-bold mb-4'>My vouchers</h2>
      <div className='flex flex-wrap gap-3  mb-6 border-b'>
        {myVouchers?.map((voucher) => (
          <div
            className='lg:w-[calc(25%-9px)] md:w-[calc(33.33%-8px)] sm:w-[calc(50%-12px)] w-full'
            key={voucher.userPromotionId}
          >
            <Voucher promotion={voucher.promotion} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyVoucher
