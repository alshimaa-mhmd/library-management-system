'use client';

import noBooks from "@/images/noBooks.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import Books from '@/components/Books';
import ProtectedRoute from "@/components/ProtectedRoute";
export default function Search() {
  const [search, setSearch] = useState("");
  const [searchedBooks, setSearchedBooks] = useState([]);
  const [isLoading, setIsLoading ] = useState(false);
 
  function capitalizeFirstLetter(text) {
    if (!text) return ""; // Handle empty or null strings
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }

  const searchedText = search
    .split(" ") // Split the string into an array of words
    .map(word => capitalizeFirstLetter(word)) // Capitalize each word
    .join(" ");

    useEffect(() => {
      if (!searchedText || searchedText.length < 3) {
        setSearchedBooks([]);
        return;
      }
  
      const controller = new AbortController();
      const signal = controller.signal;
  
      const fetchBooks = async () => {
        try {
          setIsLoading(true);
          const res = await fetch(`https://librarysystem.runasp.net/api/Book/search?genre=${encodeURIComponent(searchedText)}`);
  
          if (!res.ok) throw new Error("Error fetching books");
  
            const result = await res.json();
            setSearchedBooks(result);
            console.log("Fetched books:", result); // Log the fetched books for debugging
        } catch (err) {
          if (err.name !== "AbortError") {
            console.error("Fetch error:", err);
          }
        }finally {
          setIsLoading(false); // Always set loading to false after fetch attempt
        }
      };
  
      fetchBooks();

      return () => controller.abort();
    }, [searchedText]);
  

  return (
    <ProtectedRoute>
    <div className="flex flex-col items-center justify-center gap-6 mt-16">
      <div className="text-center w-[300px] sm:w-[580px] md:w-[630px] flex flex-col items-center justify-center gap-8">
        <p className='text-[#D6E0FF] font-semibold text-[14px] sm:text-[18px] leading-7 '>DISCOVER YOUR NEXT GREAT READ:</p>
        <h2 className='text-white font-semibold text-[26px] sm:text-[52px] leading-9 sm:leading-[52px]'>
          Explore And Search For <span className="text-[#FFE1BD] font-semibold leading-7">Any Book</span> In Our Library
        </h2>
        <input
          className='bg-[#232839] h-[68px] w-full p-5 rounded-xl outline-none'
          placeholder="Search by Category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="my-12 w-full flex flex-col items-start justify-center gap-8 p-6 sm:p-12">
        <h3 className="text-[#D6E0FF] font-semibold text-[25px] sm:text-[30px] leading-8 ">Search Result</h3>
        { isLoading && <div className="w-full h-full flex items-center justify-center">
            <div className="flex justify-center items-center gap-2">
            <svg className="mr-3 h-10 w-10 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg><span className="text-white text-[20px]">Loading...</span>
            </div>  
          </div>
          }
        {!isLoading && searchedBooks.length > 0 ? (
                    <div className="flex flex-wrap items-start justify-normal gap-4">
                    {searchedBooks.map((book) => (
                      <Books key={book.bookId} book={book} />
                    ))}
                  </div>
        ) : (


          !isLoading && 
          <div className='flex flex-col gap-4 w-full items-center justify-center'>
            <p className='text-[#D6E0FF] font-normal text-[26px]  leading-9'>No Books Found</p>
            <Image src={noBooks} alt="No Books Found" width={200} height={200} />
            </div>
        )}
      </div>
    </div>
    </ProtectedRoute>
  );
}
