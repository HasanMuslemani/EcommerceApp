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
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/EcommerceApp/" element={<Home/>} />
        <Route path="/EcommerceApp/products" element={<Products/>} />
        <Route path="/EcommerceApp/products/:id" element={<Product/>} />
        <Route path="/EcommerceApp/about" element={<About/>} />
        <Route path="/EcommerceApp/contact" element={<Contact/>} />
        <Route path="/EcommerceApp/login" element={<Login/>} />
        <Route path="/EcommerceApp/register" element={<Register/>} />
        <Route path="/EcommerceApp/logout" element={<Logout/>} />
        <Route path="/EcommerceApp/cart" element={<Cart/>} />
        <Route path="/EcommerceApp/checkout" element={<Checkout/>} />
      </Routes>
    </>
  );
}

export default App;
