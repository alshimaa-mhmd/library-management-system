'use client'
import Image from "next/image";
import bookImg from "@/images/Frame (1).png";
import { useEffect, useState } from "react";
import Receipt from "./receipt";
import { createClients } from '@/utils/supabase/server'

export default function ReceiptButton({bookId, borrowed, title, studentName }){
    const [show, setShow] = useState(false);

    const handleShow = () =>{
        setShow(!show)
    }
    return(
        <div>
            <button className={`w-[190px] sm:w-[227px] h-[54px] flex items-center justify-center gap-2 rounded-md bg-[#EED1AC] font-[400] text-[13px] sm:text-[16px] leading-5 text-[#16191E] ${borrowed ? 'bg-opacity-50' : 'bg-opacity-100'}`} onClick={handleShow} disabled={borrowed}>
                <Image src={bookImg} alt="book img" width={20} height={20}/>  
                {borrowed ? "Book is already borrowed " : 'Borrow Book Request'}
            </button>
            <Receipt show={show} handleShow={handleShow} bookId={bookId} title={title} studentName = {studentName}/>
        </div>
    )
}