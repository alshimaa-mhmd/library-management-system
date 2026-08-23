'use client'
import { redirect } from 'next/navigation'
import avatar from "@/images/image.png";
import frame from "@/images/Frame165.png";
import verified from "@/images/Frame.png";
import { createClients } from '@/utils/supabase/server'
import Image from 'next/image';
import BorrowedBook from '@/components/BorrowedBook';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useEffect, useState, useContext } from 'react';
import BookContext from '@/contexts/BookContext';

export default function Profile() {
  // const supabase = await createClients()

  // const { data: user, error } = await supabase.auth.getUser()
  // if (error || !user?.user) {
  //   redirect('/login')
  // }  
  //   const { data: profile,  } = await supabase
  //     .from("profiles")
  //     .select("*")
  //     .eq("id", user.user.id)
  //     .single();
  
  //   if (error) {
  //     console.error("Error fetching profile:", error);
  //     return null;
  //   }
  
  //   // console.log(profile);

  //   const { data : borrowedBooks } = await supabase
  //      .from('borrowed_books')
  //      .select('id, borrowed_at, due_date, books(id, title, category, cover_url, cover_color)')
  //      .eq('user_id', user.user.id)
  //     //  .order('borrowed_at', { ascending: false }); // Order by latest borrowed books

  // //  if (error) {
  // //      console.error('Error fetching borrowed books:', error);
  // //      return [];
  // //  }
  // const [user, setUser] = useState(null);
  const { BooksData, borrowedBooks, setBorrowedBooks } = useContext(BookContext);
  // const [borrowedBooks, setBorrowedBooks] = useState(function(){
  //   const storedBooks = localStorage.getItem('borrowedBooks') ;
  //   // return JSON.parse(storedBooks) || [];
  // })
  const storedUser = localStorage.getItem('user');
  const user = JSON.parse(storedUser);
  // useEffect(() => {
  //   // const storedUser = localStorage.getItem('user');
  //   // if (storedUser) {
  //   //   // setUser(JSON.parse(storedUser));
  //   // }
  //   setBorrowedBooks(function(){
  //   const storedBooks = localStorage.getItem('borrowedBooks') ;
  //   if (!storedBooks) {
  //     return [];
  //   }else{
  //   return JSON.parse(storedBooks);
  //   }
  // });
  // }, [setBorrowedBooks]);

  return (
  // <p>Hello {data.user.email}</p>
  <ProtectedRoute>
   {/* <p>Hello {data.user.email}</p> */}
    <div className="flex flex-wrap md:flex-nowrap items-start justify-normal md:justify-center p-5 sm:p-12 gap-12">
      {/* left hand side */} 
      <div className='bg-gradient-to-b from-[#232839] to-[#12141D] flex flex-col items-start justify-center gap-4 w-full sm:w-[500px] h-[600px] sm:h-[500px] rounded-3xl p-5 sm:p-[40px]'>
        <Image src={frame} alt={frame} className='relative left-[-4px] bottom-[60px]'/>
        <div className='flex sm:flex-row flex-col items-start sm:items-center justify-normal sm:justify-center gap-4'>
          <Image src={avatar} width={100} height={106} alt='avatar' />
          <div className="flex flex-col items-start justify-normal gap-2">
            <div className='flex w-full gap-2'>
              <Image src={verified} alt='verified' width={16} height={16} />
              <span className='font-normal text-[14px] leading-5 text-[#D6E0FF]'>verified Student</span> 
            </div>
            <p className='font-semibold text-[20px] sm:text-[24px] leading-8 text-wrap'>hello</p>
            <p className='font-normal text-[14px] leading-5 text-[#D6E0FF]'>{user?.name}</p>
          </div>
        </div>
        <span className='font-normal text-[14px] leading-5 text-[#D6E0FF] mt-8'>University</span>
        <p className='font-semibold text-[20px] sm:text-[24px] leading-3'>Pioneer Academy</p>
        <span className='font-normal text-[14px] leading-5 text-[#D6E0FF] mt-8'>Student ID</span>
        <p className='font-semibold text-[20px] sm:text-[24px] leading-8'>{user?.studentIdNum}</p>
      </div>
      {/* right hand side */}
      <div className='flex w-full md:w-1/2 flex-wrap h-auto'>
        <BorrowedBook borrowedBooks = {borrowedBooks} />
      </div>
    </div>
    </ProtectedRoute>
  )
}