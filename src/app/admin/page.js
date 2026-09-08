'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Shield,
  FileText,
  Newspaper,
  Mail,
  UserCheck,
  LogOut,
  Plus,
  Pencil,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  Upload,
  RefreshCw,
} from 'lucide-react';

const TABS = [
  { id: 'exams', label: 'Exams', icon: FileText },
  { id: 'news', label: 'News', icon: Newspaper },
  { id: 'messages', label: 'Messages', icon: Mail },
  { id: 'accounts', label: 'Accounts', icon: UserCheck },
];

const ADMIN_PASSWORD = 'kolfe@1990study';

function flash(setter, message) {
  setter(message);
  setTimeout(() => setter(''), 3500);
}

export default function AdminPage() {
  const [passwordInput, setPasswordInput] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState('');

  const [activeTab, setActiveTab] = useState('exams');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const [examForm, setExamForm] = useState({ title: '', subject: '', date: '', category: 'school' });
  const [newsForm, setNewsForm] = useState({ title: '', date: '', excerpt: '' });
  const [editingItem, setEditingItem] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [accountFilter, setAccountFilter] = useState('all');
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    if (sessionStorage.getItem('admin_auth') === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const fetchItems = useCallback(async (tab) => {
    setLoading(true);
    setErrorMsg('');
    try {
      const endpoint = tab === 'accounts' ? '/api/admin/accounts' : `/api/${tab}`;
      const res = await fetch(endpoint);
      const data = await res.json();
      if (res.ok) {
        setItems(Array.isArray(data) ? data : []);
      } else {
        setErrorMsg(data.error || 'Failed to fetch data');
      }
    } catch {
      setErrorMsg('Failed to connect to server.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchItems(activeTab);
      setEditingItem(null);
      setSelectedFile(null);
    }
  }, [activeTab, isAuthenticated, fetchItems]);

  const pendingAccountCount = useMemo(
    () => (activeTab === 'accounts' ? items.filter((a) => !a.is_active).length : 0),
    [items, activeTab]
  );

  const filteredAccounts = useMemo(() => {
    if (activeTab !== 'accounts') return items;
    if (accountFilter === 'pending') return items.filter((a) => !a.is_active);
    if (accountFilter === 'active') return items.filter((a) => a.is_active);
    return items;
  }, [items, activeTab, accountFilter]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_auth', 'true');
      setLoginError('');
    } else {
      setLoginError('Incorrect password. Please try again.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth');
    setIsAuthenticated(false);
  };

  const uploadFile = async () => {
    if (!selectedFile) return null;
    setUploading(true);
    const formData = new FormData();
    formData.append('file', selectedFile);
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      return data.fileUrl || null;
    } catch {
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this record?')) return;
    const endpoint = activeTab === 'accounts' ? null : `/api/${activeTab}?id=${id}`;
    if (!endpoint) return;
    try {
      const res = await fetch(endpoint, { method: 'DELETE' });
      const data = await res.json();
      if (res.ok) {
        setItems((prev) => prev.filter((item) => item.id !== id));
        flash(setSuccessMsg, 'Record deleted successfully.');
      } else {
        alert(data.error || 'Failed to delete record.');
      }
    } catch {
      alert('Error communicating with server.');
    }
  };

  const handleAddExam = async (e) => {
    e.preventDefault();
    if (!examForm.title || !examForm.subject || !examForm.date) return;
    let fileUrl = '';
    if (selectedFile) fileUrl = (await uploadFile()) || '';
    const res = await fetch('/api/exams', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...examForm, fileUrl }),
    });
    const data = await res.json();
    if (res.ok) {
      setExamForm({ title: '', subject: '', date: '', category: 'school' });
      setSelectedFile(null);
      flash(setSuccessMsg, 'Exam added successfully.');
      fetchItems('exams');
    } else {
      alert(data.error || 'Failed to add exam.');
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
      flash(setSuccessMsg, 'News published successfully.');
      fetchItems('news');
    } else {
      alert(data.error || 'Failed to add news.');
    }
  };

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
    try {
      const res = await fetch(`/api/${activeTab}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...editForm, fileUrl }),
      });
      const data = await res.json();
      if (res.ok) {
        flash(setSuccessMsg, 'Record updated successfully.');
        setEditingItem(null);
        fetchItems(activeTab);
      } else {
        alert(data.error || 'Failed to update record.');
      }
    } catch {
      alert('Error updating record.');
    }
  };

  const handleAccountAction = async (account, action) => {
    const label = action === 'approve' ? 'approve' : 'revoke access for';
    if (!confirm(`Are you sure you want to ${label} ${account.full_name || account.email}?`)) return;
    setActionLoading(`${action}-${account.id}`);
    try {
      const res = await fetch('/api/admin/accounts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, accountId: account.id, email: account.email }),
      });
      const data = await res.json();
      if (res.ok) {
        flash(setSuccessMsg, data.message || 'Account updated.');
        fetchItems('accounts');
      } else {
        alert(data.error || 'Failed to update account.');
      }
    } catch {
      alert('Error updating account.');
    } finally {
      setActionLoading(null);
    }
  };

  const switchTab = (tab) => {
    setActiveTab(tab);
    setEditingItem(null);
    setSelectedFile(null);
    if (tab === 'accounts') setAccountFilter('all');
  };

  if (!isAuthenticated) {
    return (
      <main className="container" style={{ paddingTop: '5rem', paddingBottom: '4rem' }}>
        <div className="glass glass-card admin-login-card">
          <div className="admin-login-icon">
            <Shield size={32} />
          </div>
          <h2 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>Admin Portal</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
            Enter your admin password to manage content and student accounts.
          </p>
          <form onSubmit={handleLogin} className="admin-form-grid">
            <input
              type="password"
              placeholder="Admin password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="admin-input"
              style={{ textAlign: 'center' }}
            />
            {loginError && <p style={{ color: '#ef4444', fontSize: '0.85rem', margin: 0 }}>{loginError}</p>}
            <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              <Shield size={18} /> Unlock Dashboard
            </button>
          </form>
        </div>
      </main>
    );
  }

  const renderNavButton = (tab) => {
    const Icon = tab.icon;
    const isActive = activeTab === tab.id;
    const badge = tab.id === 'accounts'
      ? items.filter((a) => !a.is_active).length
      : activeTab === tab.id ? items.length : null;

    return (
      <button
        key={tab.id}
        type="button"
        onClick={() => switchTab(tab.id)}
        className={`admin-nav-btn${isActive ? ' active' : ''}`}
      >
        <Icon size={18} />
        {tab.label}
        {badge > 0 && isActive && (
          <span className="admin-nav-badge">{badge}</span>
        )}
      </button>
    );
  };

  return (
    <main className="container" style={{ paddingTop: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 800, margin: 0, background: 'linear-gradient(135deg, var(--primary), var(--secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Kolfe Study Admin
          </h1>
          <p style={{ color: 'var(--text-muted)', margin: '0.25rem 0 0', fontSize: '0.9rem' }}>
            Manage exams, news, messages, and professional account approvals
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            type="button"
            onClick={() => fetchItems(activeTab)}
            className="btn-secondary"
            style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
          >
            <RefreshCw size={16} /> Refresh
          </button>
          <button
            type="button"
            onClick={handleLogout}
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'white', border: '1px solid #cbd5e1', padding: '0.5rem 1rem', borderRadius: '999px', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>

      {successMsg && <div className="admin-alert success">✓ {successMsg}</div>}
      {errorMsg && <div className="admin-alert error">⚠ {errorMsg}</div>}

      <div className="admin-mobile-tabs">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => switchTab(tab.id)}
              className={`admin-mobile-tab${activeTab === tab.id ? ' active' : ''}`}
            >
              <Icon size={15} /> {tab.label}
            </button>
          );
        })}
      </div>

      <div className="admin-shell">
        <aside className="admin-sidebar">
          <p className="admin-sidebar-title">Management</p>
          {TABS.map(renderNavButton)}
        </aside>

        <div>
          <div className="admin-stats-grid">
            <div className="admin-stat-card">
              <div className="admin-stat-icon" style={{ background: '#e0e7ff', color: '#3730a3' }}>
                <FileText size={22} />
              </div>
              <div>
                <div className="admin-stat-value">{activeTab === 'exams' ? items.length : '—'}</div>
                <div className="admin-stat-label">Exams</div>
              </div>
            </div>
            <div className="admin-stat-card">
              <div className="admin-stat-icon" style={{ background: '#fce7f3', color: '#be185d' }}>
                <Newspaper size={22} />
              </div>
              <div>
                <div className="admin-stat-value">{activeTab === 'news' ? items.length : '—'}</div>
                <div className="admin-stat-label">News</div>
              </div>
            </div>
            <div className="admin-stat-card">
              <div className="admin-stat-icon" style={{ background: '#dbeafe', color: '#1d4ed8' }}>
                <Mail size={22} />
              </div>
              <div>
                <div className="admin-stat-value">{activeTab === 'messages' ? items.length : '—'}</div>
                <div className="admin-stat-label">Messages</div>
              </div>
            </div>
            <div className="admin-stat-card">
              <div className="admin-stat-icon" style={{ background: '#fef3c7', color: '#92400e' }}>
                <Clock size={22} />
              </div>
              <div>
                <div className="admin-stat-value">
                  {activeTab === 'accounts' ? items.filter((a) => !a.is_active).length : '—'}
                </div>
                <div className="admin-stat-label">Pending Approval</div>
              </div>
            </div>
          </div>

          {activeTab === 'accounts' ? (
            <AccountsPanel
              accounts={filteredAccounts}
              pendingCount={pendingAccountCount}
              loading={loading}
              accountFilter={accountFilter}
              setAccountFilter={setAccountFilter}
              actionLoading={actionLoading}
              onApprove={(a) => handleAccountAction(a, 'approve')}
              onRevoke={(a) => handleAccountAction(a, 'revoke')}
            />
          ) : activeTab === 'messages' ? (
            <MessagesPanel items={items} loading={loading} onDelete={handleDelete} />
          ) : (
            <CrudPanel
              activeTab={activeTab}
              items={items}
              loading={loading}
              editingItem={editingItem}
              editForm={editForm}
              setEditForm={setEditForm}
              examForm={examForm}
              setExamForm={setExamForm}
              newsForm={newsForm}
              setNewsForm={setNewsForm}
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
              uploading={uploading}
              onAddExam={handleAddExam}
              onAddNews={handleAddNews}
              onUpdate={handleUpdateItem}
              onEdit={startEdit}
              onDelete={handleDelete}
              onCancelEdit={() => setEditingItem(null)}
            />
          )}
        </div>
      </div>
    </main>
  );
}

function CrudPanel({
  activeTab, items, loading, editingItem, editForm, setEditForm,
  examForm, setExamForm, newsForm, setNewsForm,
  selectedFile, setSelectedFile, uploading,
  onAddExam, onAddNews, onUpdate, onEdit, onDelete, onCancelEdit,
}) {
  const tabLabel = activeTab === 'exams' ? 'Exam' : 'News';

  return (
    <div className="admin-layout-grid">
      <div className="admin-panel">
        <div className="admin-panel-header">
          <h2>{editingItem ? `Edit ${tabLabel}` : `Add New ${tabLabel}`}</h2>
          {editingItem && (
            <button type="button" onClick={onCancelEdit} className="btn-secondary" style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem' }}>
              Cancel Edit
            </button>
          )}
        </div>

        {editingItem ? (
          <form onSubmit={onUpdate} className="admin-form-grid">
            {activeTab === 'exams' && (
              <>
                <div className="admin-field">
                  <label>Category</label>
                  <select
                    className="admin-select"
                    value={editForm.category || 'school'}
                    onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                  >
                    <option value="school">School Exam</option>
                    <option value="national">National Exam</option>
                  </select>
                </div>
                <div className="admin-field">
                  <label>Title</label>
                  <input className="admin-input" value={editForm.title || ''} onChange={(e) => setEditForm({ ...editForm, title: e.target.value })} />
                </div>
                <div className="admin-field">
                  <label>Subject</label>
                  <input className="admin-input" value={editForm.subject || ''} onChange={(e) => setEditForm({ ...editForm, subject: e.target.value })} />
                </div>
                <div className="admin-field">
                  <label>Date / Year</label>
                  <input className="admin-input" value={editForm.date || ''} onChange={(e) => setEditForm({ ...editForm, date: e.target.value })} />
                </div>
              </>
            )}
            {activeTab === 'news' && (
              <>
                <div className="admin-field">
                  <label>Title</label>
                  <input className="admin-input" value={editForm.title || ''} onChange={(e) => setEditForm({ ...editForm, title: e.target.value })} />
                </div>
                <div className="admin-field">
                  <label>Publish Date</label>
                  <input className="admin-input" value={editForm.date || ''} onChange={(e) => setEditForm({ ...editForm, date: e.target.value })} />
                </div>
                <div className="admin-field">
                  <label>Excerpt</label>
                  <textarea className="admin-textarea" rows={3} value={editForm.excerpt || ''} onChange={(e) => setEditForm({ ...editForm, excerpt: e.target.value })} />
                </div>
              </>
            )}
            {activeTab === 'exams' && (
              <div className="admin-field">
                <label>Replace PDF (optional)</label>
                <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => setSelectedFile(e.target.files[0])} className="admin-input" />
              </div>
            )}
            <button type="submit" disabled={uploading} className="btn-primary" style={{ justifyContent: 'center' }}>
              {uploading ? 'Uploading...' : 'Save Changes'}
            </button>
          </form>
        ) : activeTab === 'exams' ? (
          <form onSubmit={onAddExam} className="admin-form-grid">
            <div className="admin-field">
              <label>Exam Category</label>
              <div className="admin-category-toggle">
                <button type="button" className={`admin-category-btn school${examForm.category === 'school' ? ' active' : ''}`} onClick={() => setExamForm({ ...examForm, category: 'school' })}>
                  School Exam
                </button>
                <button type="button" className={`admin-category-btn national${examForm.category === 'national' ? ' active' : ''}`} onClick={() => setExamForm({ ...examForm, category: 'national' })}>
                  National Exam
                </button>
              </div>
            </div>
            <div className="admin-field">
              <label>Title</label>
              <input className="admin-input" placeholder="e.g. Biology Final Exam" value={examForm.title} onChange={(e) => setExamForm({ ...examForm, title: e.target.value })} />
            </div>
            <div className="admin-field">
              <label>Subject</label>
              <input className="admin-input" placeholder="e.g. Biology" value={examForm.subject} onChange={(e) => setExamForm({ ...examForm, subject: e.target.value })} />
            </div>
            <div className="admin-field">
              <label>Date / Year</label>
              <input className="admin-input" placeholder="e.g. July 2026" value={examForm.date} onChange={(e) => setExamForm({ ...examForm, date: e.target.value })} />
            </div>
            <div className="admin-field">
              <label>Upload PDF</label>
              <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => setSelectedFile(e.target.files[0])} className="admin-input" />
            </div>
            <button type="submit" disabled={uploading} className="btn-primary" style={{ justifyContent: 'center' }}>
              <Plus size={18} /> {uploading ? 'Uploading...' : 'Add Exam'}
            </button>
          </form>
        ) : (
          <form onSubmit={onAddNews} className="admin-form-grid">
            <div className="admin-field">
              <label>Title</label>
              <input className="admin-input" placeholder="News headline" value={newsForm.title} onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })} />
            </div>
            <div className="admin-field">
              <label>Publish Date</label>
              <input className="admin-input" placeholder="e.g. Sep 8, 2026" value={newsForm.date} onChange={(e) => setNewsForm({ ...newsForm, date: e.target.value })} />
            </div>
            <div className="admin-field">
              <label>Excerpt</label>
              <textarea className="admin-textarea" rows={4} placeholder="Brief summary..." value={newsForm.excerpt} onChange={(e) => setNewsForm({ ...newsForm, excerpt: e.target.value })} />
            </div>
            <button type="submit" className="btn-primary" style={{ justifyContent: 'center' }}>
              <Plus size={18} /> Publish News
            </button>
          </form>
        )}
      </div>

      <div className="admin-panel">
        <div className="admin-panel-header">
          <h2>All {activeTab === 'exams' ? 'Exams' : 'News'} ({items.length})</h2>
        </div>
        {loading ? (
          <p style={{ color: 'var(--text-muted)' }}>Loading...</p>
        ) : items.length === 0 ? (
          <p style={{ color: 'var(--text-muted)' }}>No records found.</p>
        ) : (
          <div className="admin-item-list">
            {items.map((item) => (
              <div key={item.id} className="admin-item-card">
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem', flexWrap: 'wrap' }}>
                    {activeTab === 'exams' && (
                      <span className={`admin-badge ${item.category === 'national' ? 'national' : 'school'}`}>
                        {item.category === 'national' ? 'National' : 'School'}
                      </span>
                    )}
                    <strong style={{ fontSize: '0.95rem' }}>{item.title}</strong>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    {activeTab === 'exams' ? `${item.subject} · ${item.date}` : item.date}
                  </p>
                  {activeTab === 'news' && item.excerpt && (
                    <p style={{ margin: '0.35rem 0 0', fontSize: '0.85rem', color: '#475569', lineHeight: 1.4 }}>{item.excerpt}</p>
                  )}
                  {item.fileUrl && (
                    <a href={item.fileUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.35rem' }}>
                      <Upload size={13} /> View attachment
                    </a>
                  )}
                </div>
                <div className="admin-item-actions">
                  <button type="button" className="admin-btn-edit" onClick={() => onEdit(item)}>
                    <Pencil size={13} style={{ verticalAlign: 'middle', marginRight: 2 }} /> Edit
                  </button>
                  <button type="button" className="admin-btn-delete" onClick={() => onDelete(item.id)}>
                    <Trash2 size={13} style={{ verticalAlign: 'middle', marginRight: 2 }} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function MessagesPanel({ items, loading, onDelete }) {
  return (
    <div className="admin-panel">
      <div className="admin-panel-header">
        <h2>Contact Messages ({items.length})</h2>
      </div>
      {loading ? (
        <p style={{ color: 'var(--text-muted)' }}>Loading messages...</p>
      ) : items.length === 0 ? (
        <p style={{ color: 'var(--text-muted)' }}>No messages yet. Submissions from the Contact page will appear here.</p>
      ) : (
        <div className="admin-item-list">
          {items.map((item) => (
            <div key={item.id} className="admin-item-card" style={{ flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', width: '100%' }}>
                <div>
                  <strong style={{ fontSize: '1rem' }}>{item.name}</strong>
                  <div>
                    <a href={`mailto:${item.email}`} style={{ color: 'var(--primary)', fontSize: '0.85rem', fontWeight: 600 }}>
                      {item.email}
                    </a>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {item.grade && <span className="admin-badge school">{item.grade}</span>}
                  <span className="admin-badge national">{item.subject}</span>
                </div>
              </div>
              <p style={{ margin: '0.5rem 0', padding: '0.75rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.9rem', lineHeight: 1.5, width: '100%' }}>
                {item.message}
              </p>
              {item.created_at && (
                <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Received: {new Date(item.created_at).toLocaleString()}
                </p>
              )}
              <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                <button type="button" className="admin-btn-delete" onClick={() => onDelete(item.id)}>
                  <Trash2 size={13} /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function AccountsPanel({ accounts, pendingCount, loading, accountFilter, setAccountFilter, actionLoading, onApprove, onRevoke }) {
  return (
    <div className="admin-panel">
      <div className="admin-panel-header">
        <h2>Professional Accounts ({accounts.length})</h2>
        {pendingCount > 0 && (
          <span className="admin-badge pending">{pendingCount} pending</span>
        )}
      </div>

      <div className="admin-filter-bar">
        {['all', 'pending', 'active'].map((f) => (
          <button
            key={f}
            type="button"
            className={`admin-filter-btn${accountFilter === f ? ' active' : ''}`}
            onClick={() => setAccountFilter(f)}
          >
            {f === 'all' ? 'All Accounts' : f === 'pending' ? 'Pending Approval' : 'Active'}
          </button>
        ))}
      </div>

      {loading ? (
        <p style={{ color: 'var(--text-muted)' }}>Loading accounts...</p>
      ) : accounts.length === 0 ? (
        <p style={{ color: 'var(--text-muted)' }}>No accounts match this filter.</p>
      ) : (
        <div className="admin-item-list">
          {accounts.map((account) => {
            const sub = account.subscription;
            const isPending = !account.is_active;
            const loadingKey = actionLoading?.includes(account.id);

            return (
              <div key={account.id} className="admin-item-card" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                      <strong style={{ fontSize: '1rem' }}>{account.full_name || 'Unknown'}</strong>
                      <span className={`admin-badge ${isPending ? 'pending' : 'active'}`}>
                        {isPending ? 'Pending' : 'Active'}
                      </span>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>{account.email}</p>
                    {account.phone && (
                      <p style={{ margin: '0.15rem 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>📞 {account.phone}</p>
                    )}
                    {account.school_name && (
                      <p style={{ margin: '0.15rem 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>🏫 {account.school_name}</p>
                    )}
                  </div>
                  <div className="admin-item-actions">
                    {isPending ? (
                      <button
                        type="button"
                        className="admin-btn-approve"
                        disabled={loadingKey}
                        onClick={() => onApprove(account)}
                      >
                        <CheckCircle size={13} /> {loadingKey ? 'Approving...' : 'Approve'}
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="admin-btn-revoke"
                        disabled={loadingKey}
                        onClick={() => onRevoke(account)}
                      >
                        <XCircle size={13} /> {loadingKey ? 'Revoking...' : 'Revoke'}
                      </button>
                    )}
                  </div>
                </div>

                {sub && (
                  <div style={{ marginTop: '0.75rem', padding: '0.75rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.85rem' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                      <span><strong>Plan:</strong> {sub.plan || 'Professional Monthly'}</span>
                      <span><strong>Amount:</strong> {sub.amount} {sub.currency || 'ETB'}</span>
                      <span><strong>Txn:</strong> {sub.transaction_number || '—'}</span>
                      <span>
                        <strong>Status:</strong>{' '}
                        <span className={`admin-badge ${sub.status === 'approved' || sub.status === 'paid' ? 'active' : 'pending'}`}>
                          {sub.status}
                        </span>
                      </span>
                      {sub.expires_at && (
                        <span><strong>Expires:</strong> {new Date(sub.expires_at).toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>
                )}

                {account.created_at && (
                  <p style={{ margin: '0.5rem 0 0', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Registered: {new Date(account.created_at).toLocaleString()}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
