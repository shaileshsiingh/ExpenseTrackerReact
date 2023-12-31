import React, { useState, useRef } from 'react';
import classes from './Authentication.module.css';
// import AuthContext from '../store/auth-context';
import { useNavigate, Link } from 'react-router-dom';
import { authAction } from '../store1/authReducer';
import { useDispatch } from 'react-redux';

const Authentication = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(''); // Controlled component for confirmPassword
  // const authCtx = useContext(AuthContext);
  let history = useNavigate()
  let dispatch = useDispatch()

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    setLoading(true);

    if (!isLogin) {
      if (enteredPassword !== confirmPassword) {
        alert('Passwords do not match. Please try again.');
        setLoading(false);
        return;
      }
    }

    try {
      const response = await fetch(
        isLogin
          ? 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBfLmb22jB_vs7p6YsU4HJXnGiDP7Ftw9o'
          : 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBfLmb22jB_vs7p6YsU4HJXnGiDP7Ftw9o',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        alert(data.error.message);
      }

      alert("Logged In");
      console.log("Logged In Successfully");
      dispatch(authAction.login(data.idToken))
      history('/')
      
      console.log(data);

      setLoading(false);
    } catch (error) {
      console.error(error);
      alert('An error occurred. Please try again later.');
      setLoading(false);
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordInputRef} />
        </div>
        {!isLogin && (
          <div className={classes.control}>
            <label htmlFor='confirmPassword'>Confirm Password</label>
            <input
              type='password'
              id='confirmPassword'
              required
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
          </div>
        )}
        <div className={classes.actions}>
        {isLogin && <Link className={classes.forget} to='/reset'>Forgot Password ?</Link>}

          {!loading && (
            <button type='submit'>
              {isLogin ? 'Login' : 'Create a new account'}
            </button>
          )}
          {loading && <p>Sending request...</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with an existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Authentication;
