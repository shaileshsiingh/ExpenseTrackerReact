import React, { Fragment, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const redirect = useNavigate();

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const url =
    'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBfLmb22jB_vs7p6YsU4HJXnGiDP7Ftw9o'; 

  const submitHandler = (e) => {
    e.preventDefault();
    setSending(true);

    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        requestType: 'PASSWORD_RESET',
        email: email,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        setSending(false);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data.error) {
          alert(data.error.message);
        } else {
          alert('Check your email inbox and reset password');
          redirect('/');
        }
      })
      .catch((err) => {
        setSending(false);
        console.error(err);
      });
  };

  return (
    <Fragment>
      <div >
        <div>
          <form onSubmit={submitHandler}>
            <label>Enter the email with which you have registered</label>
            <input type="email" onChange={emailChangeHandler} value={email} />
            {!sending && <button type="submit">Send link</button>}
            {sending && <p>Sending request...</p>}
          </form>
          <Link to="/authentication">Already a user? Login</Link>
        </div>
      </div>
    </Fragment>
  );
};

export default ForgotPassword;
