import { redirect } from 'next/navigation'
import { createClients } from '@/utils/supabase/server'

 export default async function borrow( book ){
    setBorrowedBooks((prev) => {
    const updated = [...prev, book];
    localStorage.setItem("borrowedBooks", JSON.stringify(updated));
    return updated;
  });
    // const getCurrentDate = () => {
    //     const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    //     const date = new Date();
    
    //     const month = months[date.getMonth()]; // Get the month abbreviation
    //     const day = String(date.getDate()).padStart(2, '0'); // Ensure day is two digits
    //     const year = date.getFullYear(); // Get the full year
    
    //     return `${month} ${day}, ${year}`;
    // }
    
    // const getFutureDate = () => {
    //     const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    //     const date = new Date();
        
    //     date.setDate(date.getDate() + 4); // Add 4 days
    
    //     const month = months[date.getMonth()];
    //     const day = String(date.getDate()).padStart(2, '0');
    //     const year = date.getFullYear();
    
    //     return `${month} ${day}, ${year}`;
    // };
    // const supabase = await createClients()

    // const { data: user, error } = await supabase.auth.getUser()
    // if (error || !user?.user) {
    //     redirect('/login')
    // } 

    // const { data : added, error : inserError } = await supabase
    //     .from('borrowed_books')
    //     .insert([
    //         {  
    //           borrowed_at: getCurrentDate(), 
    //           due_date: getFutureDate(),
    //           book_id: bookId,
    //           user_id: user.user.id,
    //          }
    //     ])
    //     .select('*')
    //     console.log(inserError);
    //     redirect('/profile')


 }