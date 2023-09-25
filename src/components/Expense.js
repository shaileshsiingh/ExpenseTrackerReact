import React, { useState, useEffect } from 'react';

const Expense = () => {
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [item, setItem] = useState('');
  const [category, setCategory] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://newblog-20727-default-rtdb.firebaseio.com/products.json');

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if (data) {
        const productArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setProducts(productArray);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if ( price && item && category) {
      const newProduct = {
        price,
        description,
        item,
        category,
      };

      try {
        const response = await fetch('https://newblog-20727-default-rtdb.firebaseio.com/products.json', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newProduct),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        // Refresh the product list after successful POST
        fetchProducts();

        setPrice('');
        setDescription('');
        setItem('');
        setCategory('');
      } catch (error) {
        console.error('Error posting data:', error);
      }
    }
  };

  const handleDelete = async (productId) => {
    try {
      const response = await fetch(`https://newblog-20727-default-rtdb.firebaseio.com/products/${productId}.json`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Refresh the product list after successful DELETE
      fetchProducts();
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        

        <label htmlFor="price">Price:</label>
        <input type="number" id="price" name="price" required value={price} onChange={(e) => setPrice(e.target.value)} />

        <label htmlFor="item">Item:</label>
        <input type="text" id="item" name="item" required value={item} onChange={(e) => setItem(e.target.value)} />

<label htmlFor="description">Description:</label>
        <input type="text" id="description" name="description" required value={description} onChange={(e) => setDescription(e.target.value)} />


        <label htmlFor="category">Category:</label>
        <select
          id="category"
          name="category"
          required
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select a category</option>
          <option value="Electronics">Electronics</option>
          <option value="Food">Food</option>
          <option value="Skincare">Skincare</option>
        </select>

        <input type="submit" value="Submit" />
      </form>

      <h1>Products</h1>

      <ul>
        {products.map((product) => (
          <li key={product.id}>
             Price: {product.price} - Description: {product.description} - Item: {product.item} - Category: {product.category}
            <button className="delete-btn" onClick={() => handleDelete(product.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Expense;
