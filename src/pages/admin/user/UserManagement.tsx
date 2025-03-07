import { useState } from 'react'
import { useAppDispatch } from '~/hooks/redux'
import { modalActions } from '~/store/slices/modal'

type User = {
  id: number
  firstName: string
  lastName: string
  email: string
  role: string
  active: boolean
}

const fakeUsers: User[] = [
  { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', role: 'Admin', active: true },
  { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', role: 'User', active: false },
  { id: 3, firstName: 'Alice', lastName: 'Brown', email: 'alice.brown@example.com', role: 'Moderator', active: true }
]

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>(fakeUsers)
  const dispatch = useAppDispatch()
  const handleDeleteUser = (id: number) => {
    setUsers(users.filter((user) => user.id !== id))
  }
  const handleAddUser = () => {
    dispatch(modalActions.toggleModal({ isOpenModal: true, childrenModal: 'Add User' }))
  }

  return (
    <div className='p-6 w-full mx-auto bg-white shadow-md rounded-lg'>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-2xl font-bold'>User Management</h1>
        <button className='bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center' onClick={handleAddUser}>
          ➕ Add User
        </button>
      </div>
      <table className='w-full border-collapse border border-gray-300'>
        <thead>
          <tr className='bg-gray-100'>
            <th className='border border-gray-300 px-4 py-2'>#</th>
            <th className='border border-gray-300 px-4 py-2'>First Name</th>
            <th className='border border-gray-300 px-4 py-2'>Last Name</th>
            <th className='border border-gray-300 px-4 py-2'>Email</th>
            <th className='border border-gray-300 px-4 py-2'>Role</th>
            <th className='border border-gray-300 px-4 py-2'>Active</th>
            <th className='border border-gray-300 px-4 py-2'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id} className='text-center'>
              <td className='border border-gray-300 px-4 py-2'>{index + 1}</td>
              <td className='border border-gray-300 px-4 py-2'>{user.firstName}</td>
              <td className='border border-gray-300 px-4 py-2'>{user.lastName}</td>
              <td className='border border-gray-300 px-4 py-2'>{user.email}</td>
              <td className='border border-gray-300 px-4 py-2'>{user.role}</td>
              <td className='border border-gray-300 px-4 py-2'>{user.active ? '✅' : '❌'}</td>
              <td className='border border-gray-300 px-4 py-2 flex justify-center gap-2'>
                <button className='bg-yellow-400 text-white px-3 py-1 rounded-lg'>✏️</button>
                <button
                  className='bg-red-500 text-white px-3 py-1 rounded-lg'
                  onClick={() => handleDeleteUser(user.id)}
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserManagement
