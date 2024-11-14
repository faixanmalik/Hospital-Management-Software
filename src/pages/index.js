import Head from "next/head";
import HomePage from "./homePage";

export default function Home({ user, logout }) {
  return (
   <main className='w-full'>

    <Head>
      <link rel="icon" href="/logo/favicon.png" sizes="any" type="image/x-icon" />
    </Head>

    <HomePage user={user} logout={logout}/>

   </main>
  )
}
