const pulictPath = {
  PUBLIC: '/',
  LOGIN: '/login',
  REGISTER: '/register',

  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  NOT_FOUND: '/not-found',
  PRODUCT: '/product',
  CONTACT: '/contact'
}
const userPath = {
  PROFILE: '/user/profile'
}
const adminPath = {
  ADMIN: '/admin',
  USER: '/admin/users',
  PRODUCT: '/admin/products',
  DEPARTMENT: '/admin/departments'
}
export const paths = {
  ...pulictPath,
  ...userPath,
  ...adminPath
}
