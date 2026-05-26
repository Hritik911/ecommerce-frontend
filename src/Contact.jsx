import React from 'react';
import Navbar from './Navbar';

const Contact = () => {
  return (
    <div>
      <Navbar />
      <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', fontFamily: 'Arial, sans-serif', color: '#333' }}>
        <h1 style={{ textAlign: 'center', color: '#1a1a1a', marginBottom: '10px' }}>📞 Contact Us</h1>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>Any questions or feedback? Drop us a message below.</p>
        
        <form style={{ display: 'flex', flexDirection: 'column', gap: '15px' }} onSubmit={(e) => e.preventDefault()}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={{ fontWeight: 'bold', fontSize: '14px' }}>Full Name</label>
            <input type="text" placeholder="Enter your name" style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' }} required />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={{ fontWeight: 'bold', fontSize: '14px' }}>Email Address</label>
            <input type="email" placeholder="Enter your email" style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' }} required />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={{ fontWeight: 'bold', fontSize: '14px' }}>Message</label>
            <textarea rows="5" placeholder="Type your message here..." style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px', resize: 'vertical' }} required></textarea>
          </div>

          <button type="submit" style={{ padding: '12px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>
            Send Message
          </button>
        </form>

        <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #eee', textAlign: 'center', fontSize: '14px', color: '#666', display: 'flex', justifyContent: 'space-around' }}>
          <div>
            <strong>📧 Email</strong>
            <p style={{ margin: '5px 0 0 0' }}>support@HJCart.com</p>
          </div>
          <div>
            <strong>📍 Location</strong>
            <p style={{ margin: '5px 0 0 0' }}>Batala , Punjab , India</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;