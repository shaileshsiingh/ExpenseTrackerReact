import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { expAction } from '../store1/expenseReducer';

const Expense = () => {
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [item, setItem] = useState('');
  const [category, setCategory] = useState('');
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.exp.expenses) || []; // Provide an empty array as the initial value

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

        dispatch(expAction.addItemHandler(productArray));
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleEditClick = (productId) => {
    setEditingId(productId);

    const editedProduct = products.find((product) => product.id === productId);
    setPrice(editedProduct.price);
    setDescription(editedProduct.description);
    setItem(editedProduct.item);
    setCategory(editedProduct.category);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (price && description && item && category) {
      const editedProduct = {
        price,
        description,
        item,
        category,
      };

      try {
        if (editingId) {
          const response = await fetch(`https://newblog-20727-default-rtdb.firebaseio.com/products/${editingId}.json`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(editedProduct),
          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
        } else {
          const response = await fetch('https://newblog-20727-default-rtdb.firebaseio.com/products.json', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(editedProduct),
          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
        }

        fetchProducts();

        setPrice('');
        setDescription('');
        setItem('');
        setCategory('');
        setEditingId(null);
      } catch (error) {
        console.error('Error updating data:', error);
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

      fetchProducts();
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  // Calculate the total expenses
  const totalExpenses = expenses.reduce((total, expense) => total + expense.price, 0);

  return (
    <div>
        <form onSubmit={handleSubmit}>
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

        <input type="submit" value={editingId ? 'Update' : 'Submit'} />
      </form>

      <h1>Products</h1>

      <ul>
        {products.map((product) => (
          <li key={product.id}>
            Price: {product.price} - Description: {product.description} - Item: {product.item} - Category: {product.category}
            {editingId !== product.id ? (
              <button className="edit-btn" onClick={() => handleEditClick(product.id)}>
                Edit
              </button>
            ) : null}
            <button className="delete-btn" onClick={() => handleDelete(product.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* Conditional rendering of the "Activate Premium" button */}
      {totalExpenses > 10000 && (
        <button className="activate-premium-btn">Activate Premium</button>
      )}
    </div>
  );
};

export default Expense;
