'use client'
import borrow from "@/utils/supabase/borrowBook";
import Image from "next/image";
import bookImg from "@/images/Frame(1).png";
import { useState, useContext } from "react";
import BookContext from "@/contexts/BookContext";
import { redirect } from 'next/navigation'


export default function BorrowButton({book, handleShow}) {
    const [show, setShow] = useState(false);
    
    const {borrowedBooks, setBorrowedBooks} = useContext(BookContext);

    const handleBorrow = () => {

        setShow(true);
        setBorrowedBooks((borrowedBooks) => {
        const updated = [...borrowedBooks, book];
        localStorage.setItem("borrowedBooks", JSON.stringify(updated));
        return updated;
    });
       
        setTimeout(() => {
            setShow(false)
        }, 2000);
        setTimeout(() => {
            redirect('/profile');
        }, 2000);

        // setTimeout(() => {
        //     redirect('/profile')
        // }, 2000);

        
        // borrow(book);
        // setTimeout(() => {
        //     setShow(false)
        //   }, 2000);
        // localStorage.setItem("borrowedBooks", [JSON.stringify(book)], [book]);
    }
    // if (!bookId){
    //     console.log('bookId is not found');
    //     return;
    // }; 
    return (
        <>
        <button className={` w-[200px] sm:w-[220px] flex items-center justify-center gap-1 h-[46px] rounded-md py-[10px] px-5 bg-[#EED1AC] font-semibold text-[13px] sm:text-[15px]  text-[#16191E]`} onClick={() => {
            handleBorrow();
            }
            } >
            <Image src={bookImg} alt="book img" width={20} height={20}/>  Borrow Book 
        </button>
        <div className={` ${show ? 'absolute' : 'hidden'} flex items-center justify-center bg-white w-[260px] h-[70px] rounded-md animate-up right-[50px] z-[100]`}>
            <p className='text-[14px] font-semibold text-[#111624]'>
                You have borrowed the book!
            </p>
        </div>

        </>
    )
}