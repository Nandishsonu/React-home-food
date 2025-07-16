import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OFFERS = [
  {
    id: 'offer1',
    title: '🎯 First Order Special',
    desc: 'Get 10% off on your first order (max ₹50)',
    code: 'FIRST10',
    calc: subtotal => Math.min(50, subtotal * 0.1)
  },
  {
    id: 'offer2',
    title: '💰 Flat ₹30 Off',
    desc: 'Flat ₹30 discount on orders above ₹200',
    code: 'FLAT30',
    calc: subtotal => subtotal > 200 ? 30 : 0
  },
  {
    id: 'offer3',
    title: '💳 15% Cashback',
    desc: 'Get 15% cashback on your next order',
    code: 'CASH15',
    calc: subtotal => subtotal * 0.15
  },
  {
    id: 'offer4',
    title: '🔥 Mega Discount',
    desc: '20% off on orders above ₹300 (max ₹100)',
    code: 'MEGA20',
    calc: subtotal => subtotal > 300 ? Math.min(100, subtotal * 0.2) : 0
  }
];

function Cart() {
  const [cart, setCart] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(storedCart);
  }, []);

  useEffect(() => {
    // Recalculate discount when cart or offer changes
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    if (selectedOffer) {
      const offer = OFFERS.find(o => o.id === selectedOffer);
      setAppliedDiscount(offer ? offer.calc(subtotal) : 0);
    } else {
      setAppliedDiscount(0);
    }
  }, [cart, selectedOffer]);

  const updateQty = (idx, delta) => {
    const newCart = [...cart];
    newCart[idx].qty += delta;
    if (newCart[idx].qty <= 0) {
      newCart.splice(idx, 1);
    }
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const clearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      setCart([]);
      setSelectedOffer(null);
      setAppliedDiscount(0);
      localStorage.setItem('cart', '[]');
    }
  };

  const selectOffer = (offerId) => {
    if (selectedOffer === offerId) {
      setSelectedOffer(null);
    } else {
      setSelectedOffer(offerId);
    }
  };

  const confirmOrder = () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const deliveryCharge = subtotal > 500 ? 0 : 40;
    const gst = subtotal * 0.05;
    const handlingCharge = subtotal * 0.02;
    const discount = appliedDiscount;
    const total = subtotal + deliveryCharge + gst + handlingCharge - discount;
    const orderDetails = {
      cart,
      selectedOffer,
      appliedDiscount: discount,
      subtotal,
      deliveryCharge,
      gst,
      handlingCharge,
      total,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('currentOrder', JSON.stringify(orderDetails));
    navigate('/payment');
  };

  // Charges
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const deliveryCharge = subtotal > 500 ? 0 : 40;
  const gst = subtotal * 0.05;
  const handlingCharge = subtotal * 0.02;
  const discount = appliedDiscount;
  const total = subtotal + deliveryCharge + gst + handlingCharge - discount;

  return (
    <div style={{ minHeight: '100vh', background: '#fdeedc', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2vw' }}>
      <div style={{ background: '#fff', borderRadius: 20, padding: '2vw', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', maxWidth: 500, width: '100%', margin: 'auto', position: 'relative', minHeight: 400 }}>
        <button
          onClick={() => navigate('/menu')}
          style={{ position: 'absolute', top: 18, left: 18, background: '#ff9800', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 18px', fontWeight: 600, fontSize: '1rem', cursor: 'pointer', boxShadow: '0 2px 8px rgba(255,152,0,0.12)' }}
        >
          ← Back to Menu
        </button>
        <h2 style={{ textAlign: 'center', color: '#ff9800', marginBottom: 24 }}>Your Cart</h2>
        {cart.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#888', fontSize: '1.2rem', marginTop: 60 }}>Your cart is empty.</div>
        ) : (
          <>
            <div style={{ marginBottom: 24 }}>
              {cart.map((item, idx) => (
                <div key={item.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14, borderBottom: '1px solid #eee', paddingBottom: 8 }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '1.1rem', color: '#ff9800' }}>{item.name}</div>
                    <div style={{ color: '#6d4c41', fontSize: '1rem' }}>₹{item.price} x {item.qty}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <button onClick={() => updateQty(idx, -1)} style={{ fontSize: 18, padding: '4px 12px', borderRadius: 6, border: '1px solid #ff9800', background: '#fff', color: '#ff9800', cursor: 'pointer' }}>-</button>
                    <span style={{ minWidth: 24, textAlign: 'center', fontWeight: 600 }}>{item.qty}</span>
                    <button onClick={() => updateQty(idx, 1)} style={{ fontSize: 18, padding: '4px 12px', borderRadius: 6, border: '1px solid #ff9800', background: '#ff9800', color: '#fff', cursor: 'pointer' }}>+</button>
                  </div>
                  <div style={{ fontWeight: 600, fontSize: '1.1rem', color: '#d84315' }}>₹{item.price * item.qty}</div>
                </div>
              ))}
            </div>
            {/* Charges Section */}
            <div style={{ borderTop: '2px solid #ff9800', paddingTop: 18, marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span>Subtotal:</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span>Delivery Charge:</span>
                <span>{deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span>GST (5%):</span>
                <span>₹{gst.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span>Handling Charge (2%):</span>
                <span>₹{handlingCharge.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span>Discount:</span>
                <span style={{ color: discount > 0 ? '#43a047' : '#888' }}>{discount > 0 ? `-₹${discount.toFixed(2)}` : '₹0.00'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1.15rem', color: '#388e3c', marginTop: 10 }}>
                <span>Total Amount:</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>
            {/* Offers Section */}
            <div style={{ marginBottom: 18 }}>
              <div style={{ fontWeight: 600, color: '#ff9800', marginBottom: 8, fontSize: '1.1rem' }}>🎉 Available Offers</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {OFFERS.map(offer => (
                  <div
                    key={offer.id}
                    onClick={() => selectOffer(offer.id)}
                    style={{
                      border: selectedOffer === offer.id ? '2px solid #ff9800' : '1.5px solid #eee',
                      borderRadius: 12,
                      padding: '12px 16px',
                      background: selectedOffer === offer.id ? '#fff8e1' : '#fff',
                      cursor: 'pointer',
                      boxShadow: selectedOffer === offer.id ? '0 2px 8px rgba(255,152,0,0.08)' : 'none',
                      transition: 'all 0.2s',
                    }}
                  >
                    <div style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: 2 }}>{offer.title}</div>
                    <div style={{ color: '#6d4c41', fontSize: '0.98rem', marginBottom: 2 }}>{offer.desc}</div>
                    <div style={{ color: '#ff9800', fontWeight: 600, fontSize: '0.98rem' }}>Use code: {offer.code}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Buttons */}
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
              <button onClick={clearCart} style={{ backgroundColor: '#ff6b6b', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 32px', fontSize: '1.1rem', fontWeight: 600, cursor: 'pointer', boxShadow: '0 2px 8px rgba(255,107,107,0.12)' }}>Clear Cart</button>
              <button onClick={confirmOrder} style={{ backgroundColor: '#43a047', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 32px', fontSize: '1.1rem', fontWeight: 600, cursor: 'pointer', boxShadow: '0 2px 8px rgba(67,160,71,0.12)' }}>Confirm Order</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart; 