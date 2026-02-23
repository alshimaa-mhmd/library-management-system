'use client'
import Link from "next/link";
import icon from "@/images/logo.png"
import log_out from "@/images/Frame 162.png"
import Image from "next/image";
// import { logout } from "@/app/logout/actions";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { usePathname } from "next/navigation";
export default function Nav(){
    const [openMenu, setOpenMenu] = useState(false)
    const {logout} = useAuth();
    const pathname = usePathname();
    const active = pathname?.startsWith('/search') ? 'search' : pathname?.startsWith('/profile') ? 'profile' : 'home';
    return(
        <nav className="flex items-center justify-between p-12 bg-transprent">
            <Link href='/' className="flex items-center justify-center gap-2"><Image src={icon} width={40} height={30} alt="icon" className="w-[25px] sm:w-[40px]" /> <p className="font-semibold text-[18px] sm:text-[28px] leading-6">BookWise</p></Link>
            <div className="hidden sm:flex items-center justify-between space-x-4">
                <Link href="/" className={`${ active === 'home' ? 'text-[#EED1AC]' : 'text-white'} font-normal text-[20px] leading-8 `}>Home</Link>
                <Link href='/search' className={`${ active === 'search' ? 'text-[#EED1AC]' : 'text-white'} font-normal text-[20px] leading-8`}>Search</Link>
                <Link href='/profile' className={`${ active === 'profile' ? 'text-[#EED1AC]' : 'text-white'} font-normal text-[20px] leading-8`}>Profile</Link>
                <button type='button' onClick={logout}>
                    <Image src={log_out} alt="logout" width={24} height={24} />
                </button>
            </div>

            <div className="block sm:hidden">
                <div className="cursor-pointer" onClick={()=> setOpenMenu(!openMenu)}>
                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 7h14M5 12h14M5 17h14"/>
                    </svg>
                </div>
                <div className={`flex flex-col items-start justify-around gap-12 mt-12 w-[100%] p-8 absolute z-50  backdrop-blur-2xl transition-[right] ${openMenu ? 'right-[0px]' : 'right-full'} shadow-xl shadow-gray-800 `}>
                    <Link href="/" className={`${ active === 'home' ? 'text-[#EED1AC]' : 'text-white'} font-normal text-[20px] leading-8 `} onClick={() => {
                        setOpenMenu(!openMenu)
                        }}>Home</Link>
                    <Link href='/search' className={`${ active === 'search' ? 'text-[#EED1AC]' : 'text-white'} font-normal text-[20px] leading-8`} onClick={() => {
                        setOpenMenu(!openMenu)
                        }}>Search</Link>
                    <Link href='/profile' className={`${ active === 'profile' ? 'text-[#EED1AC]' : 'text-white'} font-normal text-[20px] leading-8`} onClick={() => {
                        setOpenMenu(!openMenu)
                        }}>Profile</Link>
                   
                        <button type='submit' onClick={logout}>  
                            <Image src={log_out} alt="logout" width={24} height={24} />
                        </button>
                    
            </div>
            </div>
        </nav>
    )
}