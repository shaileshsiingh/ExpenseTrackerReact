import React, { useState, useRef } from 'react';
// import AuthContext from '../../store/auth-context';
import classes from './Authentication.module.css';

const Authentication = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

//   const authCtx = useContext(AuthContext);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmInputRef = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredConfirmPassword = confirmInputRef.current.value;

    setLoading(true);

    if (!isLogin && enteredPassword !== enteredConfirmPassword) {
      alert('Passwords do not match. Please try again.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        isLogin
          ? 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCipmPxx-C8SxvVI6SQNJ1aChk38b5Z7n0'
          : 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCipmPxx-C8SxvVI6SQNJ1aChk38b5Z7n0',
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
              ref={confirmInputRef}
            />
          </div>
        )}
        <div className={classes.actions}>
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
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Authentication;