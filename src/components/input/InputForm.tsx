import { InputHTMLAttributes, memo } from 'react'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { FormLogin } from '~/types/auth'

interface InputFormProps extends InputHTMLAttributes<HTMLInputElement> {
  cssParents?: string
  id: string
  validate?: object
  iconRequire?: boolean
  label?: string
  register: UseFormRegister<any>
  error?: FieldErrors<FormLogin>
}

function InputForm({ cssParents, id, validate, iconRequire, label, register, error, ...rest }: InputFormProps) {
  return (
    <div className={cssParents + ' mt-1'}>
      {label && (
        <label htmlFor={id}>
          {iconRequire && <span className='text-red-500'>*</span>}
          {label}
        </label>
      )}
      <input
        type='text'
        id={id}
        {...register(id, validate)}
        className={`${
          error && error[id as keyof FormLogin] ? '!border-red-500' : ''
        } placeholder:text-dark-light border-[1px] border-text-dark-gray rounded-md p-2 w-full outline-none focus:border-primary`}
        {...rest}
      />
      <div className='h-[18px]'>
        {error && error[id as keyof FormLogin] ? (
          <small className='text-red-500'>{error[id as keyof FormLogin]?.message}</small>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

export default memo(InputForm)
