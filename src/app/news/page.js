'use client';

import { useState, useEffect } from 'react';

export default function News() {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/news')
      .then((res) => res.json())
      .then((data) => {
        setNewsItems(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <main className="container" style={{ paddingTop: '2rem' }}>
      <div className="page-header">
        <h1>School News</h1>
        <p style={{ color: 'var(--text-muted)' }}>Stay informed with the latest updates and announcements.</p>
      </div>
      
      {loading ? (
        <p style={{ textAlign: 'center' }}>Loading news...</p>
      ) : newsItems.length === 0 ? (
        <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No news articles posted yet.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '800px', margin: '0 auto' }}>
          {newsItems.map((item) => (
            <div key={item.id} className="glass glass-card">
              <h3 style={{ margin: '0 0 0.5rem', color: 'var(--primary)', fontSize: '1.25rem' }}>{item.title}</h3>
              <p style={{ margin: '0 0 1rem', color: '#94a3b8', fontSize: '0.85rem' }}>{item.date}</p>
              <p style={{ margin: '0 0 1rem', color: 'var(--text-main)' }}>{item.excerpt}</p>
              <a href="#" style={{ color: 'var(--secondary)', fontWeight: 600 }}>Read Full Story &rarr;</a>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
