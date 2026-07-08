'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext'; 
import Link from "next/link";
// import { login } from "./actions";
import Image from "next/image";
import logo from "@/images/logo.png"
import warning from '@/images/warning2.png'

 
export  default function  LoginPage({ searchParams }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(formData.email, formData.password);
    console.log(result)
    if (!result.success) {
      setError(result.error);
    }
    // No need to redirect here - the login function handles it
    
    setLoading(false);
  };
  return (
    <>
    <div className="flex flex-col items-start justify-normal p-8 xl:p-12 bg-[#12141D] rounded-3xl sm:w-[80%] md:w-full gap-4 ">
       <div className="flex items-center justify-center gap-2"><Image src={logo} alt="icon" className='w-8 h-6 sm:w-[40px] sm:h-[32px]' /> 
        <p className='font-semibold leading-6 text-[20px] sm:text-[28px] sm:leading-8 text-white'>BookWise</p>
       </div>
       <p className='font-semibold leading-6 text-[20px] sm:text-[28px] sm:leading-8 text-white'>Welcome Back to the BookWise</p>
       <span className='font-normal text-[14px] sm:text-[16px] leading-6 text-[#D6E0FF]'>Access the vast collection of resources, and stay updated</span>
      <form onSubmit={handleSubmit} className='flex flex-col items-start justify-normal gap-4 w-full'>
        <label htmlFor="email" className='font-normal text-[14px] sm:text-[16px] leading-6 text-[#D6E0FF]'>Email:</label>
        <input value={formData.email}
              onChange={handleChange} id="email" name="email" type="email" required className='w-full h-[56px] rounded-md py-3 px-5 bg-[#232839] text-white outline-none' placeholder='Enter your E-mail' />

        <label htmlFor="password" className='font-normal text-[16px] leading-6 text-[#D6E0FF]'>Password:</label>
        <input  value={formData.password}
              onChange={handleChange} id="password" name="password" type="password" placeholder="Atleast 8 characters long" required className='w-full h-[56px] rounded-md py-3 px-5 bg-[#232839] text-white outline-none'/>

        <button  type="submit"
            disabled={loading} className='w-full h-[56px] rounded-md bg-[#E7C9A5] text-[#14171C] felx items-center justify-center font-bold mt-5' > {loading ? 'Logging in...' : 'Login'}</button>

        <div className='flex items-center justify-center w-full gap-2'>
          <p className='font-normal text-[14px] sm:text-[16px] leading-6 text-[#D6E0FF]'>
            Don&apos;t have an account ? 
          </p>
          <Link href='/sign-up' className='font-semibold text-[14px] sm:text-[16px] leading-6 text-[#E7C9A5]'>
          Register here
          </Link>
        </div>
      </form>
    </div> 
    {error && (
      <div className="absolute top-10 bg-[#111624] z-[100] font-normal text-[14px] p-4 flex gap-1 w-[260px] text-red-300 rounded-md animate-logError">
       <Image src={warning} alt='warning' className='w-6 h-6'/>{error}
      </div>
    )}
    </>
  )
}