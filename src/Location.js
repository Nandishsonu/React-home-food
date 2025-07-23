import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Demo data for saved addresses and recent searches
const initialSavedAddresses = [
  { name: 'Ajay', address: 'Lakshmi Nilaya Opposite, M.v Royal Apartment Opposite Road Sri Rampura, Srirampura, Jakkur, Bengaluru' },
  { name: 'Manjula', address: '2nd Floor, 5th Cross Atm Road, Ramachandrapura, Howthinayaranappa Garden, Govindayyanapalya' },
  { name: 'Jaya', address: '3 Nd, Grand Sanidhi Ladies Pg, Anjaneya Badavane, Kuvempu Nagar, Davanagere, Karnataka 577005' }
];
const demoRecentSearches = [
  { name: 'Srirampura', address: 'Srirampura, Jakkur, Bengaluru, Karnataka 560064' }
];

const BANGALORE_LOCATIONS = [
  'Koramangala', 'Indiranagar', 'Whitefield', 'Jayanagar', 'Malleshwaram', 'HSR Layout', 'BTM Layout', 'Electronic City',
  'Marathahalli', 'Hebbal', 'Banashankari', 'Rajajinagar', 'Basavanagudi', 'Yelahanka', 'Ulsoor', 'Frazer Town',
  'MG Road', 'Vijayanagar', 'KR Puram', 'Bellandur', 'JP Nagar', 'Shivajinagar', 'Domlur', 'Richmond Town',
  'Sadashivanagar', 'Sanjay Nagar', 'Hennur', 'Sarjapur Road', 'Kalyan Nagar', 'Kammanahalli', 'RT Nagar', 'Peenya',
  'Majestic', 'Lalbagh', 'Vasanth Nagar', 'Cox Town', 'Jeevanbheema Nagar', 'HAL', 'Bommanahalli', 'Kengeri',
  'Bannerghatta Road', 'Magadi Road', 'Hoodi', 'KR Market', 'Seshadripuram', 'Wilson Garden', 'Girinagar',
  'Padmanabhanagar', 'Varthur', 'Attibele', 'Hosur Road', 'Kanakapura Road', 'Jalahalli', 'Bagalakunte', 'Nagarbhavi',
  'Hulimavu', 'Kumaraswamy Layout', 'Basaveshwaranagar', 'Chamarajpet', 'Yeshwanthpur', 'Sunkadakatte', 'Kasturi Nagar',
  'Ramamurthy Nagar', 'Banaswadi', 'Nagawara', 'HBR Layout', 'Kaggadasapura', 'Sahakar Nagar', 'JP Nagar', 'Jakkur',
  'Hosur', 'Others...'
];

function Location() {
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [savedAddresses, setSavedAddresses] = useState(initialSavedAddresses);
  const [recentSearches] = useState(demoRecentSearches);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [menuIndex, setMenuIndex] = useState(null);
  const navigate = useNavigate();

  // Handle search input and show suggestions
  const handleInput = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (value.length > 0) {
      const filtered = BANGALORE_LOCATIONS.filter(loc =>
        loc.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearch(suggestion);
    setSuggestions([]);
  };

  // Add new address logic
  const handleAddNewAddress = () => {
    setShowAddModal(true);
    setNewName('');
    setNewAddress('');
    setEditIndex(null);
  };

  // Edit address logic
  const handleEditAddress = (idx) => {
    setShowAddModal(true);
    setNewName(savedAddresses[idx].name);
    setNewAddress(savedAddresses[idx].address);
    setEditIndex(idx);
    setMenuIndex(null);
  };

  // Save new or edited address
  const handleSaveNewAddress = (e) => {
    e.preventDefault();
    if (newName && newAddress) {
      if (editIndex !== null) {
        // Edit
        const updated = [...savedAddresses];
        updated[editIndex] = { name: newName, address: newAddress };
        setSavedAddresses(updated);
      } else {
        // Add
        setSavedAddresses([
          ...savedAddresses,
          { name: newName, address: newAddress }
        ]);
      }
      setShowAddModal(false);
      setEditIndex(null);
    }
  };

  // Delete address
  const handleDeleteAddress = (idx) => {
    setSavedAddresses(savedAddresses.filter((_, i) => i !== idx));
    setMenuIndex(null);
  };

  return (
    <div style={{ background: '#fff8f0', minHeight: '100vh', fontFamily: 'sans-serif', maxWidth: 420, margin: '0 auto', boxShadow: '0 0 24px rgba(0,0,0,0.04)', borderRadius: 16, paddingBottom: 32 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '18px 16px 8px 8px', borderBottom: '1px solid #eee' }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            background: 'none', border: 'none', fontSize: 24, color: '#222', cursor: 'pointer', marginRight: 8
          }}
        >&#8592;</button>
        <span style={{ fontWeight: 700, fontSize: 18 }}>Enter your area or apartment name</span>
      </div>

      {/* Search Bar */}
      <div style={{ padding: '16px', position: 'relative' }}>
        <input
          type="text"
          placeholder="Try JP Nagar, Siri Gardenia, etc."
          value={search}
          onChange={handleInput}
          style={{
            width: '100%',
            padding: '12px 16px',
            border: '1px solid #ccc',
            borderRadius: 8,
            fontSize: 16,
            outline: 'none'
          }}
        />
        {suggestions.length > 0 && (
          <ul style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 52,
            background: '#fff',
            border: '1px solid #ff9800',
            borderTop: 'none',
            borderRadius: '0 0 8px 8px',
            maxHeight: 180,
            overflowY: 'auto',
            zIndex: 10,
            margin: 0,
            padding: 0,
            listStyle: 'none',
            boxShadow: '0 2px 8px rgba(255,152,0,0.08)'
          }}>
            {suggestions.map(s => (
              <li
                key={s}
                onClick={() => handleSuggestionClick(s)}
                style={{ padding: '10px 16px', cursor: 'pointer', color: '#6d4c41', fontSize: '1rem' }}
                onMouseDown={e => e.preventDefault()}
              >
                {s}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Use my current location */}
      <div
        style={{
          color: '#ff6600',
          fontWeight: 600,
          padding: '12px 16px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center'
        }}
        onClick={() => alert('Use my current location (to be implemented)')}
      >
        <span style={{ marginRight: 8 }}>📍</span> Use my current location
      </div>

      {/* Add new address */}
      <div
        style={{
          color: '#ff6600',
          fontWeight: 600,
          padding: '12px 16px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center'
        }}
        onClick={handleAddNewAddress}
      >
        <span style={{ marginRight: 8 }}>＋</span> Add new address
      </div>

      {/* Add/Edit Address Modal */}
      {showAddModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <form
            onSubmit={handleSaveNewAddress}
            style={{
              background: '#fff', padding: 24, borderRadius: 12, minWidth: 320, boxShadow: '0 4px 24px rgba(0,0,0,0.12)'
            }}
          >
            <h3 style={{ margin: 0, marginBottom: 16, color: '#ff6600' }}>{editIndex !== null ? 'Edit Address' : 'Add New Address'}</h3>
            <input
              type="text"
              placeholder="Name (e.g. Home, Work, Ajay)"
              value={newName}
              onChange={e => setNewName(e.target.value)}
              required
              style={{ width: '100%', marginBottom: 12, padding: 10, borderRadius: 6, border: '1px solid #ccc' }}
            />
            <textarea
              placeholder="Address"
              value={newAddress}
              onChange={e => setNewAddress(e.target.value)}
              required
              style={{ width: '100%', marginBottom: 12, padding: 10, borderRadius: 6, border: '1px solid #ccc', minHeight: 60 }}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
              <button type="button" onClick={() => setShowAddModal(false)} style={{ padding: '8px 16px', borderRadius: 6, border: 'none', background: '#eee', color: '#333', cursor: 'pointer' }}>Cancel</button>
              <button type="submit" style={{ padding: '8px 16px', borderRadius: 6, border: 'none', background: '#ff6600', color: '#fff', fontWeight: 600, cursor: 'pointer' }}>Save</button>
            </div>
          </form>
        </div>
      )}

      {/* Saved Addresses */}
      <div style={{ padding: '16px 16px 0 16px', color: '#888', fontWeight: 600, fontSize: 13 }}>
        SAVED ADDRESSES
      </div>
      {savedAddresses.map((addr, idx) => (
        <div key={addr.name + addr.address} style={{ padding: '12px 16px', borderBottom: '1px solid #f2f2f2', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', position: 'relative' }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 2 }}>👥 {addr.name}</div>
            <div style={{ color: '#444', fontSize: 14 }}>{addr.address}</div>
          </div>
          <div style={{ fontSize: 22, color: '#888', cursor: 'pointer', position: 'relative' }}>
            <span onClick={() => setMenuIndex(menuIndex === idx ? null : idx)}>⋮</span>
            {menuIndex === idx && (
              <div style={{
                position: 'absolute', right: 0, top: 28, background: '#fff', border: '1px solid #eee', borderRadius: 8,
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)', zIndex: 10, minWidth: 100
              }}>
                <div
                  style={{ padding: '10px 16px', cursor: 'pointer', color: '#333', borderBottom: '1px solid #f2f2f2' }}
                  onClick={() => handleEditAddress(idx)}
                >Edit</div>
                <div
                  style={{ padding: '10px 16px', cursor: 'pointer', color: '#d32f2f' }}
                  onClick={() => handleDeleteAddress(idx)}
                >Delete</div>
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Recent Searches */}
      <div style={{ padding: '16px 16px 0 16px', color: '#888', fontWeight: 600, fontSize: 13 }}>
        RECENT SEARCHES
      </div>
      {recentSearches.map(addr => (
        <div key={addr.name} style={{ padding: '12px 16px', borderBottom: '1px solid #f2f2f2', display: 'flex', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 2 }}>📍 {addr.name}</div>
            <div style={{ color: '#444', fontSize: 14 }}>{addr.address}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Location; 