'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ProLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/pro-account', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', email: form.email, password: form.password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Your account is pending approval. Please wait up to 5 hours or call 0947257165.');
      }

      localStorage.setItem('kolfe_pro_student_session', JSON.stringify({
        account: data.account,
        subscription: data.subscription,
        accessActive: data.accessActive,
        loggedInAt: new Date().toISOString(),
      }));

      router.push('/pro-account');
    } catch (err) {
      setError(err.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
      <div className="glass glass-card" style={{ maxWidth: '540px', margin: '0 auto', padding: '2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <span className="badge">Professional Student Login</span>
          <h1 style={{ marginTop: '0.8rem', marginBottom: '0.6rem', fontSize: '2rem' }}>Welcome back</h1>
          <p style={{ color: 'var(--text-muted)', margin: 0 }}>Sign in to continue your professional monthly access.</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="student@email.com" style={inputStyle} />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Password</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Enter your password" style={inputStyle} />
          </div>

          {error && (
            <div style={{ padding: '0.9rem 1rem', borderRadius: '10px', background: '#fee2e2', color: '#991b1b', fontWeight: 600 }}>
              {error}
            </div>
          )}

          <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', padding: '1rem' }}>
            {loading ? 'Signing in...' : 'Login to Pro Account'}
          </button>
        </form>

        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <Link href="/pro-account" style={{ color: 'var(--primary)', fontWeight: 700 }}>
            Create a new professional account
          </Link>
        </div>
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
