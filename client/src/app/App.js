import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import Home from '../pages/Home';
import Navbar from '../layouts/Navbar';
import Login from '../pages/Login'
import SignUp from '../pages/SignUp'
import Block from '../layouts/Block';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Block />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
