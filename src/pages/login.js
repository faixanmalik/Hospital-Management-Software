import { useEffect, useState } from "react";
import Link from 'next/link'
import Header from "@/components/Header";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";


const Login = () => {

  const router = useRouter();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleChange = (e) => {

    if ( e.target.name === 'email') {
      setEmail(e.target.value)
    }
    else if (e.target.name === 'password') {
      setPassword(e.target.value)
    }
  }


  const submit = async (e) => {
    e.preventDefault()

    // fetch the data from form to makes a file in local system
    const data = { email, password };

      let res = await fetch(`/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    let response = await res.json()

    if (response.success === true) {
      toast.success(response.message , { position: "top-right", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });
      localStorage.setItem('myUser', JSON.stringify({token: response.token, email: response.email}))

      if(response.userType === 'Admin'){
        setTimeout(() => {
          router.push(`/panel/hospitals`);
        }, 1500);
      }
      else{
        setTimeout(() => {
          router.push(`/`);
        }, 1500);
      }
    }
    else{
      toast.error(response.message , { position: "top-right", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });
    }
        
  }

  


  return (
    <section className="w-full bg-[#f7f7f7]">
      {/* React tostify */}
      <ToastContainer position="top-right" autoClose={1000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable theme="light"/>

      <Header profileSection={false}/>

      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow sm:max-w-lg xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" method='POST' onSubmit={submit}>
              <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                  <input onChange={handleChange} value={email} type="email" name="email" id="email" className="bg-[#f7f7f7] border border-[#245c70] focus:ring-[#245c70] focus:border-[#245c70] text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" placeholder="name@company.com" required=""/>
              </div>
              <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                  <input onChange={handleChange} value={password} type="password" name="password" id="password" placeholder="••••••••" className="bg-[#f7f7f7] border border-[#245c70] focus:ring-[#245c70] focus:border-[#245c70] text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 " required=""/>
              </div>
              <div className="flex items-center justify-between">
                  <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300" required=""/>
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="remember" className="text-gray-500">Remember me</label>
                      </div>
                  </div>
                  <Link href={'forgot'} className="text-sm font-medium text-baseColor hover:underline">Forgot password?</Link>
              </div>
              <button type="submit" className="w-full text-white bg-baseColor hover:bg-hoverBaseColor font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign in</button>
              <p className="text-sm font-light text-gray-500 ">
                  Don’t have an account yet? <Link href={'/signup'} className="font-medium text-baseColor hover:underline">Sign up</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login