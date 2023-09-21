import { useContext } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import BrowserRouter
import Authentication from './components/Authentication';
import Home from './components/Home';
import AuthContext from './store/auth-context';
import { AuthContextProvider } from './store/auth-context';
import CompleteProfile from './components/CompleteProfile';

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <div className="App">
      <AuthContextProvider>
        <Router> {/* Wrap your application with the Router component */}
          <Routes>
            <Route path='/' element={<Home />} />
          <Route path='/authentication' element={<Authentication />} />
          {!authCtx.isLoggedIn&&  <Route path='/completeprofile' element={<CompleteProfile />} />}
          </Routes>
        </Router>
      </AuthContextProvider>
    </div>
  );
}

export default App;
