import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import SignIn from './SignIn';
import Menu from './Menu';
import Cart from './Cart';
import Payment from './Payment';
import OTP from './OTP';
import { CartProvider } from './CartContext';
import Location from './Location';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/otp" element={<OTP />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/location" element={<Location />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
