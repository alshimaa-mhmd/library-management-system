import verified from "@/images/Frame.png";
import Image from "next/image";


export default function ConfirmPage() {
    return(
        <div className="flex flex-col items-center justify-center h-screen">
            <div className='flex'>
                <p className='font-normal text-[32px] leading-8 text-[#EED1AC]'>Confirmed!</p>
                <Image src={verified} alt='verified' className='w-[30px] h-[30px]'  />
            </div>
            <p className='font-normal text-[18px] leading-8 text-[#D6E0FF]'>PLease check your email.</p>
        </div>
    )
}