'use client';

import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    grade: 'Grade 12',
    subject: 'General Inquiry',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg('Please fill in all required fields (Name, Email, and Message).');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccessMsg('🎉 Your message has been sent successfully! Our administrative team will review it soon.');
        setFormData({
          name: '',
          email: '',
          grade: 'Grade 12',
          subject: 'General Inquiry',
          message: '',
        });
      } else {
        setErrorMsg(data.error || 'Failed to submit contact message. Please try again.');
      }
    } catch (err) {
      console.error('Contact form submission error:', err);
      setErrorMsg('Network error. Unable to reach the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container" style={{ paddingTop: '2rem' }}>
      <div className="page-header">
        <h1>Contact Us</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
          Have questions or need assistance? We're here to help!
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
        
        {/* Contact Information & Image Banner */}
        <div>
          <div className="img-card" style={{ marginBottom: '1.5rem', height: '220px' }}>
            <img src="/call.jpeg" alt="Contact Support Team" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          <div className="glass glass-card" style={{ padding: '1.75rem' }}>
            <h3 style={{ fontSize: '1.3rem', color: 'var(--primary)', marginBottom: '1.25rem' }}>Get In Touch</h3>
            
            <div className="contact-item" style={{ color: 'var(--text-main)', marginBottom: '1.2rem' }}>
              <span style={{ fontSize: '1.4rem' }}>📍</span>
              <div>
                <strong>School Campus Address:</strong>
                <div>Kolfe Keraniyo Sub-City, Woreda 09</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Addis Ababa, Ethiopia</div>
              </div>
            </div>

            <div className="contact-item" style={{ color: 'var(--text-main)', marginBottom: '1.2rem' }}>
              <span style={{ fontSize: '1.4rem' }}>📞</span>
              <div>
                <strong>Telephone Support:</strong>
                <div> 0947257165</div>
                <div></div>
              </div>
            </div>

            <div className="contact-item" style={{ color: 'var(--text-main)', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '1.4rem' }}>✉️</span>
              <div>
                <strong>Email Address:</strong>
              

                <div>kolfestudy1@gmail.com</div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '1rem' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.75rem', fontWeight: 600 }}>
                FOLLOW OUR SOCIAL CHANNELS
              </div>
              <div className="social-links">
                <a href="https://t.me/KOLFEHIGHSCHOOL" target="_blank" rel="noopener noreferrer" className="social-icon-btn" title="Telegram">
                  <img src="/telegram.png" alt="Telegram" />
                </a>
               
                <a href="https://www.youtube.com/@kolfegeneralsecondary/featured" target="_blank" rel="noopener noreferrer" className="social-icon-btn" title="YouTube">
                  <img src="/youtube.png" alt="YouTube" />
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Contact Form */}
        <div className="glass glass-card" style={{ padding: '2rem' }}>
          <h2 style={{ fontSize: '1.6rem', color: 'var(--dark)', marginBottom: '0.5rem' }}>Send Us a Message</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
            Fill out the form below and our administrative team will get back to you within 24 hours.
          </p>

          {successMsg && (
            <div style={{ padding: '0.85rem 1rem', background: '#dcfce7', color: '#15803d', borderRadius: '10px', marginBottom: '1.25rem', fontWeight: 600, fontSize: '0.95rem', border: '1px solid #bbf7d0' }}>
              {successMsg}
            </div>
          )}

          {errorMsg && (
            <div style={{ padding: '0.85rem 1rem', background: '#fee2e2', color: '#b91c1c', borderRadius: '10px', marginBottom: '1.25rem', fontWeight: 500, fontSize: '0.95rem', border: '1px solid #fecaca' }}>
              ⚠️ {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, fontSize: '0.9rem' }}>Full Name *</label>
              <input 
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '10px', border: '1px solid #cbd5e1', background: 'rgba(255,255,255,0.8)', outline: 'none', fontSize: '0.95rem' }} 
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, fontSize: '0.9rem' }}>Email Address *</label>
              <input 
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '10px', border: '1px solid #cbd5e1', background: 'rgba(255,255,255,0.8)', outline: 'none', fontSize: '0.95rem' }} 
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, fontSize: '0.9rem' }}>Grade Level / Student Category</label>
              <select 
                name="grade"
                value={formData.grade}
                onChange={handleChange}
                style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '10px', border: '1px solid #cbd5e1', background: 'rgba(255,255,255,0.8)', outline: 'none', fontSize: '0.95rem' }}
              >
                <option value="Grade 12">Grade 12</option>
                <option value="Grade 11">Grade 11</option>
                <option value="Grade 10">Grade 10</option>
                <option value="Grade 9">Grade 9</option>
                <option value="Parent / General">Parent / General Visitor</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, fontSize: '0.9rem' }}>Subject</label>
              <select 
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '10px', border: '1px solid #cbd5e1', background: 'rgba(255,255,255,0.8)', outline: 'none', fontSize: '0.95rem' }}
              >
                <option value="General Inquiry">General Inquiry</option>
                <option value="Past Exam Assistance">Past Exam Assistance</option>
                <option value="Textbook / Library Question">Textbook / Library Question</option>
                <option value="Parent-Teacher Meeting Request">Parent-Teacher Meeting Request</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, fontSize: '0.9rem' }}>Your Message *</label>
              <textarea 
                rows="5"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your detailed inquiry here..."
                required
                style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '10px', border: '1px solid #cbd5e1', background: 'rgba(255,255,255,0.8)', outline: 'none', resize: 'vertical', fontSize: '0.95rem' }} 
              ></textarea>
            </div>

            <button 
              type="submit" 
              disabled={loading} 
              className="btn-primary" 
              style={{ marginTop: '0.5rem', justifyContent: 'center', opacity: loading ? 0.7 : 1 }}
            >
              {loading ? '⏳ Sending Message...' : '✉️ Send Message'}
            </button>
          </form>
        </div>

      </div>
    </main>
  );
}
