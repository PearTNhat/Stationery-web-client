import { CartItem } from './cart'

type OrderDetails = { items: CartItem[]; totalAmount: number }

interface OrderItem {
  productDetailId: string
  quantity: number
  promotionId: string | null
}
interface CreateOrderParams {
  orderDetails: OrderItem[]
  userPromotionId: string | null
  addressId: string
  recipient: string
  amount: number
  note: string | null
  accessToken: string
}
interface UserInfoOrder {
  name: string
  phone: string
  note: string | null
  email: string
}

export type { OrderDetails, CreateOrderParams, UserInfoOrder }
