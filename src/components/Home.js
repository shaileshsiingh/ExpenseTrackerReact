import React, { useContext } from 'react';
import AuthContext from '../store/auth-context';

function Home() {
  const authCtx = useContext(AuthContext);

  const logoutHandler = () => {
    authCtx.logOut(); // Call the logout function from AuthContext
  };

  return (
    <div>
      <h1>Welcome</h1>
      {authCtx.isLoggedIn && (
        <button onClick={logoutHandler}>Log Out</button>
      )}
    </div>
  );
}

export default Home;
