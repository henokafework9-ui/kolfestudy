'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen, BrainCircuit, Check, Copy, FileText, Newspaper, ShieldCheck, Smartphone, Trophy } from 'lucide-react';

const MONTHLY_FEE_ETB = 65;
const TELEBIRR_NUMBER = '0947257165';

const proBenefits = [
  {
    icon: FileText,
    title: 'Past exam library',
    text: 'Prepare with school and national exam papers arranged by grade and subject.',
    color: '#6366f1',
  },
  {
    icon: BookOpen,
    title: 'Digital textbooks',
    text: 'Open curriculum textbooks and revision materials whenever you need them.',
    color: '#8b5cf6',
  },
  {
    icon: BrainCircuit,
    title: 'AI study tools',
    text: 'Use guided AI tools to understand difficult topics and revise with confidence.',
    color: '#0ea5e9',
  },
  {
    icon: Trophy,
    title: 'Study challenges',
    text: 'Keep your momentum with academic challenges designed for active learners.',
    color: '#f59e0b',
  },
  {
    icon: Newspaper,
    title: 'School updates',
    text: 'Stay informed about important school news and academic announcements.',
    color: '#ec4899',
  },
  {
    icon: ShieldCheck,
    title: 'One trusted account',
    text: 'Your approved Pro account keeps all your learning resources in one place.',
    color: '#10b981',
  },
];

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
  const [copied, setCopied] = useState(false);

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

  const copyTelebirrNumber = async () => {
    try {
      await navigator.clipboard.writeText(TELEBIRR_NUMBER);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setError('Unable to copy the Telebirr number. Please copy it manually.');
    }
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
    <main className="container" style={{ paddingTop: '3rem', paddingBottom: '4rem' }}>
      <section className="pro-hero">
        <div>
          <span className="pro-eyebrow"><SparkleIcon /> KOLFE STUDY PRO</span>
          <h1>Everything you need to study smarter.</h1>
          <p>Get your learning resources, exam preparation, and school updates together in one professional student account.</p>
          <div className="pro-hero-points">
            <span><Check size={16} /> Full learning portal access</span>
            <span><Check size={16} /> Only {MONTHLY_FEE_ETB} ETB per month</span>
          </div>
        </div>
        <div className="pro-price-card">
          <span>Professional Monthly</span>
          <strong>{MONTHLY_FEE_ETB} <small>ETB</small></strong>
          <p>Less than the cost of one study handout.</p>
          <a href="#create-account" className="pro-price-action">Start learning <ArrowRight size={17} /></a>
        </div>
      </section>

      <section aria-labelledby="pro-benefits-title" style={{ margin: '2.5rem 0 3rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <span className="badge">Your Pro membership includes</span>
          <h2 id="pro-benefits-title" style={{ fontSize: 'clamp(1.65rem, 4vw, 2.25rem)', marginTop: '0.35rem' }}>More tools for every study day</h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '650px', margin: '0.4rem auto 0' }}>A simple monthly plan that gives you the resources to prepare, practise, and stay on track.</p>
        </div>
        <div className="pro-benefit-grid">
          {proBenefits.map(({ icon: Icon, title, text, color }) => (
            <article className="pro-benefit" key={title}>
              <span className="pro-benefit-icon" style={{ color, background: `${color}16` }}><Icon size={22} /></span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div id="create-account" className="glass glass-card" style={{ maxWidth: '760px', margin: '0 auto', padding: '2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span className="badge">Professional Student Access</span>
          <h2 style={{ marginTop: '0.8rem', marginBottom: '0.6rem', fontSize: '2.2rem' }}>Create Your Pro Account</h2>
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

          <div className="pro-payment-card">
            <div className="pro-payment-heading">
              <span className="pro-payment-icon"><Smartphone size={22} /></span>
              <div>
                <div className="pro-payment-label">Your monthly plan</div>
                <div className="pro-payment-title">Professional Monthly</div>
              </div>
              <div className="pro-payment-price"><strong>{MONTHLY_FEE_ETB}</strong><span>ETB / month</span></div>
            </div>
            <div className="pro-telebirr-details">
              <div>
                <span className="pro-telebirr-badge">telebirr</span>
                <span className="pro-telebirr-instruction">Send your payment to</span>
              </div>
              <div className="pro-telebirr-actions">
                <a href={`tel:${TELEBIRR_NUMBER}`} className="pro-telebirr-number" aria-label="Call Telebirr number 0947 257 165">0947 257 165</a>
                <button type="button" className={`pro-copy-button${copied ? ' is-copied' : ''}`} onClick={copyTelebirrNumber} aria-label="Copy Telebirr number">
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
            <p className="pro-payment-note"><Check size={15} /> After paying, enter the transaction number below to submit your account request.</p>
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

function SparkleIcon() {
  return <span aria-hidden="true" style={{ fontSize: '1rem', lineHeight: 1 }}>✦</span>;
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
