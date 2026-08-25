import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer-main">
      <div className="container">
        <div className="footer-grid">
          
          {/* Brand & Mission */}
          <div className="footer-brand">
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
              <img 
                src="/logo.jpeg" 
                alt="Kolfe Study Logo" 
                style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #818cf8' }} 
              />
              <span style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.5px' }}>
                Kolfe<span style={{ color: '#818cf8' }}>Study</span>
              </span>
            </Link>
            <p>
              Empowering students with accessible past exam archives, digital textbooks, and real-time academic news to build a brighter educational future.
            </p>
            
            {/* Social Links with public images */}
            <div>
              <div style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', color: '#94a3b8', marginBottom: '0.75rem', fontWeight: 600 }}>
                Connect With Us
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

          {/* Quick Nav Links */}
          <div>
            <h4 className="footer-title">Navigation</h4>
            <ul className="footer-links">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/exams">Past Exams</Link></li>
              <li><Link href="/textbook">Textbook Repository</Link></li>
              <li><Link href="/news">Latest News</Link></li>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
              <li><Link href="/admin">Admin Portal</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="footer-title">Contact Us</h4>
            <div className="contact-item">
              <span className="contact-icon">📍</span>
              <div>
                <strong>Location:</strong>
                <div>Kolfe Keraniyo Sub-City, Woreda 09</div>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Addis Ababa, Ethiopia</div>
              </div>
            </div>

            <div className="contact-item">
              <span className="contact-icon">📞</span>
              <div>
                <strong>Phone Numbers:</strong>
                <div>0910443488</div>
                <div></div>
              </div>
            </div>

            <div className="contact-item">
              <span className="contact-icon">✉️</span>
              <div>
                <strong>Email:</strong>
                <div>info.kolfegeneralsecond<br></br>ary.school@addislearning.edu.et</div>
              </div>
            </div>
          </div>

          {/* School Hours & Updates */}
          <div>
            <h4 className="footer-title">School Hours</h4>
            <div style={{ color: '#cbd5e1', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed rgba(255,255,255,0.1)', paddingBottom: '0.4rem' }}>
                <span>Mon - Fri:</span>
                <strong style={{ color: '#818cf8' }}>1:15 AM - 5:30 PM</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed rgba(255,255,255,0.1)', paddingBottom: '0.4rem' }}>
                <span>Saturday:</span>
                <strong style={{ color: '#818cf8' }}>8:00 AM - 12:30 AM</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Sunday:</span>
                <span style={{ color: '#ef4444' }}>Closed</span>
              </div>
            </div>

            <div style={{ marginTop: '1.5rem', background: 'rgba(255,255,255,0.05)', padding: '0.8rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Academic Year: <strong>2026/2027</strong></div>
              <div style={{ fontSize: '0.85rem', color: '#818cf8', marginTop: '0.2rem' }}>🎓 Excellence in Education</div>
            </div>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom">
          <div>
            &copy; {new Date().getFullYear()} <strong>Kolfe Study</strong>. All Rights Reserved.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <Link href="/about" style={{ color: '#94a3b8' }}>Privacy Policy</Link>
            <Link href="/about" style={{ color: '#94a3b8' }}>Terms of Service</Link>
            <Link href="/contact" style={{ color: '#94a3b8' }}>Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
