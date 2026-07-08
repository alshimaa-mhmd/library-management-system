'use client'
import Image from "next/image";
import bookImg from "@/images/Frame(1).png";
import { createClients, createServerClients } from '@/utils/supabase/server';
import  borrow  from "@/utils/supabase/borrowBook";
import Books from "@/components/Books";
import BorrowButton from "@/components/borrowButton";
import Receipt from "@/components/receipt";
import ReceiptButton from "@/components/receiptButton";
import Footer from "@/components/Footer";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

export default function Home() {
  
    // const supabase = await createServerClients();
    // const supabaseClient = await createClients()
    // const { data: books } = await supabase.from("books").select('*');

    // const { data: user } = await supabaseClient.auth.getUser()

    // const { data : borrowedBooks } = await supabaseClient
    // .from('borrowed_books')
    // .select('book_id')
    // .eq('user_id', user.user.id)

    // const { data: profile,  } = await supabase
    // .from("profiles")
    // .select("*")
    // .eq("id", user.user.id)
    // .single();

    // const bookToFind = { book_id: books[0]?.id};

    // const borrowed = borrowedBooks.some(item => item.book_id === bookToFind. book_id);

 const [data, setData] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, token, authLoading } = useAuth();
   const router = useRouter();

     useEffect(() => {
    if (!authLoading && !token) {
      router.push('/login');
    }
  }, [token, authLoading, router]);

  useEffect(() => {
    const fetchBooks = async () => {
      if (!token) return;
      try {
        setIsLoading(true);
        
        const response = await fetch('https://librarysystem.runasp.net/api/Book', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch books');
        }

        const books = await response.json();
        setData(books);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      fetchBooks();
    }
  }, [token]);
   if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (isloading) {
    return <div className="p-8 text-center">Loading books...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-600">Error: {error}</div>;
  }
        // console.log(data);

  return (
    <>
    <ProtectedRoute>
    <div className="flex flex-wrap items-start justify-start lg:justify-center gap-8 lg:gap-12 my-8 p-8 sm:p-12 lg-p-8">
        <div className='flex flex-col items-start justify-between w-[90%] lg:w-[60%] gap-12'>
          <h2 className="font-[600] text-[36px] sm:text-[52px] text-white"> {data[0].title}</h2>
          <div className="flex flex-wrap items-start justify-normal gap-4 w-full sm:w-[70%]">
            <p className="font-[400] text-[16px] sm:text-[20px] leading-7 text-[#D6E0FF]">By <span className="font-[600] leading-7 text-[#EED1AC]">{data[0].author}</span></p>
            <p className="font-[400] text-[16px] sm:text-[20px] leading-7 text-[#D6E0FF]">category: <span className="font-[600] leading-7 text-[#EED1AC]">{data[0].genre}</span></p>
            <p className="font-[400] text-[16px] sm:text-[20px] leading-7 text-[#D6E0FF]">rating: <span className="font-[600]  leading-7 text-[#EED1AC]">{data[0].rating}</span></p>
            <p className="font-[400] text-[16px] sm:text-[20px] leading-7 text-[#D6E0FF]">Total books: <span className="font-[600]  leading-7 text-[#EED1AC]">{data[0].totalCopies}</span></p>
            <p className="font-[400] text-[16px] sm:text-[20px] leading-7 text-[#D6E0FF]">Available books: <span className="font-[600] leading-7 text-[#EED1AC]">{data[0].availableCopies}</span></p>
          </div>
          <p className="font-[400] text-[16px] sm:text-[20px] leading-8 text-[#D6E0FF] w-full lg:w-[80%]">{data[0].description}</p>
          
          {/* <BorrowButton bookId={data[0]?.bookId} /> */}
          <ReceiptButton bookId={data[0]?.bookId} borrowed = {false} title={data[0]?.title} studentName = {'lol'} />
 
        </div>
        <div className='flex items-center justify-center lg:w-[276px] w-full my-8' >
          <div style={{ boxShadow: `0 0px 10px 0px ${data[0]?.coverColor}, 0 0px 25px 0px ${data[0]?.coverColor}` }}>
            <img src={data[0]?.coverUrl} alt='book cover' className="w-[240px]  sm:w-[276px] h-[300px] sm:h-[384px]" /> 
          </div>
        </div>
    </div>

    {/* popular  books */}

    <div className="flex flex-col items-start justify-between gap-8 p-12">
      <h3 className="font-semibold text-[30px] leading-[30px] text-[#D6E0FF] my-8">Popular Books</h3>
      <div className="flex flex-wrap items-start justify-normal gap-6">
         {data.map((book) => <Books key={book.bookId} book={book} />)}  
      </div>
    </div>
    <Footer />
    </ProtectedRoute>
    </>
  );
}
