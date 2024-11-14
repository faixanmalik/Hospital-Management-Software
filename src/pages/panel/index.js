import Head from "next/head";
import Login from "../login";

export default function Home({  }) {

  return (
    <>

    <Head>
      <link rel="icon" href="/logo/favicon.png" sizes="any" type="image/x-icon" />
    </Head>

    <main className="w-full flex min-h-screen bg-gray-100">
      <Login />
    </main>
    
    </>
  )
}