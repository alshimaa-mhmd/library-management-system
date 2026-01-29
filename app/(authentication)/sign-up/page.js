'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from "next/link";
import warning from '@/images/warning-2.png'
import Image from "next/image";
import logo from "@/images/logo.png"


export default function SignupPage() {
   const [formData, setFormData] = useState({
    name: '',
    studentId: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signup } = useAuth();
  const router = useRouter();

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

    const result = await signup(
      formData.name,
      formData.studentId,
      formData.email,
      formData.password
    );

    if (result.success) {
      // Redirect to login after successful signup
      router.push('/login');
    } else {
      setError(result.error);
      console.error(result.error);
    }
    
    setLoading(false);
  };
  return (
    <div className="flex flex-col items-start justify-normal p-8 xl:p-12 bg-[#12141D] rounded-3xl sm:w-[80%] md:w-full gap-4 mb-8 md:mb-0">
           <div className="flex items-center justify-center gap-2"><Image src={logo} alt="icon" className='w-8 h-6 sm:w-[40px] sm:h-[32px]' />
            <p className='font-semibold leading-6 text-[20px] sm:text-[28px] sm:leading-8 text-white'>
              BookWise
            </p>
           </div>
           <p className='font-semibold leading-6 text-[20px] sm:text-[28px] sm:leading-8 text-white'>
            Create Your Library Account
          </p>
           <span className='font-normal text-[14px] sm:text-[16px] leading-6 text-[#D6E0FF]'>Please complete all fields and upload a valid university ID to gain access to the library</span>

          

          <form onSubmit={handleSubmit} className='flex flex-col items-start justify-normal gap-4 w-full'>
            <label htmlFor="full_name" className='font-normal text-[14px] sm:text-[16px] leading-6 text-[#D6E0FF]'>Full name:</label>
            <input  value={formData.name}
              onChange={handleChange} id="name" name="name" type="text" required className='w-full h-[56px] rounded-md py-3 px-5 bg-[#232839] text-white outline-none' placeholder=''/>

            <label htmlFor="student_id" className='font-normal text-[14px] sm:text-[16px] leading-6 text-[#D6E0FF]'>Student ID:</label>
            <input value={formData.studentId}
              onChange={handleChange} id="studentId" name="studentId" type="number" maxLength={10} placeholder='eg: 394365762' required className='w-full h-[56px] rounded-md py-3 px-5 bg-[#232839] text-white outline-none' />

            <label htmlFor="email" className='font-normal text-[14px] sm:text-[16px] leading-6 text-[#D6E0FF]'>Email:</label>
            <input value={formData.email}
              onChange={handleChange} id="email" name="email" type="email" required className='w-full h-[56px] rounded-md py-3 px-5 bg-[#232839] text-white outline-none' placeholder='Enter your E-mail'/>

            <label htmlFor="password" className='font-normal text-[14px] sm:text-[16px] leading-6 text-[#D6E0FF]'>Password:</label>
            <input value={formData.password}
              onChange={handleChange} id="password" name="password" type="password" placeholder="Atleast 8 characters long" required className='w-full h-[56px] rounded-md py-3 px-5 bg-[#232839] text-white outline-none' />

            <button type="submit" disabled={loading}
  className='w-full h-[56px] rounded-md bg-[#E7C9A5] text-[#14171C] felx items-center justify-center font-bold mt-5'>
      {loading ? 'Signing up...' : 'Sign Up'}
  </button>
      <div className='flex items-center justify-center w-full gap-2'>
        <p className='font-normal text-[14px] sm:text-[16px] leading-6 text-[#D6E0FF]'>already have an account ? </p>
        <Link href='/login' className='font-semibold text-[16px] leading-6 text-[#E7C9A5] '> log in</Link>
      </div>
    </form>

        {error && (
              <div className="fixed top-10 bg-[#111624] z-[100] font-normal text-[14px] p-4 flex gap-1 w-[300px] text-red-300 rounded-md animate-logError">
               <Image src={warning} alt='warning' className='w-6 h-6'/>

                Passwords must be at least 6 characters,have at least one non alphanumeric character, have at least one digit, and at least one uppercase.
               
              </div>
            )}
    </div>
  )
}