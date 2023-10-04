import React, { Fragment, useContext, useEffect, useState } from 'react';
import AuthContext from '../store/auth-context';

const ContactDetail = () => {
  const authCtx = useContext(AuthContext);

  const [name, setName] = useState('');
  const [imgUrl, setImgUrl] = useState('');

  const urlGet =
    'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBfLmb22jB_vs7p6YsU4HJXnGiDP7Ftw9o';

  const getDataHandler = () => {
    fetch(urlGet, {
      method: 'POST',
      body: JSON.stringify({
        idToken: authCtx.token,
        
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

      .then((res) => res.json())
      .then((resp) => {
        console.log(resp.users);
        setName(resp.users[0].displayName);
        setImgUrl(resp.users[0].photoUrl);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  };

  const nameChangeHandler = (e) => {
    setName(e.target.value);
  };

  const imgUrlChangeHandler = (e) => {
    setImgUrl(e.target.value);
  };

  const url =
    'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBfLmb22jB_vs7p6YsU4HJXnGiDP7Ftw9o';

  const submitHandler = (e) => {
    e.preventDefault();

    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        idToken: authCtx.token,
        displayName: name,
        photoUrl: imgUrl,
        returnSecureToken: false,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((resp) => {
        if (resp.error) {
          alert(resp.error.message);
        } else {
          console.log('Response:', resp);
          alert("Updated")
        }
      })
      .catch((err) => {
        console.error('Error updating user details:', err);
      });
  };

  useEffect(() => {
    getDataHandler();
  }, );

  return (
    <Fragment>
      <form >
        <div >
          <div >Contact Details</div>
          <button >Cancel</button>
        </div>
        <div >
          <div >
            <div >Full Name : </div>
            <input type="text" onChange={nameChangeHandler} value={name} />
          </div>
          <div >
            <div >Profile Photo url : </div>
            <input type="text" onChange={imgUrlChangeHandler} value={imgUrl} />
          </div>
        </div>
        <button  type="submit" onClick={submitHandler}>
          Update
        </button>
        <div ></div>
      </form>
    </Fragment>
  );
};

export default ContactDetail;
