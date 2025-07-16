import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Only digits
    if (value.length > 10) value = value.slice(0, 10);
    setPhone(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (phone.length !== 10) {
      alert('Please enter a valid 10-digit phone number.');
      return;
    }
    // In a real app, send OTP here
    navigate('/otp', { state: { phone } });
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    }}>
      {/* Overlay */}
      <div style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        background: 'rgba(0,0,0,0.65)',
        zIndex: 0
      }} />
      {/* Card */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        background: 'rgba(30,30,30,0.92)',
        borderRadius: 24,
        boxShadow: '0 8px 32px rgba(0,0,0,0.28)',
        padding: '36px 22px 24px 22px',
        maxWidth: 350,
        width: '100%',
        textAlign: 'center',
        color: '#fff',
        margin: '0 12px',
      }}>
        {/* Logo */}
        <div style={{
          width: 64, height: 64, borderRadius: '50%', background: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '-48px auto 18px auto', boxShadow: '0 4px 18px rgba(255, 152, 0, 0.13)'
        }}>
          <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="User Icon" style={{ width: 40, height: 40 }} />
        </div>
        <div style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: 8, letterSpacing: 1 }}>SIGN IN</div>
        <div style={{ fontSize: '0.98rem', color: '#fff8', marginBottom: 18 }}>Enter your phone number to continue</div>
        <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
          <label style={{ display: 'block', marginBottom: 4, fontWeight: 600, color: '#fff', fontSize: '0.98rem' }} htmlFor="phone">PHONE NUMBER</label>
          <input
            className="signin-input"
            id="phone"
            type="text"
            placeholder="Enter your 10-digit phone number"
            required
            value={phone}
            onChange={handlePhoneChange}
            maxLength={10}
            style={{ width: '100%', padding: '12px 14px', borderRadius: 8, border: '1.5px solid #fff3', fontSize: '1rem', marginBottom: 16, outline: 'none', background: '#222', color: '#fff', transition: 'border 0.2s', boxSizing: 'border-box' }}
          />
          <button type="submit" style={{ width: '100%', fontSize: '1.08rem', fontWeight: 700, padding: '13px 0', borderRadius: 10, background: '#e53935', color: '#fff', border: 'none', boxShadow: '0 2px 8px rgba(229, 57, 53, 0.13)', transition: 'background 0.2s, box-shadow 0.2s', letterSpacing: '0.5px', cursor: 'pointer', marginTop: 8 }}>Send OTP</button>
        </form>
      </div>
    </div>
  );
}

export default SignIn; 