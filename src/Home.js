import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  return (
    <div style={{
      background: '#fff8f0',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '40px',
      padding: '2vw'
    }}>
      <div style={{
        background: '#fff',
        borderRadius: '20px',
        padding: '2vw',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        maxWidth: 900,
        width: '100%',
        margin: 'auto'
      }}>
        <img
          src={process.env.PUBLIC_URL + '/logo.jpg.png'}
          alt="Home Food Logo"
          style={{
            width: '180px',
            maxWidth: '90%',
            display: 'block',
            margin: '0 auto 32px auto',
            borderRadius: '10px',
            border: '6px solid #fff8f0'
          }}
        />
        <h1 style={{
          color: '#ff9800',
          fontWeight: 700,
          fontSize: '3rem',
          textAlign: 'center',
          marginBottom: '16px',
          letterSpacing: '2px',
          textShadow: '1px 1px 0 #fff'
        }}>
          Home Food <span role="img" aria-label="food">🍛</span>
        </h1>
        <div style={{
          textAlign: 'center',
          fontSize: '1.5rem',
          color: '#6d4c41',
          marginBottom: '24px'
        }}>
          Delicious Home Food?<br />
          We’ll Bring It to You in No Time!
        </div>
        <div style={{ textAlign: 'center' }}>
          <button
            style={{
              background: '#ff9800',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 32px',
              fontSize: '1.1rem',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(255,152,0,0.12)'
            }}
            onClick={() => navigate('/signin')}
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home; 