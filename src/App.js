
import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Component/Account/Login.js';
import Synthetic from './Component/ProductPage/Synthetic/Synthetic.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Link to='/'>nhap san pham</Link>
        <Link to='/login'>Account</Link>
      </header>
      <body>
        <Routes>
          <Route path='/' element={<Synthetic />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </body>
    </div>
  );
}

export default App;
