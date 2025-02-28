'use client'
import { useState } from "react";
import Link from "next/link";

export default function Books({book}) {
    const [ active, setActive] = useState(false)
    return (
        <Link href={`/${book.id}`} className='w-[180px] h-[360px] cursor-pointer flex flex-col items-start justify-between my-8' onMouseEnter={() => setActive(true)}
        onMouseLeave = {() => setActive(false)}
        >
            <div className={`rounded-md transition-all  ${active ?  'opacity-45 scale-[0.9]' :'opacity-100 scale-100' }`}>
                <img src={book.cover_url} alt='book cover' className="w-[160px] h-[200px] rounded-md" />
            </div>
            <div className={`transition-all duration-300 ${active ? ' opacity-100 bottom-16' : ' opacity-0 bottom-0'}  relative w-[160px] h-[56px] flex items-center justify-center z-10 text-white font-normal text-[18px] bg-[#111624]`} >
                Borrow Now!
            </div>
            <p className="text-wrap text-[20] font-semibold leading-6 line-clamp-3">{book.title} - By {book.author}</p>
            <span className="text-[16px] font-[400] leading-8 italic text-[#D6E0FF]">{book.category}</span>
        </Link>
    )
}
