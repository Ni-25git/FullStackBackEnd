import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Signup from './Signup'
import Products from './Products'
import AddProduct from './AddProduct'
import Login from './Login'
import PrivateRoutes from './PrivateRoutes'

const AllRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path='/add-product' element={ <PrivateRoutes> <AddProduct /> </PrivateRoutes>  }/>
        <Route path='/login' element={  <Login/>} />
        <Route path='/signup' element={<Signup />} />
    </Routes>
  )
}

export default AllRoutes
