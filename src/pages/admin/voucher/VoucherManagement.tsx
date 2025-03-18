import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

interface Voucher {
  id: string
  code: string
  discount: number
}

const sampleVouchers: Voucher[] = [
  { id: uuidv4(), code: 'DISCOUNT10', discount: 10 },
  { id: uuidv4(), code: 'SALE20', discount: 20 },
  { id: uuidv4(), code: 'OFFER30', discount: 30 }
]

export default function ManageVouchers() {
  const [vouchers, setVouchers] = useState<Voucher[]>(sampleVouchers)
  const [code, setCode] = useState('')
  const [discount, setDiscount] = useState(0)
  const [editingId, setEditingId] = useState<string | null>(null)

  const addOrUpdateVoucher = () => {
    if (!code || discount <= 0) return

    if (editingId) {
      setVouchers(vouchers.map((v) => (v.id === editingId ? { ...v, code, discount } : v)))
      setEditingId(null)
    } else {
      setVouchers([...vouchers, { id: uuidv4(), code, discount }])
    }

    setCode('')
    setDiscount(0)
  }

  const removeVoucher = (id: string) => {
    setVouchers(vouchers.filter((v) => v.id !== id))
  }

  const editVoucher = (id: string) => {
    const voucher = vouchers.find((v) => v.id === id)
    if (voucher) {
      setCode(voucher.code)
      setDiscount(voucher.discount)
      setEditingId(id)
    }
  }

  return (
    <div className='p-4'>
      <div className='d-card d-bg-base-100 d-shadow-xl p-4'>
        <div className='flex gap-2 mb-4'>
          <input
            type='text'
            placeholder='Mã Voucher'
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className='d-input d-input-bordered'
          />
          <input
            type='number'
            placeholder='Giảm giá %'
            value={discount}
            onChange={(e) => setDiscount(Number(e.target.value))}
            className='d-input d-input-bordered'
          />
          <button onClick={addOrUpdateVoucher} className='d-btn d-btn-primary'>
            {editingId ? 'Cập nhật' : 'Thêm'}
          </button>
        </div>
        <div className='overflow-x-auto'>
          <table className='d-table d-table-zebra w-full'>
            <thead>
              <tr>
                <th>Mã</th>
                <th>Giảm giá (%)</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {vouchers.map(({ id, code, discount }) => (
                <tr key={id}>
                  <td>{code}</td>
                  <td>{discount}</td>
                  <td>
                    <button onClick={() => editVoucher(id)} className='d-btn d-btn-warning mr-2'>
                      Sửa
                    </button>
                    <button onClick={() => removeVoucher(id)} className='d-btn d-btn-error'>
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
