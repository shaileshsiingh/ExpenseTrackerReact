import { useContext } from 'react';
import './App.css';
import Authentication from './components/Authentication';
import Home from './components/Home';
import AuthContext from './store/auth-context';
import { AuthContextProvider } from './store/auth-context';
function App() {
  const authCtx = useContext(AuthContext);

  return (
    <div className="App">
      <AuthContextProvider>
      {!authCtx.isLoggedIn && <Home /> }
      {authCtx.isLoggedIn &&  <Authentication />}

      </AuthContextProvider>
    </div>
  );
}

export default App;
