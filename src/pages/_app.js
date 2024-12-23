import "@/src/styles/globals.css";
import '@/src/styles/scrollbar.css';

// React top loading bar
import LoadingBar from 'react-top-loading-bar'
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }) {


  const router = useRouter();
  //  react top loading bar
  const [progress, setProgress] = useState(0)

  const [userEmail, setUserEmail] = useState('')

  const [user, setUser] = useState({value: null})
  const [key, setKey] = useState(0)


  //  Use Effect for retain same items in shopping Cart
  useEffect(() => {
    
    router.events.on('routeChangeStart', ()=>{
      setProgress(75);
    });
    router.events.on('routeChangeComplete', ()=>{
      setProgress(100);
    }, []);

    let myUser = JSON.parse(localStorage.getItem("myUser"));
    if( myUser ){
      setUser({value: myUser.token , email: myUser.email, name: myUser.name });
      setUserEmail(myUser.email)
      setKey(Math.random());
    }
    
  }, [router.query])


  // Logout function
  const logout = ()=>{
    localStorage.removeItem("myUser");
    setUser({value:null});
    setKey(Math.random());
    router.push(`/login`);
  }
    
  return <>
    <LoadingBar color='#00c0ab' height={3} progress={progress} waitingTime={300} onLoaderFinished={() => setProgress(0)}/>
    <Component userEmail={userEmail} logout={logout} user={user} setUser={setUser} key={key} setKey={setKey} {...pageProps} />
  </>
}
