'use client'
import BorrowButton from "@/components/borrowButton";
import ReceiptButton from "@/components/receiptButton";
import { createClients, createServerClients } from "@/utils/supabase/server";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

export default function Book({ params }) {
  // const supabase = await createServerClients();
  // // Use params.book directly
  // const { data: book } = await supabase
  //   .from("books")
  //   .select("*")
  //   .eq("id", params.book);
  //   const serializedData = JSON.parse(JSON.stringify(book));
  //   let { data: covers, error } = await supabase
  //   .from('books')
  //   .select('cover_url')
  //   .eq('category', book[0].category);

  //      const supabaseClient = await createClients()
  //       // console.log(books);
  //       const { data: user } = await supabaseClient.auth.getUser()
  //       // console.log(user);
  //       const { data : borrowedBooks } = await supabaseClient
  //       .from('borrowed_books')
  //       .select('book_id')
  //       .eq('user_id', user.user.id)

  //       const { data: profile,  } = await supabase
  //       .from("profiles")
  //       .select("*")
  //       .eq("id", user.user.id)
  //       .single();
    
  //       const bookToFind = { book_id: book[0]?.id};
    
  //       const borrowed = borrowedBooks.some(item => item.book_id === bookToFind. book_id);
  const [book, setBook] = useState([]);
  const [books, setBooks] = useState([]);
    const [isloading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user, token, authLoading } = useAuth();
     const router = useRouter();
        // const response = await fetch(`http://192.168.x.x:7119/api/Book/${params.book}`);
        // const book = await response.json();
        // // const data = await fetch(`http://192.168.x.x:7119/api/Book`);
        // const books = await data.json();

         useEffect(() => {
            const fetchBooks = async () => {
              if (!token) return;
              try {
                setIsLoading(true);
                
                const response = await fetch(`https://librarysystem.runasp.net/api/Book/${params.book}`, {
                  headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                  },
                });
                
                 const res = await fetch('https://librarysystem.runasp.net/api/Book', {
                  headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                  },
                });
        
                if (!response.ok) {
                  throw new Error('Failed to fetch books');
                }
        
                const data = await response.json();
                setBook(data);

                const BooksData = await res.json();
                setBooks(BooksData);
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

          //    useEffect(() => {
          //   const fetchBooks = async () => {                
          //       const response = await fetch(`https://librarysystem.runasp.net/api/Book`, {
          //         headers: {
          //           'Authorization': `Bearer ${token}`,
          //           'Content-Type': 'application/json',
          //         },
          //       });
             
        
          //       if (!response.ok) {
          //         throw new Error('Failed to fetch books');
          //       }
        
          //       const data = await response.json();
          //       setBooks(data);
          //       setError(null);
              
          //   };
        
          //   if (token) {
          //     fetchBooks();
          //   }
          // }, [token]);

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

      
    
        
    
    return(
         <>
         <ProtectedRoute>
            <div className="flex flex-wrap items-start justify-start lg:justify-center gap-8 lg:gap-12 my-8 p-8 sm:p-12 lg-p-8">
                <div className='flex flex-col items-start justify-between w-[90%] lg:w-[60%] gap-12'>
                  <h2 className="font-[600] text-[26px] sm:text-[52px] text-white">{book.title}</h2>
                  <div className="flex flex-wrap items-start justify-normal gap-4 w-full sm:w-[70%]">
                    <p className="font-[400] text-[16px] sm:text-[20px] leading-7 text-[#D6E0FF]">By <span className="font-[600]  leading-7 text-[#EED1AC]">{book.author}</span></p>
                    <p className="font-[400] text-[16px] sm:text-[20px] leading-7 text-[#D6E0FF]">category: <span className="font-[600] leading-7 text-[#EED1AC]">{book.genre}</span></p>
                    <p className="font-[400] text-[16px] sm:text-[20px] leading-7 text-[#D6E0FF]">rating: <span className="font-[600] leading-7 text-[#EED1AC]">{book.rating}</span></p>
                    <p className="font-[400] text-[16px] sm:text-[20px] leading-7 text-[#D6E0FF]">Total books: <span className="font-[600] leading-7 text-[#EED1AC]">{book.totalCopies}</span></p>
                    <p className="font-[400] text-[16px] sm:text-[20px] leading-7 text-[#D6E0FF]">Available books: <span className="font-[600] leading-7 text-[#EED1AC]">{book.availableCopies}</span></p>
                  </div>
                  <p className="font-[400] text-[16px] sm:text-[20px] leading-8 text-[#D6E0FF] w-full lg:w-[80%]">{book.description}</p>
                  {/* <BorrowButton bookId={book[0]?.id} />        */}
                  <ReceiptButton bookId={book?.bookId} borrowed={false} title={book.title} studentName = {"lol"}/>
               </div>

               <div className='flex items-center justify-center lg:w-[276px] w-full my-8' >  
                <div style={{ boxShadow: `0 0px 10px 0px ${book?.coverColor}, 0 0px 25px 0px ${book?.coverColor}` }}>
                  <img src={book.coverUrl} alt='book cover'  className="w-[240px]  sm:w-[276px] h-[300px] sm:h-[384px]" />
                </div>
                </div>
            </div> 
        
            {/* *********** */}
            <div className="flex flex-wrap items-start justify-normal xl:justify-center gap-12 my-20 p-6 sm:p-12 xl:p-8">
                <div className='flex flex-col items-start justify-between w-[90%] xl:w-[55%] gap-12'>
                    <h3 className="font-semibold text-[22px] sm:text-[30px] leading-[30px] text-[#D6E0FF] ">Video</h3>
                    <video width="620" height="340" controls>
                        <source src={book.videoUrl} type="video/mp4" />
                    </video>
                    <h3 className="font-semibold text-[22px] sm:text-[30px] leading-[30px] text-[#D6E0FF] ">Summary</h3>
                    <p className="font-[400] text-[16px] sm:text-[20px] leading-8 text-[#D6E0FF]">{book.summary}</p>
              </div>

              <div className="flex flex-col items-start justify-normal gap-12 w-[90%] xl:w-[40%]">
                    <h3 className="font-semibold text-[22px] sm:text-[30px] leading-[30px] text-[#D6E0FF] ">More similar books</h3>
                    <div className="flex flex-wrap items-start justify-normal gap-4">
                        {books.filter(cover => cover.genre == book.genre).filter( b => b.coverUrl != book.coverUrl).map((bookCover) =>
                         { return(
                          <Link key={bookCover.coverUrl}  href={`/${bookCover.bookId}`}>
                          <img src={bookCover.coverUrl} alt='book cover' className="w-[120px] h-[180px] flex flex-col items-start justify-evenly rounded-lg"/>
                          </Link>
                          )
                          }
                          
                          )}  
                          {/* .filter(cover => cover.cover_url !==  book[0].cover_url) */}
                    </div>
              </div>
            </div>
            </ProtectedRoute>
            </>
    )
}