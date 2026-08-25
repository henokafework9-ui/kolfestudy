'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Menu, 
  X, 
  Home, 
  FileText, 
  BookOpen, 
  Newspaper, 
  Info, 
  PhoneCall, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Track scroll position for navbar style enhancement
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navItems = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Exams', href: '/exams', icon: FileText },
    { label: 'Textbook', href: '/textbook', icon: BookOpen },
    { label: 'News', href: '/news', icon: Newspaper },
    { label: 'About', href: '/about', icon: Info },
    { label: 'Contact', href: '/contact', icon: PhoneCall },
  ];

  const isActive = (path) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <>
      <header
        className={`navbar-sticky ${scrolled ? 'navbar-scrolled' : ''}`}
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          background: scrolled ? 'rgba(15, 23, 42, 0.92)' : 'rgba(255, 255, 255, 0.88)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(226, 232, 240, 0.8)',
          transition: 'all 0.3s ease',
          padding: '0.75rem 0',
        }}
      >
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          
          {/* Brand Logo */}
          <Link 
            href="/" 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.75rem', 
              textDecoration: 'none',
              zIndex: 1002
            }}
          >
            <div style={{ position: 'relative' }}>
              <img 
                src="/logo.jpeg" 
                alt="Kolfe Study School Logo" 
                style={{ 
                  width: '42px', 
                  height: '42px', 
                  borderRadius: '50%', 
                  objectFit: 'cover', 
                  border: '2px solid var(--primary)', 
                  boxShadow: '0 2px 10px rgba(99,102,241,0.3)',
                  display: 'block'
                }} 
              />
            </div>
            <span style={{ 
              fontSize: '1.45rem', 
              fontWeight: 800, 
              color: scrolled ? '#ffffff' : 'var(--primary)', 
              letterSpacing: '-0.5px',
              transition: 'color 0.3s ease'
            }}>
              Kolfe<span style={{ color: scrolled ? '#a5b4fc' : 'var(--secondary)' }}> Study</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="nav-desktop">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link 
                  key={item.href} 
                  href={item.href} 
                  className={`nav-item-link ${active ? 'active' : ''}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.45rem 0.85rem',
                    borderRadius: '10px',
                    fontWeight: active ? 700 : 500,
                    fontSize: '0.92rem',
                    color: active 
                      ? scrolled ? '#818cf8' : 'var(--primary)'
                      : scrolled ? '#cbd5e1' : 'var(--text-main)',
                    background: active 
                      ? scrolled ? 'rgba(99, 102, 241, 0.15)' : 'rgba(99, 102, 241, 0.08)'
                      : 'transparent',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <span>{item.label}</span>
                </Link>
              );
            })}

            {/* Admin Portal Button */}
            <Link 
              href="/admin" 
              className="btn-primary nav-admin-btn"
              style={{ 
                padding: '0.45rem 1.1rem', 
                fontSize: '0.88rem', 
                borderRadius: '999px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              <ShieldCheck size={16} />
              <span>Admin Portal</span>
            </Link>
          </nav>

          {/* Mobile Menu Hamburger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="nav-mobile-toggle"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
            style={{
              display: 'none', // Shown via CSS media query below 920px
              background: isOpen 
                ? (scrolled ? 'rgba(255, 255, 255, 0.15)' : 'rgba(99, 102, 241, 0.15)') 
                : (scrolled ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)'),
              border: scrolled ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(0, 0, 0, 0.1)',
              borderRadius: '10px',
              padding: '0.5rem',
              cursor: 'pointer',
              color: scrolled ? '#ffffff' : 'var(--dark)',
              zIndex: 1002,
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
            }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div 
          className="nav-mobile-backdrop"
          onClick={() => setIsOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.6)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            zIndex: 998,
            animation: 'fadeIn 0.25s ease-out'
          }}
        />
      )}

      {/* Mobile Navigation Menu Drawer */}
      <div 
        className={`nav-mobile-drawer ${isOpen ? 'open' : ''}`}
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '85%',
          maxWidth: '360px',
          background: 'linear-gradient(180deg, #0f172a 0%, #1e1b4b 100%)',
          color: '#ffffff',
          zIndex: 999,
          padding: '5rem 1.5rem 2rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: '-10px 0 30px rgba(0, 0, 0, 0.4)',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          overflowY: 'auto',
        }}
      >
        <div>
          {/* Header inside drawer */}
          <div style={{ marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ fontSize: '0.8rem', uppercase: true, textTransform: 'uppercase', letterSpacing: '1.5px', color: '#818cf8', fontWeight: 700 }}>
              Main Menu
            </div>
            <div style={{ fontSize: '0.9rem', color: '#94a3b8', marginTop: '0.2rem' }}>
              Select a section to navigate
            </div>
          </div>

          {/* Links list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {navItems.map((item) => {
              const active = isActive(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.85rem 1rem',
                    borderRadius: '12px',
                    color: active ? '#ffffff' : '#cbd5e1',
                    background: active 
                      ? 'linear-gradient(135deg, rgba(99,102,241,0.4), rgba(139,92,246,0.4))' 
                      : 'rgba(255, 255, 255, 0.04)',
                    border: active 
                      ? '1px solid rgba(129, 140, 248, 0.5)' 
                      : '1px solid rgba(255, 255, 255, 0.05)',
                    fontWeight: active ? 700 : 500,
                    fontSize: '1rem',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <div style={{ 
                      color: active ? '#818cf8' : '#94a3b8',
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      <Icon size={20} />
                    </div>
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight size={18} style={{ color: active ? '#818cf8' : '#64748b' }} />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Bottom Action in Drawer */}
        <div style={{ marginTop: '2rem', pt: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <Link
            href="/admin"
            onClick={() => setIsOpen(false)}
            className="btn-primary"
            style={{
              width: '100%',
              justifyContent: 'center',
              padding: '0.85rem',
              fontSize: '0.95rem',
              borderRadius: '12px'
            }}
          >
            <ShieldCheck size={18} />
            <span>Admin Portal</span>
          </Link>

          <div style={{ marginTop: '1.25rem', textAlign: 'center', fontSize: '0.8rem', color: '#64748b' }}>
            &copy; {new Date().getFullYear()} Kolfe Secondary School
          </div>
        </div>
      </div>
    </>
  );
}
