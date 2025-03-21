import { AxiosError } from 'axios'
import { FaEnvelope, FaEye, FaEyeSlash, FaLock } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Link } from '@inertiajs/react'
import InputForm from '~/components/input/InputForm'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormLogin } from '~/types/auth'
import { showToastError, showToastSuccess } from '~/utils/alert'
import { apiLogin } from '~/api/authenticate'
import { useAppDispatch } from '~/hooks/redux'
import { userActions } from '~/store/slices/user'
export default function LoginForm() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const dispatch = useAppDispatch()
  const [isShowPassword, setIsShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormLogin>()
  const onSubmit: SubmitHandler<FormLogin> = async (data) => {
    try {
      const response = await apiLogin(data)
      if (response.code === 200) {
        dispatch(userActions.login(response.result))
        navigate('/')
        showToastSuccess('Login successfully')
      } else {
        showToastError(response.message)
      }
    } catch (error) {
      if (error instanceof Error || error instanceof AxiosError) {
        showToastError(error.message)
      }
    }
  }
  return (
    <div className='w-1/2 p-8 flex flex-col justify-center translate-x-full'>
      <h2 className='text-3xl font-bold text-gray-700 mb-6 text-center'>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=''>
          <InputForm
            iconLeft={<FaEnvelope className='absolute top-3 left-3 text-gray-500' />}
            id='email'
            cssInput='pl-10'
            placeholder='Email'
            register={register}
            validate={{ required: 'Email is required' }}
            error={errors}
          />
          <InputForm
            iconLeft={<FaLock className='absolute top-3 left-3 text-gray-500' />}
            iconRight={
              <div onClick={() => setIsShowPassword((prev) => !prev)}>
                {isShowPassword ? (
                  <FaEyeSlash className='absolute top-3 right-3 text-gray-500' />
                ) : (
                  <FaEye className='absolute top-3 right-3 text-gray-500' />
                )}
              </div>
            }
            id='password'
            cssInput='pl-10'
            type={`${isShowPassword ? 'text' : 'password'}`}
            placeholder='Password'
            register={register}
            validate={{ required: 'Password is required' }}
            error={errors}
          />
        </div>
        <button
          type='submit'
          className='w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition mt-1'
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Login'}
        </button>
      </form>
      <button
        className='w-full mt-3 flex items-center justify-center gap-2 bg-white border p-3 rounded-lg shadow-md hover:bg-gray-100 transition'
        disabled={loading}
      >
        <FcGoogle className='text-xl' />
        <span>{loading ? 'Processing...' : 'Login with Google'}</span>
      </button>
      <Link href='#' className='text-blue-600 text-sm mt-3 text-center hover:text-blue-500'>
        Forgot password?
      </Link>
      <p className='text-gray-600 text-sm mt-3 text-center'>
        Don't have an account?{' '}
        <span
          className='text-blue-600 cursor-pointer hover:text-blue-500'
          onClick={() => navigate('/auth?mode=register')}
        >
          Sign up now
        </span>
      </p>
    </div>
  )
}
