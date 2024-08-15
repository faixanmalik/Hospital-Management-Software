import Link from "next/link";

export default function Home() {
  return (
   <main className='w-full'>

      <Link
        href={'/panel'}
        className="mt-2 bg-baseColor hover:bg-hoverBaseColor flex justify-center items-center px-5 py-2 text-sm font-semibold text-cardColor border-none rounded-md"
      >
        Go to Panel
      </Link>


   </main>
  )
}
