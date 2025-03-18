import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function RegisterForm() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      alert('Registration successful!')
      setLoading(false)
    }, 2000)
  }

  return (
    <div className='w-1/2 p-8 flex flex-col justify-center bg-blue-100'>
      <h2 className='text-3xl font-bold text-gray-700 mb-6 text-center'>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className='relative mb-4'>
          <FaUser className='absolute top-3 left-3 text-gray-500' />
          <input
            type='text'
            placeholder='Full Name'
            className='w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none'
            required
          />
        </div>
        <div className='relative mb-4'>
          <FaEnvelope className='absolute top-3 left-3 text-gray-500' />
          <input
            type='email'
            placeholder='Email'
            className='w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none'
            required
          />
        </div>
        <div className='relative mb-4'>
          <FaLock className='absolute top-3 left-3 text-gray-500' />
          <input
            type='password'
            placeholder='Password'
            className='w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none'
            required
          />
        </div>
        <button
          type='submit'
          className='w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition'
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Sign Up'}
        </button>
      </form>
      <p className='text-gray-600 text-sm mt-3 text-center'>
        Already have an account?{' '}
        <span className='text-blue-600 cursor-pointer hover:text-blue-500' onClick={() => navigate('/auth?mode=login')}>
          Log in now
        </span>
      </p>
    </div>
  )
}
