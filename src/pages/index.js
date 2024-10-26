import HomePage from "./homePage";

export default function Home({ user, logout }) {
  return (
   <main className='w-full'>

    <HomePage user={user} logout={logout}/>

   </main>
  )
}
