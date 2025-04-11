import { useState } from 'react'
import Voucher from '~/components/voucher/Voucher'

type Coupon = { id: number; code: string; discount: number; minOrder: number; expiry: string }

export default function DiscountSection({
  orderTotal,
  discountCode,
  setDiscountCode,
  discountAmount,
  setDiscountAmount,
}: {
  orderTotal: number
  discountCode: string
  setDiscountCode: (code: string) => void
  discountAmount: number
  setDiscountAmount: (amount: number) => void
}) {
  const [showVouchers, setShowVouchers] = useState(false)
  const validDiscounts: Coupon[] = [
    { id: 1, code: 'SALE10', discount: 50000, minOrder: 300000, expiry: '2025-12-31' },
    { id: 2, code: 'SALE20', discount: 100000, minOrder: 500000, expiry: '2025-12-31' }
  ]

  const applyDiscount = (code?: string) => {
    const selectedCode = code || discountCode
    const coupon = validDiscounts.find((c) => c.code === selectedCode)

    if (coupon) {
      if (orderTotal >= coupon.minOrder) {
        setDiscountCode(selectedCode)
        setDiscountAmount(coupon.discount)
      } else {
        alert(`Đơn hàng cần đạt tối thiểu ${coupon.minOrder.toLocaleString()} VND`)
        setDiscountAmount(0)
      }
    } else {
      alert('Mã giảm giá không hợp lệ')
      setDiscountAmount(0)
    }
  }

  return (
    <div className='mt-6 bg-gray-100 p-4 rounded-lg'>
      <h2 className='text-lg font-semibold text-gray-800 mb-4'>Mã giảm giá</h2>
      <div className='flex space-x-2'>
        <input
          type='text'
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
          className='w-full p-2 border rounded-lg'
          placeholder='Nhập mã giảm giá'
        />
        <button onClick={() => applyDiscount()} className='px-4 py-2 bg-blue-500 text-white rounded-lg'>Áp dụng</button>
      </div>
      <button
        onClick={() => setShowVouchers(!showVouchers)}
        className='px-4 py-2 mt-2 text-white bg-blue-500 rounded-lg'
      >
        Voucher của bạn
      </button>
      {showVouchers && (
        <div className='mt-2 p-2 border rounded-lg bg-white'>
          <h3 className='text-md font-semibold'>Danh sách voucher:</h3>
          <Voucher coupons={validDiscounts} onApplyDiscount={applyDiscount} />
        </div>
      )}
      {discountAmount > 0 && (
        <p className='font-semibold text-right mt-2'>
          Giảm giá: <span className='text-blue-600'>{discountAmount.toLocaleString()} VND</span>
        </p>
      )}
      <div className='mt-4 font-semibold text-right'>
        Tổng tiền sau giảm giá:{' '}
        <span className='text-red-600'>{(orderTotal - discountAmount).toLocaleString()} VND</span>
      </div>
    </div>
  )
}