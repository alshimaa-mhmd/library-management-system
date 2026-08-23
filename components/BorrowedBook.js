
import book from '@/images/book.png'
import warning from '@/images/warning2.png'
import due from '@/images/Frame(2).png'
import Image from 'next/image'
export default function BorrowedBook({borrowedBooks}){
    const getCurrentDate = () => {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const date = new Date();
    
        const month = months[date.getMonth()]; // Get the month abbreviation
        const day = String(date.getDate()).padStart(2, '0'); // Ensure day is two digits
        const year = date.getFullYear(); // Get the full year
    
        return `${month} ${day}, ${year}`;
    }
    const getDueDate = ()=>{
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const date = new Date();
        date.setDate(date.getDate() + 4); // Add 4 days for due date
        const month = months[date.getMonth()]; // Get the month abbreviation
        const day = String(date.getDate()).padStart(2, '0'); // Ensure day is two digits
        const year = date.getFullYear(); // Get the full year

        return `${month} ${day}, ${year}`;
    }
    const isDue =  borrowedBooks?.due_date == getCurrentDate();
    // console.log(getCurrentDate())
    // console.log(borrowedBooks.borrowed_at)
    // console.log(isDue)
    return (
        <div className="flex flex-col items-start justify-normal md:justify-center gap-8">
            <h2 className="font-semibold text-[20px] sm:text-[30px] leading-7 text-[#D6E0FF] mb-8">Borrowed book</h2>
            { borrowedBooks?.length === 0 ?  ( <div className='text-red-300 gap-2 flex'><Image src={warning} alt='warning' className='w-6 h-6'/> No borrowed books</div> ) : (
            <div className="flex flex-wrap gap-6 w-full items-start justify-normal">
            { borrowedBooks?.slice().reverse().map((borrowedBook) => (
            <div key={borrowedBook?.bookId} className="h-[490px] w-[280px]  rounded-[16px] p-5 bg-[#12141D] flex flex-col items-start justify-between">
                <div className="w-full flex items-center justify-center h-[247px] rounded-[16px] bg-opacity-60 " 
                // style={{ backgroundColor: borrowedBook.books.cover_color,

                //  }}
                >
                    <div className={`backdrop-blur-2xl w-full h-full flex items-center justify-center relative z-10 bg-opacity-20`}>
                    <img src={borrowedBook?.coverUrl} alt='book cover' className="w-[160px] h-[200px]" />
                    </div>
                </div>
                <p className="text-wrap text-[20px] font-semibold leading-6">{borrowedBook?.title}</p>
                <i className="text-[16px] font-[400] leading-5 text-[#D6E0FF]">{borrowedBook?.category}</i>
                <div className='flex items-center justify-center gap-1'>
                    <Image src={book} alt='book icon'  />
                    <p className="text-[16px] font-[400] leading-6 text-[#D6E0FF]">Borrowed on <span className='text-[#EED1AC]'>{getCurrentDate()}</span> </p>
                </div>
                <div className='flex items-center justify-center gap-1'>
                    {isDue ? <div className='text-red-300 gap-2 flex'><Image src={warning} alt='warning' className='w-6 h-6'/>Overdue Return</div> : 
                    <div className=' gap-1 flex'>
                    <Image src={due} alt='book icon'  />
                    <p className="text-[16px] font-[400]  text-[#D6E0FF]">Due date <span className='text-[#EED1AC]'>{getDueDate()}</span> </p>
                    </div>
            }
                </div>
            </div>
            )
            // console.log(borrowedBook)
            )}
            </div>
            )}
        </div>

        )
}