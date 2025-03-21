import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterForm() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  })

  // Watch password for confirm password validation
  const password = watch('password')

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      alert('Registration successful!')
    } catch (error) {
      console.error('Registration failed:', error)
    }
  }

  return (
    <div className='w-1/2 p-8 flex flex-col justify-center bg-blue-100'>
      <h2 className='text-3xl font-bold text-gray-700 mb-6 text-center'>Sign Up</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className='relative mb-4'>
          <FaUser className='absolute top-3 left-3 text-gray-500' />
          <input
            {...register('firstName', { required: 'First name is required' })}
            type='text'
            placeholder='First Name'
            className='w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none'
            aria-label='First Name'
          />
          {errors.firstName && <p className='text-red-500 text-sm'>{errors.firstName.message}</p>}
        </div>

        <div className='relative mb-4'>
          <FaUser className='absolute top-3 left-3 text-gray-500' />
          <input
            {...register('lastName', { required: 'Last name is required' })}
            type='text'
            placeholder='Last Name'
            className='w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none'
            aria-label='Last Name'
          />
          {errors.lastName && <p className='text-red-500 text-sm'>{errors.lastName.message}</p>}
        </div>

        <div className='relative mb-4'>
          <FaEnvelope className='absolute top-3 left-3 text-gray-500' />
          <input
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Email is invalid'
              }
            })}
            type='email'
            placeholder='Email'
            className='w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none'
            aria-label='Email'
          />
          {errors.email && <p className='text-red-500 text-sm'>{errors.email.message}</p>}
        </div>

        <div className='relative mb-4'>
          <FaLock className='absolute top-3 left-3 text-gray-500' />
          <input
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 7,
                message: 'Password must be more than 6 characters'
              },
              pattern: {
                value: /^[a-zA-Z0-9]+$/,
                message: 'Password can only contain letters and numbers'
              }
            })}
            type='password'
            placeholder='Password'
            className='w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none'
            aria-label='Password'
          />
          {errors.password && <p className='text-red-500 text-sm'>{errors.password.message}</p>}
        </div>

        <div className='relative mb-4'>
          <FaLock className='absolute top-3 left-3 text-gray-500' />
          <input
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: value => value === password || 'Passwords do not match'
            })}
            type='password'
            placeholder='Confirm Password'
            className='w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none'
            aria-label='Confirm Password'
          />
          {errors.confirmPassword && <p className='text-red-500 text-sm'>{errors.confirmPassword.message}</p>}
        </div>

        <button
          type='submit'
          className='w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition disabled:bg-blue-300'
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Processing...' : 'Sign Up'}
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