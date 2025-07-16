import React, { useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function OTP() {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(30);
  const inputs = [useRef(), useRef(), useRef(), useRef()];
  const navigate = useNavigate();
  const location = useLocation();
  const phone = location.state?.phone || '';

  React.useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => setTimer(t => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (e, idx) => {
    const value = e.target.value.replace(/\D/g, '');
    if (!value) {
      setOtp(prev => prev.map((d, i) => (i === idx ? '' : d)));
      return;
    }
    setOtp(prev => prev.map((d, i) => (i === idx ? value[0] : d)));
    if (value && idx < 3) {
      inputs[idx + 1].current.focus();
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
      inputs[idx - 1].current.focus();
    }
  };

  const handleResend = () => {
    setTimer(30);
    setOtp(['', '', '', '']);
    inputs[0].current.focus();
    alert('OTP resent!');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp.join('').length !== 4) {
      alert('Please enter the 4-digit OTP.');
      return;
    }
    alert('OTP Verified!');
    navigate('/menu');
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
        padding: '36px 22px 32px 22px',
        maxWidth: 350,
        width: '100%',
        textAlign: 'center',
        color: '#fff',
        margin: '0 12px',
      }}>
        <div style={{ fontSize: '2rem', fontWeight: 800, marginBottom: 8, letterSpacing: 1 }}>OTP Verification</div>
        <div style={{ fontSize: '1.05rem', color: '#fff8', marginBottom: 18 }}>
          Enter the 4-digit code sent to <span style={{ color: '#FFD700' }}>{phone ? `+91-${phone}` : 'your phone'}</span>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 18 }}>
            {otp.map((digit, idx) => (
              <input
                key={idx}
                ref={inputs[idx]}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={e => handleChange(e, idx)}
                onKeyDown={e => handleKeyDown(e, idx)}
                style={{
                  width: 48, height: 56,
                  fontSize: '2rem',
                  textAlign: 'center',
                  borderRadius: 12,
                  border: '2px solid #FFD700',
                  background: '#222',
                  color: '#FFD700',
                  outline: 'none',
                  boxShadow: '0 2px 8px rgba(255,215,0,0.08)',
                  fontWeight: 700,
                  letterSpacing: 2,
                  transition: 'border 0.2s',
                }}
                autoFocus={idx === 0}
              />
            ))}
          </div>
          <div style={{ marginBottom: 18, fontSize: '1rem', color: '#fff8' }}>
            {timer > 0 ? (
              <>Resend OTP in <span style={{ color: '#FFD700' }}>{timer}s</span></>
            ) : (
              <span style={{ color: '#FFD700', cursor: 'pointer', fontWeight: 600 }} onClick={handleResend}>Resend OTP</span>
            )}
          </div>
          <button type="submit" style={{ width: '100%', fontSize: '1.08rem', fontWeight: 700, padding: '13px 0', borderRadius: 10, background: '#FFD700', color: '#222', border: 'none', boxShadow: '0 2px 8px rgba(255,215,0,0.13)', transition: 'background 0.2s, box-shadow 0.2s', letterSpacing: '0.5px', cursor: 'pointer', marginTop: 8 }}>Verify</button>
        </form>
      </div>
    </div>
  );
}

export default OTP; 