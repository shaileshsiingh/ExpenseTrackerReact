import React, {  useState } from "react";

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  logIn: (token) => {},
  logOut: () => {}
});

export const AuthContextProvider = (props) => {
  const initialState = localStorage.getItem('token')
  const [token, setToken] = useState(initialState);

  const userLoggedIn = !!token;

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem('token', token);
    setTimeout(() => {
      setToken(null);
    }, 4000); 
  };
  

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem('token')
  };

  
  const verificationHandler=()=>{

  }
  const contextValue = {
    token: token,
    isLoggedIn: userLoggedIn,
    logIn: loginHandler,
    logOut: logoutHandler,
    verification : verificationHandler
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;