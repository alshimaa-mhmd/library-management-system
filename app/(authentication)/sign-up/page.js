import Link from "next/link";
import { signup } from "./actions";
import Image from "next/image";
import logo from "@/images/logo.png"


export default function signupPage() {
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
          <form className='flex flex-col items-start justify-normal gap-4 w-full'>
            <label htmlFor="full_name" className='font-normal text-[14px] sm:text-[16px] leading-6 text-[#D6E0FF]'>Full name:</label>
            <input id="full_name" name="full_name" type="text" required className='w-full h-[56px] rounded-md py-3 px-5 bg-[#232839] text-white outline-none' placeholder=''/>

            <label htmlFor="student_id" className='font-normal text-[14px] sm:text-[16px] leading-6 text-[#D6E0FF]'>Student ID:</label>
            <input id="student_id" name="student_id" type="number" maxLength={10} placeholder='eg: 394365762' required className='w-full h-[56px] rounded-md py-3 px-5 bg-[#232839] text-white outline-none' />

            <label htmlFor="email" className='font-normal text-[14px] sm:text-[16px] leading-6 text-[#D6E0FF]'>Email:</label>
            <input id="email" name="email" type="email" required className='w-full h-[56px] rounded-md py-3 px-5 bg-[#232839] text-white outline-none' placeholder='Enter your E-mail'/>

            <label htmlFor="password" className='font-normal text-[14px] sm:text-[16px] leading-6 text-[#D6E0FF]'>Password:</label>
            <input id="password" name="password" type="password" placeholder="Atleast 8 characters long" required className='w-full h-[56px] rounded-md py-3 px-5 bg-[#232839] text-white outline-none' />

            <button formAction={signup}  className='w-full h-[56px] rounded-md bg-[#E7C9A5] text-[#14171C] felx items-center justify-center font-bold mt-5'>Sign up</button>
      <div className='flex items-center justify-center w-full gap-2'>
        <p className='font-normal text-[14px] sm:text-[16px] leading-6 text-[#D6E0FF]'>already have an account ? </p>
        <Link href='/login' className='font-semibold text-[16px] leading-6 text-[#E7C9A5] '> log in</Link>
      </div>
    </form>
    </div>
  )
}