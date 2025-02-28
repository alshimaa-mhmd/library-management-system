import Image from "next/image";
import bookImg from "@/images/Frame (1).png";
import { createClients, createServerClients } from '@/utils/supabase/server';
import  borrow  from "@/utils/supabase/borrowBook";
import Books from "@/components/Books";
import BorrowButton from "@/components/borrowButton";
import Receipt from "@/components/receipt";
import ReceiptButton from "@/components/receiptButton";
import Footer from "@/components/Footer";


export default async function Home() {
  
    const supabase = await createServerClients();
    const supabaseClient = await createClients()
    const { data: books } = await supabase.from("books").select('*');

    const { data: user } = await supabaseClient.auth.getUser()

    const { data : borrowedBooks } = await supabaseClient
    .from('borrowed_books')
    .select('book_id')
    .eq('user_id', user.user.id)

    const { data: profile,  } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.user.id)
    .single();

    const bookToFind = { book_id: books[0]?.id};

    const borrowed = borrowedBooks.some(item => item.book_id === bookToFind. book_id);
    
  return (
    <>
    <div className="flex flex-wrap items-start justify-start lg:justify-center gap-8 lg:gap-12 my-8 p-8 sm:p-12 lg-p-8">
        <div className='flex flex-col items-start justify-between w-[90%] lg:w-[60%] gap-12'>
          <h2 className="font-[600] text-[36px] sm:text-[52px] text-white">{books[0].title}</h2>
          <div className="flex flex-wrap items-start justify-normal gap-4 w-full sm:w-[70%]">
            <p className="font-[400] text-[16px] sm:text-[20px] leading-7 text-[#D6E0FF]">By <span className="font-[600] leading-7 text-[#EED1AC]">{books[0].author}</span></p>
            <p className="font-[400] text-[16px] sm:text-[20px] leading-7 text-[#D6E0FF]">category: <span className="font-[600] leading-7 text-[#EED1AC]">{books[0].category}</span></p>
            <p className="font-[400] text-[16px] sm:text-[20px] leading-7 text-[#D6E0FF]">rating: <span className="font-[600]  leading-7 text-[#EED1AC]">{books[0].rating}</span></p>
            <p className="font-[400] text-[16px] sm:text-[20px] leading-7 text-[#D6E0FF]">Total books: <span className="font-[600]  leading-7 text-[#EED1AC]">{books[0].total_copies}</span></p>
            <p className="font-[400] text-[16px] sm:text-[20px] leading-7 text-[#D6E0FF]">Available books: <span className="font-[600] leading-7 text-[#EED1AC]">{books[0].available_copies}</span></p>
          </div>
          <p className="font-[400] text-[16px] sm:text-[20px] leading-8 text-[#D6E0FF] w-full lg:w-[80%]">{books[0].description}</p>
          
          {/* <BorrowButton bookId={books[0]?.id} /> */}
          <ReceiptButton bookId={books[0]?.id} borrowed = {borrowed} title={books[0].title} studentName = {profile.full_name} />
 
        </div>
        <div className='flex items-center justify-center lg:w-[276px] w-full my-8' >
          <div style={{ boxShadow: `0 0px 10px 0px ${books[0]?.cover_color}, 0 0px 25px 0px ${books[0]?.cover_color}` }}>
            <img src={books[0].cover_url} alt='book cover' className="w-[240px]  sm:w-[276px] h-[300px] sm:h-[384px]" />
          </div>
        </div>
    </div>

    {/* popular  books */}

    <div className="flex flex-col items-start justify-between gap-8 p-12">
      <h3 className="font-semibold text-[30px] leading-[30px] text-[#D6E0FF] my-8">Popular Books</h3>
      <div className="flex flex-wrap items-start justify-normal gap-6">
         {books.map((book) => <Books key={book.id} book={book} />)}  
      </div>
    </div>
    <Footer />

    </>
  );
}
