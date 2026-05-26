import React from 'react';
import Navbar from './Navbar';

const About = () => {
  return (
    <div>
      <Navbar />
      <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px', fontFamily: 'Arial, sans-serif', color: '#333', lineHeight: '1.6' }}>
        <h1 style={{ textAlign: 'center', color: '#1a1a1a', marginBottom: '20px' }}>
          ℹ️ About Our ShopEasy
        </h1>
        
        <p style={{ fontSize: '18px', textAlign: 'center', color: '#666', marginBottom: '40px' }}>
          Welcome to <strong>HJCart</strong>, your number one source for all things. We're dedicated to giving you the very best of products, with a focus on dependability, customer service, and uniqueness.
        </p>

        <hr style={{ border: '0', height: '1px', background: '#eee', margin: '30px 0' }} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginTop: '20px' }}>
          
          <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <h3 style={{ color: '#3b82f6', marginTop: '0' }}>🎯 Our Mission</h3>
            <p style={{ fontSize: '14px' }}>
              Our mission is to provide premium quality products to every customer at affordable prices, ensuring a hassle-free shopping experience.
            </p>
          </div>

          <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <h3 style={{ color: '#10b981', marginTop: '0' }}>⭐ Why Choose Us?</h3>
            <ul style={{ paddingLeft: '20px', fontSize: '14px', margin: '0' }}>
              <li>100% Original & Quality Products</li>
              <li>Fast & Secure Delivery System</li>
              <li>24/7 Customer Support Team</li>
            </ul>
          </div>

        </div>

        <p style={{ textAlign: 'center', marginTop: '40px', fontSize: '16px', fontWeight: '500', color: '#444' }}>
          Thank you for choosing us. Happy Shopping!🛒
        </p>
      </div>
    </div>
  );
};

export default About;