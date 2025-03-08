export const pulictPath = {
  PUBLIC: '/',
  LOGIN: '/login',
  REGISTER: '/register',

  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  NOT_FOUND: '/not-found',
  PRODUCT: '/product',
  CONTACT: '/contact'
}
export const userPath = {
  PROFILE: '/user/profile'
}
export const adminPath = {
  ADMIN: '/admin',
  USER: '/admin/users',
  PRODUCT: '/admin/products',
  DEPARTMENT: '/admin/departments',
  VOUCHER: '/admin/vouchers'
}
export const paths = {
  ...pulictPath,
  ...userPath,
  ...adminPath
}
