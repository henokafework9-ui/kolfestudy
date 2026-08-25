'use client';

import { useState, useEffect } from 'react';

export default function AdminPage() {
  const [passwordInput, setPasswordInput] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState('');

  const [activeTab, setActiveTab] = useState('exams');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Form states (Add)
  const [examForm, setExamForm] = useState({ title: '', subject: '', date: '', category: 'school' });
  const [newsForm, setNewsForm] = useState({ title: '', date: '', excerpt: '' });

  // Edit State
  const [editingItem, setEditingItem] = useState(null); // item object being edited
  const [editForm, setEditForm] = useState({});

  // File upload state
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const authStatus = sessionStorage.getItem('admin_auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput === 'kolfe@1990study') {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_auth', 'true');
      setLoginError('');
    } else {
      setLoginError('Incorrect password! Try again.');
    }
  };

  const fetchItems = async (tab) => {
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await fetch(`/api/${tab}`);
      const data = await res.json();
      if (res.ok) {
        setItems(Array.isArray(data) ? data : []);
      } else {
        setErrorMsg(data.error || 'Failed to fetch items from Supabase');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to connect to server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchItems(activeTab);
      setEditingItem(null);
    }
  }, [activeTab, isAuthenticated]);

  const uploadFile = async () => {
    if (!selectedFile) return null;
    setUploading(true);
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setUploading(false);
      return data.fileUrl || null;
    } catch (err) {
      console.error(err);
      setUploading(false);
      return null;
    }
  };

  // Delete item from Supabase ("remove old")
  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to remove this old record from Supabase?')) return;
    try {
      const res = await fetch(`/api/${activeTab}?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (res.ok) {
        setItems((prev) => prev.filter((item) => item.id !== id));
        setSuccessMsg('Record removed successfully!');
        setTimeout(() => setSuccessMsg(''), 3000);
      } else {
        alert(data.error || 'Failed to delete record from Supabase.');
      }
    } catch (err) {
      console.error(err);
      alert('Error communicating with server.');
    }
  };

  // Add items to Supabase
  const handleAddExam = async (e) => {
    e.preventDefault();
    if (!examForm.title || !examForm.subject || !examForm.date) return;

    let fileUrl = '';
    if (selectedFile) {
      fileUrl = await uploadFile();
    }

    const res = await fetch('/api/exams', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...examForm, fileUrl }),
    });
    const data = await res.json();

    if (res.ok) {
      setExamForm({ title: '', subject: '', date: '', category: 'school' });
      setSelectedFile(null);
      setSuccessMsg('New exam added to Supabase!');
      setTimeout(() => setSuccessMsg(''), 3000);
      fetchItems('exams');
    } else {
      alert(data.error || 'Failed to add exam to Supabase');
    }
  };

  const handleAddBook = async (e) => {
    e.preventDefault();
    if (!bookForm.title || !bookForm.author || !bookForm.category) return;

    let fileUrl = '';
    if (selectedFile) {
      fileUrl = await uploadFile();
    }

    const res = await fetch('/api/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...bookForm, fileUrl }),
    });
    const data = await res.json();

    if (res.ok) {
      setBookForm({ title: '', author: '', category: '' });
      setSelectedFile(null);
      setSuccessMsg('New book added to Supabase!');
      setTimeout(() => setSuccessMsg(''), 3000);
      fetchItems('books');
    } else {
      alert(data.error || 'Failed to add book to Supabase');
    }
  };

  const handleAddNews = async (e) => {
    e.preventDefault();
    if (!newsForm.title || !newsForm.date || !newsForm.excerpt) return;

    const res = await fetch('/api/news', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newsForm),
    });
    const data = await res.json();

    if (res.ok) {
      setNewsForm({ title: '', date: '', excerpt: '' });
      setSuccessMsg('News published to Supabase!');
      setTimeout(() => setSuccessMsg(''), 3000);
      fetchItems('news');
    } else {
      alert(data.error || 'Failed to add news to Supabase');
    }
  };

  // Change / Edit existing item in Supabase ("change it")
  const startEdit = (item) => {
    setEditingItem(item);
    setEditForm({ ...item });
    setSelectedFile(null);
  };

  const handleUpdateItem = async (e) => {
    e.preventDefault();
    if (!editingItem) return;

    let fileUrl = editForm.fileUrl || '';
    if (selectedFile) {
      const uploaded = await uploadFile();
      if (uploaded) fileUrl = uploaded;
    }

    const payload = { ...editForm, fileUrl };

    try {
      const res = await fetch(`/api/${activeTab}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (res.ok) {
        setSuccessMsg('Record changed & updated in Supabase successfully!');
        setTimeout(() => setSuccessMsg(''), 3000);
        setEditingItem(null);
        fetchItems(activeTab);
      } else {
        alert(data.error || 'Failed to update item in Supabase');
      }
    } catch (err) {
      console.error(err);
      alert('Error updating record.');
    }
  };

  // Password Protection Gate
  if (!isAuthenticated) {
    return (
      <main className="container" style={{ paddingTop: '5rem', display: 'flex', justifyContent: 'center' }}>
        <div className="glass glass-card" style={{ maxWidth: '400px', width: '100%', textAlign: 'center' }}>
          <h2 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Admin Authentication</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
            Please enter password to manage Supabase database.
          </p>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input
              type="password"
              placeholder="Enter Password "
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              style={{
                padding: '0.75rem',
                borderRadius: '8px',
                border: '1px solid var(--glass-border)',
                textAlign: 'center',
                fontSize: '1rem',
                outline: 'none',
                background:'#bec2e2',
              }}
            />
            {loginError && <p style={{ color: '#ef4444', fontSize: '0.85rem', margin: 0 }}>{loginError}</p>}
            <button type="submit" className="btn-primary">Unlock Dashboard</button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ textAlign: 'left', margin: 0 }}>Admin Portal (Supabase DB)</h1>
          <p style={{ color: 'var(--text-muted)', margin: '0.5rem 0 0' }}>Fetch, Change & Remove Exams and News</p>
        </div>
        <button
          onClick={() => {
            sessionStorage.removeItem('admin_auth');
            setIsAuthenticated(false);
          }}
          style={{
            background: 'white',
            border: '1px solid #cbd5e1',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 500,
          }}
        >
          Logout
        </button>
      </div>

      {successMsg && (
        <div style={{ padding: '0.75rem 1rem', background: '#dcfce7', color: '#15803d', borderRadius: '8px', marginBottom: '1rem', fontWeight: 600 }}>
          ✓ {successMsg}
        </div>
      )}

      {errorMsg && (
        <div style={{ padding: '0.75rem 1rem', background: '#fee2e2', color: '#b91c1c', borderRadius: '8px', marginBottom: '1rem' }}>
          ⚠️ {errorMsg}
          <div style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>
            If table does not exist, run <code style={{ background: '#f87171', color: 'white', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>supabase_schema.sql</code> in your Supabase SQL Editor.
          </div>
        </div>
      )}

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', margin: '2rem 0', flexWrap: 'wrap' }}>
        {['exams', 'news', 'messages'].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setSelectedFile(null);
              setEditingItem(null);
            }}
            className="btn-primary"
            style={{
              background: activeTab === tab ? 'linear-gradient(135deg, var(--primary), var(--secondary))' : 'white',
              color: activeTab === tab ? 'white' : 'var(--primary)',
              border: '2px solid var(--primary)',
              textTransform: 'capitalize',
            }}
          >
            {tab === 'messages' ? '✉️ Contact Messages' : `Manage ${tab}`}
          </button>
        ))}
      </div>

      <div className="admin-layout-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
        
        {/* ADD / EDIT Form OR Message Info Side Panel */}
        <div className="glass glass-card">
          <h2 style={{ color: 'var(--primary)', marginBottom: '1.5rem', textTransform: 'capitalize' }}>
            {activeTab === 'messages' 
              ? '📩 Messages Overview' 
              : editingItem 
                ? `Edit / Change ${activeTab.slice(0, -1)} (#${editingItem.id})` 
                : `Add New ${activeTab.slice(0, -1)}`}
          </h2>

          {activeTab === 'messages' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', color: 'var(--text-main)' }}>
              <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.7)', borderRadius: '10px', border: '1px solid var(--glass-border)' }}>
                <h4 style={{ margin: '0 0 0.5rem', color: 'var(--primary)' }}>ℹ️ Student Contact Submissions</h4>
                <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                  All inquiry forms submitted by students or parents from the website's Contact page are stored directly in your Supabase <code>messages</code> database table.
                </p>
              </div>

              <div style={{ padding: '1rem', background: '#e0e7ff', borderRadius: '10px', border: '1px solid #c7d2fe', color: '#3730a3' }}>
                <strong>📬 Total Messages:</strong> {items.length} incoming request{items.length !== 1 ? 's' : ''}
              </div>

              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                💡 <strong>Tip for Admin:</strong> Click on any student's email address to open your default mail client and reply directly. Click <strong>Remove</strong> after processing a message.
              </div>
            </div>
          ) : editingItem ? (
            /* EDIT FORM */
            <form onSubmit={handleUpdateItem} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {activeTab === 'exams' && (
                <>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Exam Type / Category</label>
                    <select
                      value={editForm.category || 'school'}
                      onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                      style={{ width: '100%', background: '#bec2e2', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--glass-border)', fontWeight: 600 }}
                    >
                      <option value="school">🏫 School Exam (Midterm / Final / Model)</option>
                      <option value="national">🇪🇹 National Exam (EUEE / Grade 12 & 8 National)</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Exam Title</label>
                    <input
                      type="text"
                      value={editForm.title || ''}
                      onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                      style={{ width: '100%',background:'#bec2e2', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--glass-border)' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Subject</label>
                    <input
                      type="text"
                      value={editForm.subject || ''}
                      onChange={(e) => setEditForm({ ...editForm, subject: e.target.value })}
                      style={{ width: '100%',background:'#bec2e2', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--glass-border)' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Date / Year</label>
                    <input
                      type="text"
                      value={editForm.date || ''}
                      onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                      style={{ width: '100%',background:'#bec2e2', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--glass-border)' }}
                    />
                  </div>
                </>
              )}

              {activeTab === 'news' && (
                <>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>News Title</label>
                    <input
                      type="text"
                      value={editForm.title || ''}
                      onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                      style={{ width: '100%',background:'#bec2e2', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--glass-border)' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Publish Date</label>
                    <input
                      type="text"
                      value={editForm.date || ''}
                      onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                      style={{ width: '100%',background:'#bec2e2', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--glass-border)' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Excerpt</label>
                    <textarea
                      rows="3"
                      value={editForm.excerpt || ''}
                      onChange={(e) => setEditForm({ ...editForm, excerpt: e.target.value })}
                      style={{ width: '100%',background:'#bec2e2', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--glass-border)', resize: 'vertical' }}
                    />
                  </div>
                </>
              )}

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Change File (Optional)</label>
                <input
                  type="file"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                  style={{ width: '100%',background:'#bec2e2', padding: '0.5rem', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'white' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                <button type="submit" disabled={uploading} className="btn-primary" style={{ flex: 1 }}>
                  {uploading ? 'Uploading File...' : 'Save Changes in Supabase'}
                </button>
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  style={{ padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #cbd5e1', background: 'white', cursor: 'pointer' }}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            /* ADD FORM */
            <>
              {activeTab === 'exams' && (
                <form onSubmit={handleAddExam} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Exam Category / Type</label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                      <button
                        type="button"
                        onClick={() => setExamForm({ ...examForm, category: 'school' })}
                        style={{
                          padding: '0.6rem 0.8rem',
                          borderRadius: '8px',
                          border: examForm.category === 'school' ? '2px solid #4f46e5' : '1px solid #cbd5e1',
                          background: examForm.category === 'school' ? '#e0e7ff' : '#f8fafc',
                          color: examForm.category === 'school' ? '#3730a3' : '#475569',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.4rem',
                          fontSize: '0.85rem'
                        }}
                      >
                        🏫 School Exam
                      </button>
                      <button
                        type="button"
                        onClick={() => setExamForm({ ...examForm, category: 'national' })}
                        style={{
                          padding: '0.6rem 0.8rem',
                          borderRadius: '8px',
                          border: examForm.category === 'national' ? '2px solid #d97706' : '1px solid #cbd5e1',
                          background: examForm.category === 'national' ? '#fef3c7' : '#f8fafc',
                          color: examForm.category === 'national' ? '#92400e' : '#475569',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.4rem',
                          fontSize: '0.85rem'
                        }}
                      >
                        🇪🇹 National Exam
                      </button>
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Exam Title</label>
                    <input
                      type="text"
                      placeholder={examForm.category === 'national' ? "e.g. 2016 Ethiopian National Biology Exam" : "e.g. Biology Final Exam"}
                      value={examForm.title}
                      onChange={(e) => setExamForm({ ...examForm, title: e.target.value })}
                      style={{ width: '100%',background:'#d5d8e7', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--glass-border)' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Subject</label>
                    <input
                      type="text"
                      placeholder="e.g. Biology"
                      value={examForm.subject}
                      onChange={(e) => setExamForm({ ...examForm, subject: e.target.value })}
                      style={{ width: '100%',background:'#d5d8e7', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--glass-border)' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Date / Year</label>
                    <input
                      type="text"
                      placeholder="e.g. July 2026 / 2016 E.C."
                      value={examForm.date}
                      onChange={(e) => setExamForm({ ...examForm, date: e.target.value })}
                      style={{ width: '100%', background:'#d5d8e7',padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--glass-border)' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Upload Exam PDF File</label>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => setSelectedFile(e.target.files[0])}
                      style={{ width: '100%',background:'#d5d8e7', padding: '0.5rem', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'white' }}
                    />
                  </div>
                  <button type="submit" disabled={uploading} className="btn-primary" style={{ marginTop: '1rem' }}>
                    {uploading ? 'Uploading File...' : `Add ${examForm.category === 'national' ? 'National Exam' : 'School Exam'} to Supabase`}
                  </button>
                </form>
              )}

              {activeTab === 'news' && (
                <form onSubmit={handleAddNews} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>News Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Sports Day 2026"
                      value={newsForm.title}
                      onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                      style={{ width: '100%',background:'#d5d8e7', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--glass-border)' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Publish Date</label>
                    <input
                      type="text"
                      placeholder="e.g. Aug 20, 2026"
                      value={newsForm.date}
                      onChange={(e) => setNewsForm({ ...newsForm, date: e.target.value })}
                      style={{ width: '100%',background:'#d5d8e7', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--glass-border)' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Excerpt / Summary</label>
                    <textarea
                      rows="3"
                      placeholder="Brief summary of the news..."
                      value={newsForm.excerpt}
                      onChange={(e) => setNewsForm({ ...newsForm, excerpt: e.target.value })}
                      style={{ width: '100%',background:'#d5d8e7', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--glass-border)', resize: 'vertical' }}
                    />
                  </div>
                  <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }}>Publish News to Supabase</button>
                </form>
              )}
            </>
          )}
        </div>

        {/* List of existing items from Supabase */}
        <div className="glass glass-card">
          <h2 style={{ color: 'var(--primary)', marginBottom: '1.5rem', textTransform: 'capitalize' }}>
            Supabase {activeTab} ({items.length})
          </h2>

          {loading ? (
            <p>Loading records from Supabase...</p>
          ) : items.length === 0 ? (
            <div>
              <p style={{ color: 'var(--text-muted)' }}>No items found in Supabase.</p>
              {activeTab === 'messages' && (
                <div style={{ padding: '1rem', background: '#fffbeb', borderRadius: '10px', border: '1px solid #fef3c7', color: '#92400e', fontSize: '0.85rem', marginTop: '1rem', lineHeight: '1.5' }}>
                  ⚠️ <strong>Messages submitted but not visible?</strong><br />
                  If student forms were submitted but don't show here, Row-Level Security (RLS) on your Supabase <code>student_messages</code> table is blocking <code>SELECT</code> (read) queries.<br /><br />
                  <strong>Fix (1-Minute):</strong> Open your <a href="https://supabase.com/dashboard" target="_blank" rel="noopener noreferrer" style={{ color: '#b45309', fontWeight: 700 }}>Supabase SQL Editor</a> and run:<br />
                  <code style={{ background: '#fef08a', color: '#78350f', padding: '0.3rem 0.6rem', borderRadius: '6px', display: 'inline-block', marginTop: '0.5rem', fontFamily: 'monospace', fontWeight: 700 }}>
                    ALTER TABLE public.student_messages DISABLE ROW LEVEL SECURITY;
                  </code>
                </div>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '520px', overflowY: 'auto' }}>
              {items.map((item) => (
                <div
                  key={item.id}
                  style={{
                    padding: '1rem',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.7)',
                    border: '1px solid var(--glass-border)',
                    display: 'flex',
                    flexDirection: activeTab === 'messages' ? 'column' : 'row',
                    justifyContent: 'space-between',
                    alignItems: activeTab === 'messages' ? 'stretch' : 'center',
                    gap: '1rem',
                  }}
                >
                  <div style={{ flex: 1 }}>
                    {activeTab === 'messages' ? (
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                          <div>
                            <h4 style={{ margin: 0, color: 'var(--text-main)', fontSize: '1.05rem', fontWeight: 700 }}>
                              👤 {item.name}
                            </h4>
                            <a
                              href={`mailto:${item.email}`}
                              style={{ color: 'var(--primary)', fontSize: '0.85rem', textDecoration: 'none', fontWeight: 600 }}
                            >
                              ✉️ {item.email}
                            </a>
                          </div>
                          <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                            {item.grade && (
                              <span
                                style={{
                                  fontSize: '0.75rem',
                                  fontWeight: 700,
                                  padding: '0.2rem 0.6rem',
                                  borderRadius: '999px',
                                  background: '#fef3c7',
                                  color: '#92400e',
                                  border: '1px solid #fde68a',
                                }}
                              >
                                🎓 {item.grade}
                              </span>
                            )}
                            <span
                              style={{
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                padding: '0.2rem 0.6rem',
                                borderRadius: '999px',
                                background: '#e0e7ff',
                                color: '#3730a3',
                                border: '1px solid #c7d2fe',
                              }}
                            >
                              {item.subject}
                            </span>
                          </div>
                        </div>
                        <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.9rem', color: '#334155', lineHeight: '1.5', margin: '0.5rem 0' }}>
                          "{item.message}"
                        </div>
                        {item.created_at && (
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            📅 Received: {new Date(item.created_at).toLocaleString()}
                          </div>
                        )}
                      </div>
                    ) : (
                      <>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                          {activeTab === 'exams' && (
                            <span
                              style={{
                                fontSize: '0.7rem',
                                fontWeight: 800,
                                padding: '0.15rem 0.5rem',
                                borderRadius: '999px',
                                background: item.category === 'national' ? '#fef3c7' : '#e0e7ff',
                                color: item.category === 'national' ? '#92400e' : '#3730a3',
                                border: item.category === 'national' ? '1px solid #fde68a' : '1px solid #c7d2fe',
                                textTransform: 'uppercase',
                              }}
                            >
                              {item.category === 'national' ? '🇪🇹 National' : '🏫 School'}
                            </span>
                          )}
                          <h4 style={{ margin: 0, color: 'var(--text-main)' }}>{item.title}</h4>
                        </div>
                        <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                          {activeTab === 'exams' && `${item.subject} | ${item.date}`}
                          {activeTab === 'news' && `${item.date}`}
                        </p>
                        {item.fileUrl && (
                          <a
                            href={item.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600, display: 'inline-block', marginTop: '0.25rem' }}
                          >
                            📄 Attachment Attached
                          </a>
                        )}
                      </>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', justifyContent: activeTab === 'messages' ? 'flex-end' : 'flex-start' }}>
                    {activeTab !== 'messages' && (
                      <button
                        onClick={() => startEdit(item)}
                        style={{
                          background: '#3b82f6',
                          color: 'white',
                          border: 'none',
                          padding: '0.4rem 0.8rem',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '0.85rem',
                          fontWeight: 600,
                        }}
                      >
                        Edit
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(item.id)}
                      style={{
                        background: '#ef4444',
                        color: 'white',
                        border: 'none',
                        padding: '0.4rem 0.8rem',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
