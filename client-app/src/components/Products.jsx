import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const userId = localStorage.getItem('userId'); // Fetch logged-in user ID

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:4500/api/products/');
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching products.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:4500/api/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(products.filter((product) => product._id !== productId));
    } catch (error) {
      console.error(error);
      alert('Error deleting product');
    }
  };

  return (
    <div className='max-h-[800px] max-w-[600px] m-auto border-slate-300 p-5'>
      <h1 className='font-serif font-bold text-2xl mb-5 text-center'>All Products</h1>

      {loading && <p className='text-center text-red-500'>Loading Page...</p>}
      {error && <p className='text-center text-red-500'>{error}</p>}

      {!loading && !error && products.length > 0 && (
        <div className='overflow-auto max-h-[600px]'>
          <table className='min-w-full table-auto border border-slate-200'>
            <thead>
              <tr className='bg-slate-100'>
                <th className='px-4 py-2 border'>Product Name</th>
                <th className='px-4 py-2 border'>Category</th>
                <th className='px-4 py-2 border'>Brand</th>
                <th className='px-4 py-2 border'>Price</th>
                <th className='px-4 py-2 border'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className='text-center odd:bg-white even:bg-slate-50'>
                  <td className='px-4 py-2 border'>{product.name}</td>
                  <td className='px-4 py-2 border'>{product.category}</td>
                  <td className='px-4 py-2 border'>{product.brand}</td>
                  <td className='px-4 py-2 border'>${product.price}</td>
                  <td className='px-4 py-2 border'>
                    {(product.userID === userId || product.userID?._id === userId) && (
                      <button
                        onClick={() => handleDelete(product._id)}
                        className='bg-red-500 text-white p-2 rounded'
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && !error && products.length === 0 && (
        <p className='text-center'>No products found.</p>
      )}
    </div>
  );
};

export default Products;
