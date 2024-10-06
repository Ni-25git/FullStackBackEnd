import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='bg-black text-white flex justify-center gap-28 p-4 '>
      <Link to='/'>Home</Link>
      <Link to='/products'>Products</Link>
      <Link to='/add-product'>AddProduct</Link>
      <Link to='/login'>Login</Link>
      <Link to='/signup'>Signup</Link>
    </div>
  )
}

export default Navbar
