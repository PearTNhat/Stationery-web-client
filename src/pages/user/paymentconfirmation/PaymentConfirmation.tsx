import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Button from '~/components/button/Button'
import CustomerInfo from './CustomerInfo'
import OrderSummary from './OrderSummary'
import DiscountSection from './DiscountSection'
import PaymentMethod from './PaymentMethod'
import { useAppSelector, useAppDispatch } from '~/hooks/redux'
import { ShippingAddress } from './ShippingAddress'
import { apiGetUserInfo } from '~/api/users'

export default function PaymentConfirmation() {
  const [selectedPayment, setSelectedPayment] = useState('COD')
  const [discountCode, setDiscountCode] = useState('')
  const [discountAmount, setDiscountAmount] = useState(0)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { accessToken, isLoggedIn, userData } = useAppSelector((state) => state.user)
  const [userDataState, setUserData] = useState(userData)
  const [selectedShippingInfo, setSelectedShippingInfo] = useState<{ addressName: string; phone: string } | null>(null)

  const { state } = useLocation()
  const order = state?.order || {
    orderId: 'ORD123456',
    items: [],
    totalAmount: 0
  }

  console.log('user data test', userDataState)

  useEffect(() => {
    if (!isLoggedIn || !accessToken) {
      navigate('/')
      return
    }

    const loadUserData = async () => {
      try {
        const data = await apiGetUserInfo({ token: accessToken })
        console.log('User data from API PC:', data)
        setUserData(data.result) // Use data.result
        console.log('Updated userDataState addresses:', data.result.addresses) // Log addresses
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    loadUserData()
  }, [accessToken, isLoggedIn, dispatch, navigate])

  console.log('in payment', userDataState)

  return (
    <div className='max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-lg mt-16'>
      <h1 className='text-3xl font-bold text-blue-800 text-center'>Order Confirmation</h1>
      {userDataState && <ShippingAddress userData={userDataState} setSelectedShippingInfo={setSelectedShippingInfo} />}
      <CustomerInfo selectedShippingInfo={selectedShippingInfo} />
      <OrderSummary order={order} />
      <DiscountSection
        orderTotal={order.totalAmount}
        discountCode={discountCode}
        setDiscountCode={setDiscountCode}
        discountAmount={discountAmount}
        setDiscountAmount={setDiscountAmount}
      />
      <PaymentMethod selectedPayment={selectedPayment} setSelectedPayment={setSelectedPayment} />
      <div className='mt-6 text-center'>
        <Button className='bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg'>Payment</Button>
      </div>
    </div>
  )
}
