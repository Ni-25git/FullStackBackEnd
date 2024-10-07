import React, { useState } from 'react';
import axios from 'axios';
import {Navigate, useNavigate} from "react-router-dom";

const Login = () => {
  const [data, setData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState(null);
  const Navigate = useNavigate()

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  
  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:4500/api/auth/login', data);

      if (response.status === 201) {
      
        localStorage.setItem('userId' , response.data.userId)
        localStorage.setItem('token', response.data.token); 
        alert('You are logged in');
        Navigate('/products')
      }
    } catch (error) {
      setErrorMessage('Login failed. Please check your credentials and try again.');
      console.log(error);
    }
  };

  return (
    <div className='flex flex-col border-1 gap-4 m-auto max-w-[600px] mt-[100px] p-2'>
      <h1 className='text-black font-extrabold text-center text-2xl'>Login Details below</h1>

      
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      <label className='text-black font-extrabold text-lg'>E-Mail</label>
      <input 
        className='h-8' 
        type='email' 
        name='email' 
        value={data.email} 
        placeholder='Enter email here' 
        onChange={(e) => handleChange(e)} 
      />

      <label className='text-black font-extrabold text-lg'>Password</label>
      <input 
        className='h-8' 
        type='password' 
        name='password' 
        value={data.password} 
        placeholder='Enter Password here' 
        onChange={(e) => handleChange(e)} 
      />

      <button className='bg-black text-white p-3' onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
