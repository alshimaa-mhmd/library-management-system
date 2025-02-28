import BorrowButton from "@/components/borrowButton";
import ReceiptButton from "@/components/receiptButton";
import { createClients, createServerClients } from "@/utils/supabase/server";
import Link from "next/link";

export default async function Book({ params }) {
  const supabase = await createServerClients();
  // Use params.book directly
  const { data: book } = await supabase
    .from("books")
    .select("*")
    .eq("id", params.book);
    const serializedData = JSON.parse(JSON.stringify(book));
    let { data: covers, error } = await supabase
    .from('books')
    .select('cover_url')
    .eq('category', book[0].category);

       const supabaseClient = await createClients()
        // console.log(books);
        const { data: user } = await supabaseClient.auth.getUser()
        // console.log(user);
        const { data : borrowedBooks } = await supabaseClient
        .from('borrowed_books')
        .select('book_id')
        .eq('user_id', user.user.id)

        const { data: profile,  } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.user.id)
        .single();
    
        const bookToFind = { book_id: book[0]?.id};
    
        const borrowed = borrowedBooks.some(item => item.book_id === bookToFind. book_id);

    return(
         <>
            <div className="flex flex-wrap items-start justify-start lg:justify-center gap-8 lg:gap-12 my-8 p-8 sm:p-12 lg-p-8">
                <div className='flex flex-col items-start justify-between w-[90%] lg:w-[60%] gap-12'>
                  <h2 className="font-[600] text-[26px] sm:text-[52px] text-white">{book[0].title}</h2>
                  <div className="flex flex-wrap items-start justify-normal gap-4 w-full sm:w-[70%]">
                    <p className="font-[400] text-[16px] sm:text-[20px] leading-7 text-[#D6E0FF]">By <span className="font-[600]  leading-7 text-[#EED1AC]">{book[0].author}</span></p>
                    <p className="font-[400] text-[16px] sm:text-[20px] leading-7 text-[#D6E0FF]">category: <span className="font-[600] leading-7 text-[#EED1AC]">{book[0].category}</span></p>
                    <p className="font-[400] text-[16px] sm:text-[20px] leading-7 text-[#D6E0FF]">rating: <span className="font-[600] leading-7 text-[#EED1AC]">{book[0].rating}</span></p>
                    <p className="font-[400] text-[16px] sm:text-[20px] leading-7 text-[#D6E0FF]">Total books: <span className="font-[600] leading-7 text-[#EED1AC]">{book[0].total_copies}</span></p>
                    <p className="font-[400] text-[16px] sm:text-[20px] leading-7 text-[#D6E0FF]">Available books: <span className="font-[600] leading-7 text-[#EED1AC]">{book[0].available_copies}</span></p>
                  </div>
                  <p className="font-[400] text-[16px] sm:text-[20px] leading-8 text-[#D6E0FF] w-full lg:w-[80%]">{book[0].description}</p>
                  {/* <BorrowButton bookId={book[0]?.id} />        */}
                  <ReceiptButton bookId={book[0]?.id} borrowed={borrowed} title={book[0].title} studentName = {profile.full_name}/>
               </div>

               <div className='flex items-center justify-center lg:w-[276px] w-full my-8' >  
                <div style={{ boxShadow: `0 0px 10px 0px ${book[0]?.cover_color}, 0 0px 25px 0px ${book[0]?.cover_color}` }}>
                  <img src={book[0].cover_url} alt='book cover'  className="w-[240px]  sm:w-[276px] h-[300px] sm:h-[384px]" />
                </div>
                </div>
            </div> 
        
            {/* *********** */}
            <div className="flex flex-wrap items-start justify-normal xl:justify-center gap-12 my-20 p-6 sm:p-12 xl:p-8">
                <div className='flex flex-col items-start justify-between w-[90%] xl:w-[55%] gap-12'>
                    <h3 className="font-semibold text-[22px] sm:text-[30px] leading-[30px] text-[#D6E0FF] ">Video</h3>
                    <video width="620" height="340" controls>
                        <source src={book[0].video_url} type="video/mp4" />
                    </video>
                    <h3 className="font-semibold text-[22px] sm:text-[30px] leading-[30px] text-[#D6E0FF] ">Summary</h3>
                    <p className="font-[400] text-[16px] sm:text-[20px] leading-8 text-[#D6E0FF]">{book[0].summary}</p>
              </div>

              <div className="flex flex-col items-start justify-normal gap-12 w-[90%] xl:w-[40%]">
                    <h3 className="font-semibold text-[22px] sm:text-[30px] leading-[30px] text-[#D6E0FF] ">More similar books</h3>
                    <div className="flex flex-wrap items-start justify-normal gap-4">
                        {covers.filter(cover => cover.cover_url !==  book[0].cover_url).map((cover) =>
                          <img src={cover.cover_url} alt='book cover' className="w-[120px] h-[180px] flex flex-col items-start justify-evenly rounded-lg" key={cover.cover_url} />
                          
                          
                          )}  
                    </div>
              </div>
            </div>
            </>
    )
}