import React, { useContext } from 'react';
import AuthContext from '../store/auth-context';
import { Link, useNavigate } from 'react-router-dom';

function Home() {
  const authCtx = useContext(AuthContext);
  const history = useNavigate()

  const logoutHandler = () => {
    authCtx.logOut(); // Call the logout function from AuthContext
    history('/authentication')
  };

  return (
    <>
    <div>
      <h1>Welcome</h1>
      {authCtx.isLoggedIn && (
        <button onClick={logoutHandler}>Log Out</button>
      )}
    </div>
                <div>
                Your profile is incomplete.<Link to='/completeprofile'>Complete now</Link>
            </div>

    </>
  );
}

export default Home;
