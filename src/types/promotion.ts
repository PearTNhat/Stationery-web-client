interface Promotion {
  promotionId: string
  promoCode: string
  discountType: DiscountType
  discountValue: number
  usageLimit: number
  maxValue: number
  minOrderValue: number
  startDate: string // ISO format e.g. "2025-04-11"
  endDate: string
  createdAt: string
}

type DiscountType = 'PERCENTATE' | 'VALUE'

export type { DiscountType, Promotion }
