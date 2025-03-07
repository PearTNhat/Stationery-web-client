// import { useForm, SubmitHandler } from 'react-hook-form'
// import InputForm from '~/components/input/InputForm'
// import { FormLogin } from '~/types/auth'
// const Login = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors }
//   } = useForm<FormLogin>()
//   const onSubmit: SubmitHandler<FormLogin> = (data) => console.log(data)
//   return (
//     /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <InputForm
//         id='email'
//         label='Email'
//         register={register}
//         validate={{ required: 'Email is required' }}
//         error={errors}
//       />
//       <InputForm
//         id='password'
//         label='Password'
//         register={register}
//         validate={{ required: 'Password is required' }}
//         error={errors}
//       />
//       <button className='d-btn bg-btnPrimary text-btnTextColor'>Submit</button>
//     </form>
//   )
// }

// export default Login

import { FaEnvelope, FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "@inertiajs/react";

export default function LoginForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      alert("Login successful!");
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="w-1/2 p-8 flex flex-col justify-center translate-x-full">
      <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="relative mb-4">
          <FaEnvelope className="absolute top-3 left-3 text-gray-500" />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
        </div>
        <div className="relative mb-4">
          <FaLock className="absolute top-3 left-3 text-gray-500" />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
          disabled={loading}
        >
          {loading ? "Processing..." : "Login"}
        </button>
      </form>
      <button
        className="w-full mt-3 flex items-center justify-center gap-2 bg-white border p-3 rounded-lg shadow-md hover:bg-gray-100 transition"
        disabled={loading}
      >
        <FcGoogle className="text-xl" />
        <span>{loading ? "Processing..." : "Login with Google"}</span>
      </button>
      <Link href="#" className="text-blue-600 text-sm mt-3 text-center hover:text-blue-500">
        Forgot password?
      </Link>
      <p className="text-gray-600 text-sm mt-3 text-center">
        Don't have an account?{" "}
        <span className="text-blue-600 cursor-pointer hover:text-blue-500" onClick={() => navigate("/auth?mode=register")}>
          Sign up now
        </span>
      </p>
    </div>
  );
}