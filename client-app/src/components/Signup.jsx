import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [data, setData] = useState({ username: '', email: '', password: '', role: '' });
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { value, name } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:4500/api/auth/signup', data);
      console.log(response)

      if (response.status === 201) {
        navigate('/login');
        alert('User Signup Successfully');
      }
    } catch (error) {
      setErrorMessage('Signup failed. Please try again.');
      console.log(error);
    }
  };

  return (
    <div className='flex flex-col border gap-4 m-auto max-w-[600px] mt-[100px] p-2'>
      <h1 className='text-black font-extrabold text-center text-2xl'>Signup Details below</h1>
      
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      <label className='text-black font-extrabold text-lg'>Username</label>
      <input
        className='border border-black h-8'
        type='text'
        placeholder='Enter Username'
        value={data.username}
        name='username'
        onChange={(e) => handleChange(e)}
      />

      <label className='text-black font-extrabold text-lg'>E-Mail</label>
      <input
        className='border border-black h-8'
        type='email'
        placeholder='Enter email here'
        value={data.email}
        name='email'
        onChange={(e) => handleChange(e)}
      />

      <label className='text-black font-extrabold text-lg'>Password</label>
      <input
        className='border border-black h-8'
        type='password'
        placeholder='Enter Password here'
        value={data.password}
        name='password'
        onChange={(e) => handleChange(e)}
      />

      <label className='text-black font-extrabold text-lg'>Role</label>
      <select
        className='border border-black h-8'
        value={data.role}
        name='role'
        onChange={(e) => handleChange(e)}
      >
        <option value="" disabled>Select Role</option>
        <option value="admin">Admin</option>
        <option value="seller">Seller</option>
        <option value="buyer">Buyer</option>
      </select>

      <button className='bg-black text-white p-3' onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Signup;
