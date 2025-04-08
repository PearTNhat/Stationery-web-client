type Address = {
  address?: string
  isDefault?: boolean
}

type Role = {
  role_id: string
  role_name: string
  description: string
}

type User = {
  userId: string
  avatar: string
  firstName: string
  lastName: string
  email: string
  phone: string
  addresses: Address[]
  role: Role
  carts: any[] // Replace `any` with the appropriate type for cart items if available
  dob: string // Date of birth in ISO format (e.g., "2012-11-11")
}

export type { User, Address, Role }
