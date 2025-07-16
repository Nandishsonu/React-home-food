import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const paymentOptions = [
  { name: 'Google Pay', icon: '��', className: 'gpay', desc: 'Fast UPI payment with Google Pay' },
  { name: 'PhonePe', icon: '💜', className: 'phonepe', desc: 'Pay via PhonePe app or UPI' },
  { name: 'BHIM UPI', icon: '🏦', className: 'bhim', desc: 'Pay using any UPI app' },
  { name: 'Debit Card', icon: '💳', className: 'debit', desc: 'Pay securely with your debit card' },
  { name: 'Add More Payment Methods', icon: '➕', className: 'more', desc: 'See more payment options' }
];

function Payment() {
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Get order details from localStorage
    const orderDetails = JSON.parse(localStorage.getItem('currentOrder') || '{}');
    if (orderDetails.cart && orderDetails.cart.length > 0) {
      let subtotal = 0;
      orderDetails.cart.forEach(item => {
        subtotal += item.price * item.qty;
      });
      const deliveryCharge = subtotal > 500 ? 0 : 40;
      const gst = subtotal * 0.05;
      const handlingCharge = subtotal * 0.02;
      const discount = orderDetails.appliedDiscount || 0;
      const total = subtotal + deliveryCharge + gst + handlingCharge - discount;
      setTotal(total);
    } else {
      // Fallback: try to get total from cart directly
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      if (cart.length > 0) {
        let subtotal = 0;
        cart.forEach(item => {
          subtotal += item.price * item.qty;
        });
        const deliveryCharge = subtotal > 500 ? 0 : 40;
        const gst = subtotal * 0.05;
        const handlingCharge = subtotal * 0.02;
        const total = subtotal + deliveryCharge + gst + handlingCharge;
        setTotal(total);
      } else {
        setTotal(0);
      }
    }
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: `url('https://miro.medium.com/v2/resize:fit:1358/1*jHLz9MczsYg8wI9WTlpCIA.png') center center / cover no-repeat`,
      }}
    >
      {/* Overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background:
            'linear-gradient(135deg, rgba(102, 126, 234, 0.8) 0%, rgba(118, 75, 162, 0.8) 100%)',
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          maxWidth: 480,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 20,
          padding: 24,
        }}
      >
        <button className="back-link" onClick={() => navigate('/cart')}>← Back to Cart</button>
        <div className="amount-box">
          <h2 id="payment-total">₹{total.toFixed(2)}</h2>
          <p>Total Amount to Pay</p>
        </div>
        <div className="choose-method">
          <h3>Choose Payment Method</h3>
          <p>Select your preferred payment option to complete your order</p>
        </div>
        <div className="payment-options">
          {paymentOptions.map(option => (
            <div key={option.name} style={{ width: '100%' }}>
              <button
                className={`pay-btn ${option.className}`}
                onClick={() => alert(`Selected: ${option.name}`)}
                style={{ width: '100%' }}
              >
                <span className="payment-icon">{option.icon}</span>
                <span>{option.name}</span>
              </button>
              <div style={{
                fontSize: '0.97rem',
                color: '#555',
                textAlign: 'center',
                marginTop: 4,
                opacity: 0.85,
                marginBottom: 10
              }}>{option.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Payment; 