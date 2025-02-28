'use client'
import Image from "next/image";
import logo from "@/images/logo.png"
import { useState } from "react";
import BorrowButton from "./borrowButton";

export default function Receipt({show, handleShow, bookId, title, studentName}){

    const getCurrentDate = () => {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const date = new Date();
    
        const month = months[date.getMonth()]; // Get the month abbreviation
        const day = String(date.getDate()).padStart(2, '0'); // Ensure day is two digits
        const year = date.getFullYear(); // Get the full year
    
        return `${month} ${day}, ${year}`;
    }
    
    const getFutureDate = (daysAhead = 4) => {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const date = new Date();
        
        date.setDate(date.getDate() + daysAhead); // Add 4 days
    
        const month = months[date.getMonth()];
        const day = String(date.getDate()).padStart(2, '0');
        const year = date.getFullYear();
    
        return `${month} ${day}, ${year}`;
    };
    
    
    return(
        <div className={`w-full h-full fixed  inset-0  items-center justify-center ${show ? 'flex' : 'hidden'}  z-10  backdrop-blur-xl`}>


        <div className={`w-[300px] sm:w-[640px] rounded-xl bg-[#111624] mt-[10px] p-8 sm:p-16 flex flex-col items-start justify-normal`}>
           <div className="flex items-start justify-center gap-2">
                <Image src={logo} width={40} height={32} alt="icon" className='w-[35px] sm:w-[40px]' /> 
                <p className='font-semibold text-[20px] sm:text-[28px] leading-8 text-white'>BookWise</p>
           </div>
           <hr className="w-[90%] border border-[#232839] my-[1rem] sm:my-8"/>
           <div className="flex flex-col items-start justify-normal gap-4">
            <h3 className='font-semibold text-[16px] sm:text-[24px] leading-8 text-white'>Your Receipt for <span className="text-[#EED1AC]">{title}</span> is Ready!</h3>
            <p className="font-normal text-[13px] sm:text-[18px] leading-7 text-[#D6E0FF]">Hi <span className="text-[#EED1AC]">{studentName}</span>,</p>
                <ul className="list-disc font-normal text-[13px] sm:text-[18px] leading-7 text-[#D6E0FF]">
                    <p className="font-normal text-[13px] sm:text-[18px] leading-7 text-[#D6E0FF]">
                    Your receipt for borrowing <span className="text-[#EED1AC]">{title}</span> has been generated. Here are the details:
                    </p>
                    <li className="ml-10">Borrowed On: <span className="text-[#EED1AC]">{getCurrentDate()} </span> </li>
                    <li className="ml-10">Due Date: <span className="text-[#EED1AC]">{getFutureDate()} </span></li>
                </ul>
                <p className="font-normal text-[13px] sm:text-[18px] leading-7 text-[#D6E0FF]">
                You can download the receipt here:
                </p>
            <div className="flex gap-4 sm:flex-row flex-col-reverse">
                <button className="w-[150px] sm:w-[170px] h-[46px] rounded-md py-[10px] px-5 bg-white text-[#111624] font-semibold text-[13px] sm:text-[16px] " onClick={handleShow}>Cancle</button>
                <BorrowButton bookId={bookId} />
            </div>
            <p className="font-normal text-[18px] leading-7 text-[#D6E0FF] hidden sm:block">Keep the pages turning,</p>
            <p className="font-normal text-[18px] leading-7 text-[#D6E0FF] hidden sm:block">The BookWise Team</p>
           </div>
        </div>
        </div>
    )
}