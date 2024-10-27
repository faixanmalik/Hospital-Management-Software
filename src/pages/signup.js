import { useEffect, useState } from "react";
import Link from 'next/link'
import Header from "@/components/Header";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import withAuth from "@/middleware/withAuth";
import { useRouter } from "next/router";


const Signup = () => {

  const router = useRouter();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmpassword, setConfirmpassword] = useState('')


  const handleChange = (e) => {
    if (e.target.name === 'email') {
      setEmail(e.target.value)
    }
    else if (e.target.name === 'password') {
      setPassword(e.target.value)
    }
    else if (e.target.name === 'confirmpassword') {
      setConfirmpassword(e.target.value)
    }
  }

  const submit = async (e) => {
    e.preventDefault()
    

    // fetch the data from form to makes a file in local system
    const data = { email, password, confirmpassword };
    if( password !== confirmpassword ){
      document.getElementById('checkPassword').innerHTML = "Your Password is not Match!"
    }
    else{
      document.getElementById('checkPassword').innerHTML = ""
      let res = await fetch(`/api/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      let response = await res.json();
      if (response.success === true) {
        setEmail('')
        setPassword('')
        setConfirmpassword('')
        toast.success(response.message , { position: "top-right", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });
        setTimeout(() => {
          router.push('/login');
        }, 1000);
      }
      else{
        toast.error('Internal Server Error' , { position: "top-right", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });
      }
      
    }
  }

  


  return (
    <section className="w-full bg-gray-100">

    {/* React tostify */}
    <ToastContainer position="top-right" autoClose={1000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable theme="light"/>
    
    <Header profileSection={false}/>

      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-14">
        <div className="w-full bg-white rounded-lg shadow sm:max-w-lg xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Create an account
          </h1>
          <form className="space-y-4 md:space-y-6" method="POST" onSubmit={submit}>
            <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                <input onChange={handleChange} value={email} type="email" name="email" id="email" className="bg-[#f7f7f7] border border-[#245c70] focus:ring-[#245c70] focus:border-[#245c70] text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" placeholder="name@company.com" required=""/>
            </div>
            <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                <input onChange={handleChange} value={password} type="password" name="password" id="password" placeholder="••••••••" className="bg-[#f7f7f7] border border-[#245c70] focus:ring-[#245c70] focus:border-[#245c70] text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 " required=""/>
            </div>
            <div>
                <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900">Confirm password</label>
                <input onChange={handleChange} value={confirmpassword} type="password" name="confirmpassword" id="confirmpassword" placeholder="••••••••" className="bg-[#f7f7f7] border border-[#245c70] focus:ring-[#245c70] focus:border-[#245c70] text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" required=""/>
                <h1 id="checkPassword" className= 'text-sm text-red-600 '></h1>
            </div>
            <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-[#f7f7f7] focus:ring-3 focus:ring-primary-300" required=""/>
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="font-light text-gray-500 ">I accept the <Link className="font-medium text-primary-600 hover:underline" href="#">Terms and Conditions</Link></label>
                </div>
            </div>
            <button type="submit" className="w-full text-white bg-baseColor hover:bg-hoverBaseColor font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create an account</button>
            <p className="text-sm font-light text-gray-500">
                Already have an account? <Link href={'/login'} className="font-medium text-baseColor hover:underline">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
  )
}

export default Signup