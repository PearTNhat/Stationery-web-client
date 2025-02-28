import { useForm, SubmitHandler } from 'react-hook-form'
import InputForm from '~/components/input/InputForm'
import { FormLogin } from '~/types/auth'
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormLogin>()
  const onSubmit: SubmitHandler<FormLogin> = (data) => console.log(data)
  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputForm
        id='email'
        label='Email'
        register={register}
        validate={{ required: 'Email is required' }}
        error={errors}
      />
      <InputForm
        id='password'
        label='Password'
        register={register}
        validate={{ required: 'Password is required' }}
        error={errors}
      />
      <button className='d-btn bg-btnPrimary text-btnTextColor'>Submit</button>
    </form>
  )
}

export default Login
