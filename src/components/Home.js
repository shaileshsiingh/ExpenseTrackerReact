import React, { useContext } from 'react';
import AuthContext from '../store/auth-context';
import { Link, useNavigate } from 'react-router-dom';

function Home() {
  const authCtx = useContext(AuthContext);
  const history = useNavigate()
//
const url='https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBfLmb22jB_vs7p6YsU4HJXnGiDP7Ftw9o'

const verifyEmailHandler=(e)=>{
    e.preventDefault();
    fetch(url,{
        method:'POST',
        body:JSON.stringify({
            requestType:"VERIFY_EMAIL",
            idToken:authCtx.token
        }),
        headers:{
            'Content-Type': 'application/json'
        }
    }).then((res)=>{
        const data=res.json();
        data.then((resp)=>{
            console.log(resp);
            alert("Check your email , you might have recieved a verification link . Click on it to verify.")
        })
    }).catch((err)=>{
        console.log('err',err)
    })
}


  //

  const logoutHandler = () => {
    authCtx.logOut(); // Call the logout function from AuthContext
    history('/authentication')
  };

  return (
    <>
      <div>
        <h1>Welcome</h1>
        <div>
          Your profile is incomplete. <Link to="/completeprofile">Complete now</Link>
        </div>
      </div>
      <button type="submit" onClick={verifyEmailHandler}>
        Verify Email
      </button>
      {authCtx.isLoggedIn ? (
        <button onClick={logoutHandler}>Log Out</button>
      ) : (
        <>
          <Link to="/authentication">Login</Link>
        </>
      )}
    </>
  );
      }

export default Home;
