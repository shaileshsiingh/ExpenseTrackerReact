import { useContext } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Import BrowserRouter
import Authentication from './components/Authentication';
import Home from './components/Home';
import AuthContext from './store/auth-context';
import { AuthContextProvider } from './store/auth-context';
import CompleteProfile from './components/CompleteProfile';
import ForgotPassword from './components/Resetpw';


function App() {
  const authCtx = useContext(AuthContext);

  return (
    <div className="App">
      <AuthContextProvider>
        <Router> {/* Wrap your application with the Router component */}
          <Routes>
          <Route
  path="/"
  element={authCtx.isLoggedIn ? <Home /> : <Navigate to="/authentication" />}
/>
<Route path="/authentication" element={<Authentication />} />
<Route
  path="/completeprofile"
  element={authCtx.isLoggedIn ? <Home /> : <Navigate to="/authentication" />}
/>

          <Route path='/reset' element={<ForgotPassword />}/>
          </Routes>
        </Router>
      </AuthContextProvider>
    </div>
  );
}

export default App;
