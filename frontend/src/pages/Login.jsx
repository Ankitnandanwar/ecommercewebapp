import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {

  const [currentState, setCurrentState] = useState('Login')
  const {token, setToken, navigate, backendUrl} = useContext(ShopContext)

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');


  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      if(currentState === 'Sign Up'){
        const res = await axios.post(backendUrl + '/api/user/register', {name, email, password})
        if(res.data.success){
          setToken(res.data.token)
          localStorage.setItem('token', res.data.token)
        }else{
          toast.error(res.data.message)
        }
      }else{
        const res = await axios.post(backendUrl + '/api/user/login', {email, password})
        if(res.data.success){
          setToken(res.data.token)
          localStorage.setItem('token', res.data.token)
        }else{
          toast.error(res.data.message)
        }
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }


  useEffect(() => {
    if(token){
      navigate('/')
    }
  }, [token])
  

  
  

  return (
    <form onSubmit={handleSubmit} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl '>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>

      {currentState === 'Login' ? '' : <input onChange={(e)=>setName(e.target.value)} value={name} type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Name' required />}
      <input type="email" onChange={(e)=>setEmail(e.target.value)} value={email} className='w-full px-3 py-2 border border-gray-800' placeholder='Email' required />
      <input type="password" onChange={(e)=>setPassword(e.target.value)} value={password} className='w-full px-3 py-2 border border-gray-800' placeholder='Password' required />

      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer'>Forgot your password?</p>
        {
          currentState === 'Login' ?
            <p onClick={() => setCurrentState('Sign Up')} className='cursor-pointer'>Create Account</p> :
            <p onClick={() => setCurrentState('Login')} className='cursor-pointer'>Login Here</p>
        }
      </div>

      <button className='bg-black text-white font-light px-8 py-2 mt-4'>{currentState === 'Login' ? 'Sign In' : 'Sign Up'}</button>

    </form>
  )
}

export default Login