'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const MONTHLY_FEE_ETB = 50;

export default function ProAccountPage() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    schoolName: '',
    password: '',
    transactionNumber: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [session, setSession] = useState(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const currentSession = JSON.parse(localStorage.getItem('kolfe_pro_student_session') || 'null');
      setSession(currentSession);
    } catch {
      setSession(null);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      if (!form.fullName || !form.email || !form.password || !form.transactionNumber) {
        throw new Error('Please fill in your name, email, password, and transaction number.');
      }

      const response = await fetch('/api/pro-account', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: form.fullName,
          email: form.email,
          phone: form.phone,
          schoolName: form.schoolName,
          password: form.password,
          transactionNumber: form.transactionNumber,
          amount: MONTHLY_FEE_ETB,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Unable to create account or save payment.');
      }

      setMessage(`Your professional account request has been submitted successfully. Please wait up to 5 hours for approval, or call 0947257165. Your monthly payment of ${MONTHLY_FEE_ETB} ETB was recorded.`);
      setForm({
        fullName: '',
        email: '',
        phone: '',
        schoolName: '',
        password: '',
        transactionNumber: '',
      });
    } catch (err) {
      setError(err.message || 'Unable to create account or save payment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
      <div className="glass glass-card" style={{ maxWidth: '760px', margin: '0 auto', padding: '2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span className="badge">Professional Student Access</span>
          <h1 style={{ marginTop: '0.8rem', marginBottom: '0.6rem', fontSize: '2.2rem' }}>Create Your Pro Account</h1>
          <p style={{ color: 'var(--text-muted)', margin: 0 }}>
            Create a professional student account and pay monthly to unlock premium access.
          </p>
          {session ? (
            <div style={{ marginTop: '0.75rem', color: '#166534', background: '#dcfce7', border: '1px solid #bbf7d0', borderRadius: '10px', padding: '0.7rem 0.9rem', fontWeight: 700 }}>
              Signed in as {session.account?.full_name || session.account?.email || 'Professional student'}
            </div>
          ) : (
            <div style={{ marginTop: '0.75rem' }}>
              <Link href="/pro-login" className="btn-secondary" style={{ display: 'inline-block', padding: '0.7rem 1rem', borderRadius: '10px' }}>
                Already have an account? Log in here
              </Link>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Full name</label>
              <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Student full name" style={inputStyle} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Email</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="student@email.com" style={inputStyle} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Phone number</label>
              <input name="phone" value={form.phone} onChange={handleChange} placeholder="+251 ..." style={inputStyle} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>School name</label>
              <input name="schoolName" value={form.schoolName} onChange={handleChange} placeholder="Kolfe Secondary School" style={inputStyle} />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Password</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Create a password" style={inputStyle} />
          </div>

          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Monthly plan</div>
                <div style={{ fontSize: '1.3rem', fontWeight: 800 }}>Professional Monthly Telebirr 0947257165  </div>
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--primary)' }} pay>{MONTHLY_FEE_ETB} ETB</div>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Transaction number</label>
            <input name="transactionNumber" value={form.transactionNumber} onChange={handleChange} placeholder="e.g. TXN-2026001" style={inputStyle} />
          </div>

          {error && (
            <div style={{ padding: '0.9rem 1rem', borderRadius: '10px', background: '#fee2e2', color: '#991b1b', fontWeight: 600 }}>
              {error}
            </div>
          )}

          {message && (
            <div style={{ padding: '0.9rem 1rem', borderRadius: '10px', background: '#dcfce7', color: '#166534', fontWeight: 600 }}>
              {message}
            </div>
          )}

          <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', padding: '1rem' }}>
            {loading ? 'Creating account...' : 'Create Pro Account & Pay Monthly'}
          </button>
        </form>
      </div>
    </main>
  );
}

const inputStyle = {
  width: '100%',
  padding: '0.8rem 1rem',
  borderRadius: '10px',
  border: '1px solid #cbd5e1',
  background: '#f8fafc',
  color: '#0f172a',
  fontSize: '0.96rem',
  outline: 'none',
};
