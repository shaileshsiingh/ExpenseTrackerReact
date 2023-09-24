import React, { useState, useEffect } from 'react';

const Expense = () => {
  const [id, setId] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [item, setItem] = useState('');
  const [category, setCategory] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(storedProducts);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (id && price && item && category) {
      const newProduct = {
        id,
        price,
        description,
        item,
        category,
      };
      const updatedProducts = [...products, newProduct];
      localStorage.setItem('products', JSON.stringify(updatedProducts));
      setProducts(updatedProducts);
      setId('');
      setPrice('');
      setDescription('');
      setItem('');
      setCategory('');
    }
  };

  const handleDelete = (productId) => {
    const updatedProducts = products.filter((product) => product.id !== productId);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="id">ID:</label>
        <input type="number" id="id" name="id" required value={id} onChange={(e) => setId(e.target.value)} />

        <label htmlFor="price">Price:</label>
        <input type="number" id="price" name="price" required value={price} onChange={(e) => setPrice(e.target.value)} />

        <label htmlFor="description">Description:</label>
        <input type="text" id="description" name="description" required value={description} onChange={(e) => setDescription(e.target.value)} />

        <label htmlFor="item">Item:</label>
        <input type="text" id="item" name="item" required value={item} onChange={(e) => setItem(e.target.value)} />

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

      <h3>Electronics</h3>
      <ul>
        {products.map((product) => {
          if (product.category === 'Electronics') {
            return (
              <li key={product.id}>
                ID: {product.id} - Rs{product.price} - {product.description} - {product.item}
                <button className="delete-btn" onClick={() => handleDelete(product.id)}>
                  Delete
                </button>
              </li>
            );
          }
          return null;
        })}
      </ul>

      <h3>Food</h3>
      <ul>
        {products.map((product) => {
          if (product.category === 'Food') {
            return (
              <li key={product.id}>
                ID: {product.id} - Rs{product.price} - {product.description} - {product.item}
                <button className="delete-btn" onClick={() => handleDelete(product.id)}>
                  Delete
                </button>
              </li>
            );
          }
          return null;
        })}
      </ul>

      <h3>Skincare</h3>
      <ul>
        {products.map((product) => {
          if (product.category === 'Skincare') {
            return (
              <li key={product.id}>
                ID: {product.id} - Rs{product.price} - {product.description} - {product.item}
                <button className="delete-btn" onClick={() => handleDelete(product.id)}>
                  Delete
                </button>
              </li>
            );
          }
          return null;
        })}
      </ul>
    </div>
  );
};

export default Expense;
