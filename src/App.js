import './App.css';
import Home from './component/Home';
import Navbar from './component/Navbar';
import {Routes, Route} from 'react-router-dom';
import Products from './component/Products';
import Product from './component/Product';
import Login from './component/Login';
import Cart from './component/Cart';
import Logout from './component/Logout';
import Register from './component/Register';
import About from './component/About';
import Contact from './component/Contact';
import Checkout from './component/Checkout';

function App() {
  let r = "EcommerceApp/";
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path={r + "/"}element={<Home/>} />
        <Route path={r + "/products"} element={<Products/>} />
        <Route path={r + "/products/:id"} element={<Product/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/logout" element={<Logout/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/checkout" element={<Checkout/>} />
      </Routes>
    </>
  );
}

export default App;
