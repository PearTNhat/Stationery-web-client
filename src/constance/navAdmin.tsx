import { NavItem } from '~/types/navAdmin'
import { MdDashboard } from 'react-icons/md'
import { FaUsers } from 'react-icons/fa'
import { TbBuildingWarehouse } from 'react-icons/tb'
import { RiProductHuntLine } from 'react-icons/ri'
import { adminPaths } from './paths'
const navItems: NavItem[] = [
  {
    icon: <MdDashboard />,
    name: 'Dashboard',
    path: '/admin'
  },
  {
    icon: <FaUsers />,
    name: 'Users',
    path: '/admin/users'
  },
  {
    icon: <RiProductHuntLine />,
    name: 'Products',
    path: '/admin/products'
  },
  {
    icon: <TbBuildingWarehouse />,
    name: 'Departments',
    path: '/admin/departments'
  },
  {
    icon: <TbBuildingWarehouse />,
    name: 'Vouchers',
    path: adminPaths.VOUCHER
  }
]
export { navItems }
