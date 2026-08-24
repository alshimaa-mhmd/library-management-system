'use client'
import Image from "next/image";
import bookImg from "@/images/Frame(1).png";
import { useEffect, useState, useContext } from "react";
import Receipt from "./Receipt";
import { createClients } from '@/utils/supabase/server'
import BookContext from "@/contexts/BookContext";

export default function ReceiptButton({book, title, studentName }){
    const [show, setShow] = useState(false);
    const { borrowedBooks } = useContext(BookContext);
    const [isBorrowed, setIsBorrowed] = useState(false);
    const handleShow = () =>{
        setShow(!show)
    }
    useEffect(() => {
        const borrowed = borrowedBooks?.some(borrowedBook => borrowedBook.bookId == book.bookId);
        setIsBorrowed(borrowed);
        
    }, [borrowedBooks]);  

    return(
        <div>
            <button className={`w-[190px] sm:w-[227px] h-[54px] flex items-center justify-center gap-2 rounded-md bg-[#EED1AC] font-[400] text-[13px] sm:text-[16px] leading-5 text-[#16191E] ${isBorrowed ? 'bg-opacity-50' : 'bg-opacity-100'}`} onClick={handleShow} disabled={isBorrowed}>
                <Image src={bookImg} alt="book img" width={20} height={20}/>  
                {isBorrowed ? "Book is already borrowed " : 'Borrow Book Request'}
            </button>
            <Receipt show={show} handleShow={handleShow} book={book} title={title} studentName = {studentName}/>
        </div>
    )
}