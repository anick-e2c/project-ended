import React, { useState } from 'react'
import assets from '../assets/assets1'

const Login = () => {
  const [currState, setCurrState] = useState("Sign In");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [isDataSubmited, setIsDataSubmited] = useState(false);

  const onSubmitHandler = (event)=>{
    event.preventDefault();

    if(currState === "Sign up" && !isDataSubmited){
      setIsDataSubmited(true);
      return;
    }
  }

  return (
    <div className='min-h-screen bg-cover bg-center flex items-center justify-center gap-8 
      sm:justify-evenly max-sm:flex-col backdrop-blur-2xl'>

        {/*---------------left-element---------------*/}
        <img src={assets.logo_big} alt="" className='w-[min(30vw,250px)]' />

        {/*---------------right-element---------------*/}
        <form onSubmit={onSubmitHandler} className='border-2 bg-white/8 text-white border-gray-500 p-6
          flex flex-col gap-6 rounded-lg shodow-lg '> 
          <h2 className='font-medium text-2xl flex justify-between items-center'>
            {currState}
            {isDataSubmited && <img  onClick={()=>setIsDataSubmited(false)} src={assets.arrow_icon} alt=""
              className='w-5 cursor-pointer' />
            }
            
          </h2>

          {currState ==="Sign up" && !isDataSubmited && (
            <input  onChange={(e)=> setFullName(e.target.value)} value={fullName}
              type="text" className='p-2 border border-gray-500 rounded-md
              focus:outline-none focus:ring-2 focus:ring-indigo-500' placeholder='Full Name' required/>

          )}

          {!isDataSubmited && (
            <>
              <input onChange={(e)=> setEmail(e.target.value)} value={email}
                type='email' placeholder='Email Adress...' required className='
                p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
              />
              <input onChange={(e)=> setPassword(e.target.value)} value={password}
                type='password' placeholder='Password...' required className='
                p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
              />
              
            </>
          )}

          {currState ==="Sign up" && isDataSubmited &&(
            <textarea onChange={(e)=>setBio(e.target.value)} value={bio}
              role={4} className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2
             focus:ring-indigo-500' placeholder='provide a short bio... '></textarea>
          )}

          <button type='submit' className='py-3 bg-gradient-to-l from-purple-400 to-violet-600
           text-white rounded-md cursor-pointer'>
            {currState === "Sign up" ? "Create Account" : "Login Now"}
          </button>

          <div className='flex items-center gap-2 text-sm text-gray-500'>
            <input type="checkbox"/>
            <p>Agree to the terms of use & privacy policy?</p>
          </div>

          <div className='flex flex-col gap-2'>
            {currState === 'Sign up' ? (
              <p className='text-sm text-gray-600'>Already have an accout? 
                <span onClick={()=>{setCurrState("Login"); setIsDataSubmited(false)}}
                  className='font-medium text-violet-500 cursor-pointer'> Login here</span>
              </p>
            ) : (
              <p className='text-sm text-gray-600'>Create an account  
                <span onClick={()=>{setCurrState("Sign up"); setIsDataSubmited(false)}}
                  className='font-medium text-violet-500 cursor-pointer'> Click here</span>
              </p>
            ) }
          </div>
        </form>

    </div>
  )
}

export default Login