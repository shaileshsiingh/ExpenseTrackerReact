// import { useContext } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import BrowserRouter
import Authentication from './components/Authentication';
import Home from './components/Home';
import { AuthContextProvider } from './store/auth-context';
import CompleteProfile from './components/CompleteProfile';
import ForgotPassword from './components/Resetpw';


function App() {

  return (
    <div className="App">
      <AuthContextProvider>
        <Router> {/* Wrap your application with the Router component */}
          <Routes>
          <Route path="/" element= {<Home />} 
/>
<Route path="/authentication" element={<Authentication />} />
<Route path="/completeprofile" element={<CompleteProfile />} />


          <Route path='/reset' element={<ForgotPassword />}/>
          </Routes>
        </Router>
      </AuthContextProvider>
    </div>
  );
}

export default App;
