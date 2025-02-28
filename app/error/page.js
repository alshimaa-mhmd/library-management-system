import Link from "next/link";
import "@/app/globals.css";
export default function ErrorPage({ searchParams }) {
  const message = searchParams?.message || 'An unexpected error occurred.';

  return (
    <div className="flex flex-col items-center justify-center gap-4 text-white w-full h-screen">
      <h1>Error</h1>
      <p>{message}</p>
      <Link href="/sign-up">Go back to Sign-Up</Link>
    </div>
  );
}
