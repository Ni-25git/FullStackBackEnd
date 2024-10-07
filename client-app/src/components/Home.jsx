import { useEffect, useState } from "react";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">Error: {error}</div>;

  return (
    <div className="max-w-7xl mx-auto mt-10 p-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Products List</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border border-gray-300 rounded-md shadow-md p-4 flex flex-col items-center"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-40 h-40 object-cover mb-4"
            />
            <h2 className="text-lg font-semibold mb-2 text-center">{product.title}</h2>
            <p className="text-gray-600 font-medium">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
