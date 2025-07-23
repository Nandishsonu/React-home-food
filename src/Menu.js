import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const FOOD_ITEMS = [
  {
    name: 'Paneer Butter Masala',
    price: 180,
    img: 'https://www.vegrecipesofindia.com/wp-content/uploads/2020/01/paneer-butter-masala-1.jpg',
    desc: 'Creamy cottage cheese curry served with naan.'
  },
  {
    name: 'Chicken Biryani',
    price: 220,
    img: 'https://tse3.mm.bing.net/th/id/OIP.EbbeDKcDhcERGQyHKmxrfwHaHa?pid=Api&P=0&h=180',
    desc: 'Fragrant rice with tender chicken and spices.'
  },
  {
    name: 'Parrota',
    price: 80,
    img: 'https://tse1.mm.bing.net/th/id/OIP.0WeY2IbiNgzYpziVwkrffAHaFF?pid=Api&P=0&h=180',
    desc: 'Layered flatbread served with curry.'
  },
  {
    name: 'Veg Palav',
    price: 140,
    img: 'https://i2.wp.com/vegecravings.com/wp-content/uploads/2016/10/pav-bhaji-recipe-step-by-step-instructions.jpg?w=2418&quality=65&strip=all&ssl=1',
    desc: 'Spicy vegetable rice with aromatic spices.'
  },
  {
    name: 'South Meals',
    price: 160,
    img: 'https://tse3.mm.bing.net/th/id/OIP.CEaG3BVrc2kQvrw7WmTmbAHaE8?pid=Api&P=0&h=180',
    desc: 'Traditional South Indian thali with rice and curries.'
  },
  {
    name: 'Chapathi',
    price: 60,
    img: 'https://tse4.mm.bing.net/th/id/OIP.k8VElA8hcNjFafAZxGReqAHaKA?pid=Api&P=0&h=180',
    desc: 'Whole wheat flatbread served with curry.'
  },
  {
    name: 'Chole Butter Masala',
    price: 130,
    img: 'https://media.vogue.in/wp-content/uploads/2020/08/chole-bhature-recipe.jpg',
    desc: 'Spicy chickpeas in rich butter masala gravy.'
  },
  {
    name: 'Egg Rice',
    price: 110,
    img: 'https://tse1.mm.bing.net/th/id/OIP.XnxkzBBsiSsubD6A2S5ZcAHaFj?pid=Api&P=0&h=180',
    desc: 'Scrambled eggs mixed with flavorful rice.'
  },
  {
    name: 'Fruit Salad',
    price: 80,
    img: 'https://tse2.mm.bing.net/th/id/OIP.8QxX7QxX7QxX7QxX7QxX7QHaHa?pid=Api&P=0&h=180',
    desc: 'Fresh mixed fruits with honey dressing.'
  },
  {
    name: 'Vegetable Salad',
    price: 70,
    img: 'https://tse3.mm.bing.net/th/id/OIP.9RyY8RyY8RyY8RyY8RyY8HaHa?pid=Api&P=0&h=180',
    desc: 'Fresh vegetables with light vinaigrette dressing.'
  }
];

function Menu() {
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(storedCart);
  }, []);

  // Helper to get qty for a food item
  const getQty = (name) => {
    const item = cart.find(i => i.name === name);
    return item ? item.qty : 0;
  };

  // Add or increase quantity
  const increaseQty = (item) => {
    let newCart = [...cart];
    const idx = newCart.findIndex(i => i.name === item.name);
    if (idx !== -1) {
      newCart[idx].qty += 1;
    } else {
      newCart.push({ ...item, qty: 1 });
    }
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  // Decrease quantity
  const decreaseQty = (item) => {
    let newCart = [...cart];
    const idx = newCart.findIndex(i => i.name === item.name);
    if (idx !== -1) {
      newCart[idx].qty -= 1;
      if (newCart[idx].qty <= 0) {
        newCart.splice(idx, 1);
      }
      setCart(newCart);
      localStorage.setItem('cart', JSON.stringify(newCart));
    }
  };

  const filteredItems = FOOD_ITEMS.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div style={{
      background: `url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80') center/cover no-repeat`,
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      borderRadius: '40px',
      padding: '2vw',
      position: 'relative',
    }}>
      {/* Overlay for readability */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        background: 'rgba(0,0,0,0.45)',
        borderRadius: '40px',
        zIndex: 0
      }} />
      <div style={{
        background: '#fff',
        borderRadius: '20px',
        padding: '2vw',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        maxWidth: 600,
        width: '100%',
        margin: 'auto',
        position: 'relative',
        zIndex: 1
      }}>
        {/* User Info Bar */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 18 }}>
          <div style={{ marginRight: 'auto' }}>
            <div style={{ fontWeight: 700, color: '#ff9800', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: 4 }}>
              John Doe
              <span
                style={{ cursor: 'pointer', fontSize: '1.1em' }}
                title="Change area"
                onClick={() => navigate('/location')}
              >
                🔻
              </span>
            </div>
            <div style={{ color: '#6d4c41', fontSize: '1rem' }}>123 Main Street, City</div>
          </div>
          <div style={{ marginLeft: 'auto', background: '#fdeedc', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 28, color: '#7b5e2e' }}>👤</span>
          </div>
        </div>
        {/* Welcome Heading */}
        <h1 style={{ color: '#ff9800', fontWeight: 700, fontSize: '2.2rem', textAlign: 'center', marginBottom: 16, textShadow: '1px 1px 0 #fff' }}>
          Welcome to Home Food!
        </h1>
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search for food..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 18px',
            border: '2px solid #ff9800',
            borderRadius: 12,
            fontSize: '1.1rem',
            marginBottom: 18,
            outline: 'none',
            background: '#fff8f0',
            color: '#6d4c41'
          }}
        />
        <div style={{ color: '#6d4c41', fontWeight: 500, marginBottom: 12, fontSize: '1.1rem' }}>
          Choose from our delicious home-cooked meals below:
        </div>
        {/* Promo Banner */}
        <div style={{ marginBottom: 18 }}>
          <img src="https://cdn.grabon.in/gograbon/images/category/1546252575451.png" alt="Promo" style={{ width: '100%', borderRadius: 16, boxShadow: '0 2px 12px rgba(255,152,0,0.08)' }} />
        </div>
        {/* Food List */}
        {filteredItems.map((item) => (
          <div key={item.name} style={{ display: 'flex', alignItems: 'center', background: '#fff8e1', borderRadius: 16, padding: 18, marginBottom: 18, boxShadow: '0 2px 8px rgba(255,152,0,0.06)' }}>
            {item.img && (
              <img src={item.img} alt={item.name} style={{ width: 70, height: 70, borderRadius: 12, objectFit: 'cover', marginRight: 18, border: '2px solid #fff' }} />
            )}
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, color: '#ff9800', fontSize: '1.15rem', marginBottom: 4 }}>{item.name}</div>
              <div style={{ color: '#6d4c41', fontSize: '1rem', marginBottom: 4 }}>{item.desc}</div>
              <div style={{ color: '#d84315', fontWeight: 600, fontSize: '1.1rem', marginBottom: 6 }}>₹{item.price}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <button onClick={() => decreaseQty(item)} style={{ fontSize: 18, padding: '4px 12px', borderRadius: 6, border: '1px solid #ff9800', background: '#fff', color: '#ff9800', cursor: 'pointer' }}>-</button>
                <span style={{ minWidth: 24, textAlign: 'center', fontWeight: 600 }}>{getQty(item.name)}</span>
                <button onClick={() => increaseQty(item)} style={{ fontSize: 18, padding: '4px 12px', borderRadius: 6, border: '1px solid #ff9800', background: '#ff9800', color: '#fff', cursor: 'pointer' }}>+</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Floating Cart Button */}
      <button
        style={{
          position: 'fixed',
          right: 32,
          bottom: 32,
          background: 'linear-gradient(135deg, #ff9800 0%, #ffb74d 100%)',
          color: '#fff',
          border: 'none',
          borderRadius: '50%',
          width: 64,
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 32,
          boxShadow: '0 2px 12px rgba(255,152,0,0.18)',
          zIndex: 100,
          cursor: 'pointer'
        }}
        onClick={() => navigate('/cart')}
      >
        <span role="img" aria-label="cart">🛒</span>
        {totalCount > 0 && (
          <span style={{
            position: 'absolute',
            top: 10,
            right: 10,
            background: '#ff9800',
            color: '#fff',
            borderRadius: '50%',
            padding: '2px 8px',
            fontSize: 16,
            fontWeight: 700,
            boxShadow: '0 1px 4px rgba(255,152,0,0.18)'
          }}>{totalCount}</span>
        )}
      </button>
    </div>
  );
}

export default Menu; 