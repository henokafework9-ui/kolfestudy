'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  FileText,
  Download,
  Search,
  Sparkles,
  GraduationCap,
  Award,
  BookOpen,
  Filter,
  Building2,
  Flag,
  X,
  Eye,
  CheckCircle2,
  Share2
} from 'lucide-react';

// Pre-populated default dataset (Ensures immediate offline preview & fallback if DB is empty)
const defaultExams = [
  // SCHOOL EXAMS
  {
    id: 's1',
    title: 'Grade 12 Physics Midterm Examination',
    subject: 'Physics',
    date: '2018 E.C. (2026)',
    category: 'school',
    fileUrl: '/exam/2018 Physics 1st Round Online Exam.pdf',
    description: 'Internal school midterm paper covering Electromagnetism, Quantum Concepts, and Wave Motion.'
  },
  {
    id: 's2',
    title: 'Grade 12 Mathematics Semester Final Exam',
    subject: 'Mathematics',
    date: '2018 E.C. (2026)',
    category: 'school',
    fileUrl: '/exam/2018 Aptitude  First Round ESSLCE Online Exam.pdf',
    description: 'Calculus, Vectors, and Complex Numbers school semester examination paper with solution guidelines.'
  },
  {
    id: 's3',
    title: 'Grade 11 Chemistry Model Exam',
    subject: 'Chemistry',
    date: 'April 2025',
    category: 'school',
    fileUrl: '/books/grade-11-chemistry-new-curriculum--student-textbook-kehulumcom17599238964126.pdf',
    description: 'School preparatory model exam on Chemical Equilibrium and Chemical Kinetics.'
  },
  {
    id: 's4',
    title: 'Grade 10 Biology Midterm Exam',
    subject: 'Biology',
    date: 'March 2025',
    category: 'school',
    fileUrl: '/books/biology_10.pdf',
    description: 'School mid-term test on Genetics, Heredity, and Human Body Systems.'
  },

  // NATIONAL EXAMS (EUEE / ESSLCE)
  {
    id: 'n1',
    title: 'Ethiopian National Entrance Exam (EUEE) - Scholastic Aptitude',
    subject: 'Aptitude',
    date: '2018 E.C. (2026)',
    category: 'national',
    fileUrl: '/Exams/SAT2018.pdf',
    description: 'Official Ministry of Education National Entrance Exam paper for Scholastic Aptitude Test.'
  },
  {
    id: 'n2',
    title: 'Ethiopian National Entrance Exam (EUEE) - Biology',
    subject: 'Biology',
    date: '2018 E.C. (2026)',
    category: 'national',
    fileUrl: '/Exams/2018 Biology 1st Round ESSLCE Online Examm.pdf',
    description: 'Official Ministry of Education National University Entrance Examination paper in Biology.'
  },
  {
    id: 'n3',
    title: 'Ethiopian National Entrance Exam (EUEE) - Mathematics Natural',
    subject: 'Mathematics',
    date: '2018 E.C. (2026)',
    category: 'national',
    fileUrl: '/Exams/Maths 2018 First Round ESSLCE Online Exam.pdf',
    description: 'Official Ethiopian National Grade 12 Higher Education Entrance Examination in Mathematics.'
  },
  {
    id: 'n4',
    title: 'Ethiopian National Entrance Exam (EUEE) - Physics',
    subject: 'Physics',
    date: '2018 E.C. (2026)',
    category: 'national',
    fileUrl: '/Exams/2018 Physics 1st Round Online Exam.pdf',
    description: 'Grade 12 National University Entrance Examination past paper in Physics.'
  },
  {
    id: 'n5',
    title: 'Ethiopian National Entrance Exam (EUEE) - Chemistry',
    subject: 'Chemistry',
    date: '2018 E.C. (2026)',
    category: 'national',
    fileUrl: '/Exams/2018 Chemistry First Round ESSLCE Online Exam.pdf',
    description: 'Grade 12 National University Entrance Examination paper in Chemistry.'
  },
  {
    id: 'n6',
    title: 'Ethiopian National Entrance Exam (EUEE) - English',
    subject: 'English',
    date: '2018 E.C. (2026)',
    category: 'national',
    fileUrl: '/exam/2018 Aptitude  First Round ESSLCE Online Exam.pdf',
    description: 'Official Ministry of Education Grade 12 National Examination in English Language.'
  },
  {
    id: 'n7',
    title: 'Ethiopian National Entrance Exam (EUEE) - History',
    subject: 'History',
    date: '2018 E.C. (2026)',
    category: 'national',
    fileUrl: '/exam/2018 Aptitude  First Round ESSLCE Online Exam.pdf',
    description: 'Grade 12 Social Science Stream National University Entrance Examination in History.'
  },
  {
    id: 'n8',
    title: 'Ethiopian National Entrance Exam (EUEE) - Geography',
    subject: 'Geography',
    date: '2018 E.C. (2026)',
    category: 'national',
    fileUrl: '/exam/2018 Aptitude  First Round ESSLCE Online Exam.pdf',
    description: 'Grade 12 Social Science Stream National Entrance Examination in Geography.'
  },
  {
    id: 'n9',
    title: 'Ethiopian National Entrance Exam (EUEE) - Economics',
    subject: 'Economics',
    date: '2018 E.C. (2026)',
    category: 'national',
    fileUrl: '/exam/2018 Aptitude  First Round ESSLCE Online Exam.pdf',
    description: 'Grade 12 Social Science Stream National Entrance Examination in Economics.'
  }
];

const subjectsList = ['All', 'Mathematics', 'Chemistry', 'Physics', 'Biology', 'English', 'History', 'Economics', 'Geography', 'Aptitude'];
// Exams are freely accessible; per-exam payment removed.

export default function ExamsPage() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'school' | 'national'
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [previewFile, setPreviewFile] = useState(null);

  useEffect(() => {
    fetch('/api/exams')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setExams(data);
        } else {
          setExams(defaultExams);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading exams, using default:', err);
        setExams(defaultExams);
        setLoading(false);
      });
  }, []);

  const handleExamAccessRequest = (exam) => {
    setPreviewFile(exam);
  };

  // No per-exam payment flow required.

  // Filter exams by activeTab (school / national / all), search query, and subject
  const filteredExams = useMemo(() => {
    return exams.filter((exam) => {
      const matchesCategory =
        activeTab === 'all' ||
        (activeTab === 'school' && exam.category !== 'national') ||
        (activeTab === 'national' && exam.category === 'national');

      const matchesSubject =
        selectedSubject === 'All' ||
        (exam.subject && exam.subject.toLowerCase().includes(selectedSubject.toLowerCase()));

      const query = search.toLowerCase().trim();
      const matchesSearch =
        !query ||
        exam.title.toLowerCase().includes(query) ||
        (exam.subject && exam.subject.toLowerCase().includes(query)) ||
        (exam.date && exam.date.toLowerCase().includes(query));

      return matchesCategory && matchesSubject && matchesSearch;
    });
  }, [exams, activeTab, selectedSubject, search]);

  // Separate lists for split view when 'all' is active
  const schoolExams = useMemo(
    () => filteredExams.filter((e) => e.category !== 'national'),
    [filteredExams]
  );
  const nationalExams = useMemo(
    () => filteredExams.filter((e) => e.category === 'national'),
    [filteredExams]
  );

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)',
        color: '#f8fafc',
        paddingBottom: '5rem',
      }}
    >
      {/* HERO HEADER */}
      <section style={{ padding: '4rem 1.5rem 2.5rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '950px', margin: '0 auto' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(99, 102, 241, 0.15)',
              border: '1px solid rgba(129, 140, 248, 0.3)',
              padding: '0.4rem 1.25rem',
              borderRadius: '999px',
              fontSize: '0.85rem',
              fontWeight: '700',
              color: '#a5b4fc',
              marginBottom: '1.25rem',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}
          >
            <Sparkles size={16} style={{ color: '#818cf8' }} />
            Academic Assessment & Exam Preparation
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
              fontWeight: '900',
              lineHeight: 1.15,
              marginBottom: '1rem',
              background: 'linear-gradient(135deg, #ffffff 0%, #cbd5e1 60%, #818cf8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Past Examinations Portal
          </h1>

          <p
            style={{
              fontSize: '1.1rem',
              color: '#94a3b8',
              maxWidth: '720px',
              margin: '0 auto 2.5rem',
              lineHeight: 1.6,
            }}
          >
            Access school model examinations and official Ethiopian National Entrance Exams (EUEE)
            to prepare effectively for your upcoming assessments.
          </p>

          {/* MAIN CATEGORY TAB SWITCHER */}
          <div className="exam-tabs-wrapper">
            <button
              onClick={() => setActiveTab('all')}
              className="exam-tab-btn"
              style={{
                background: activeTab === 'all' ? 'linear-gradient(135deg, #6366f1, #4f46e5)' : 'transparent',
                color: activeTab === 'all' ? '#ffffff' : '#94a3b8',
              }}
            >
              <BookOpen size={18} />
              All Examinations ({exams.length})
            </button>

            <button
              onClick={() => setActiveTab('school')}
              className="exam-tab-btn"
              style={{
                background: activeTab === 'school' ? 'linear-gradient(135deg, #3b82f6, #1d4ed8)' : 'transparent',
                color: activeTab === 'school' ? '#ffffff' : '#94a3b8',
              }}
            >
              <Building2 size={18} />
              🏫 School Exams ({exams.filter((e) => e.category !== 'national').length})
            </button>

            <button
              onClick={() => setActiveTab('national')}
              className="exam-tab-btn"
              style={{
                background: activeTab === 'national' ? 'linear-gradient(135deg, #d97706, #b45309)' : 'transparent',
                color: activeTab === 'national' ? '#ffffff' : '#94a3b8',
              }}
            >
              <Flag size={18} style={{ color: activeTab === 'national' ? '#fef08a' : '#f59e0b' }} />
              🇪🇹 National Exams ({exams.filter((e) => e.category === 'national').length})
            </button>
          </div>
        </div>
      </section>

      {/* SEARCH AND SUBJECT FILTER BAR */}
      <section style={{ maxWidth: '1200px', margin: '0 auto 2.5rem', padding: '0 1.5rem' }}>
        <div
          style={{
            background: 'rgba(30, 41, 59, 0.65)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '20px',
            padding: '1.25rem',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            {/* Search Input */}
            <div
              style={{
                flex: 1,
                minWidth: '220px',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Search
                size={20}
                style={{
                  position: 'absolute',
                  left: '1rem',
                  color: '#64748b',
                  pointerEvents: 'none',
                }}
              />
              <input
                type="text"
                placeholder="Search exam title, subject, or year (e.g. 2016 E.C., Biology, Physics)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem 0.85rem 3rem',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  background: 'rgba(15, 23, 42, 0.7)',
                  color: '#f8fafc',
                  fontSize: '0.95rem',
                  outline: 'none',
                }}
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  style={{
                    position: 'absolute',
                    right: '1rem',
                    background: 'none',
                    border: 'none',
                    color: '#94a3b8',
                    cursor: 'pointer',
                  }}
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </div>

          {/* Subject Pills */}
          <div className="no-scrollbar" style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingTop: '0.25rem' }}>
            <span style={{ fontSize: '0.85rem', color: '#64748b', alignSelf: 'center', fontWeight: 600, paddingRight: '0.5rem', shrink: 0 }}>
              Subject:
            </span>
            {subjectsList.map((subj) => (
              <button
                key={subj}
                onClick={() => setSelectedSubject(subj)}
                style={{
                  padding: '0.4rem 1rem',
                  borderRadius: '999px',
                  border: selectedSubject === subj ? '1px solid #818cf8' : '1px solid rgba(255, 255, 255, 0.1)',
                  background: selectedSubject === subj ? 'rgba(99, 102, 241, 0.25)' : 'rgba(15, 23, 42, 0.5)',
                  color: selectedSubject === subj ? '#a5b4fc' : '#94a3b8',
                  fontSize: '0.85rem',
                  fontWeight: selectedSubject === subj ? 700 : 500,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease',
                  flexShrink: 0,
                }}
              >
                {subj}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CONTENT SECTIONS */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: '#94a3b8' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                border: '3px solid rgba(99, 102, 241, 0.3)',
                borderTopColor: '#6366f1',
                borderRadius: '50%',
                margin: '0 auto 1rem',
                animation: 'spin 1s linear infinite',
              }}
            />
            <p>Loading examinations...</p>
          </div>
        ) : filteredExams.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '4rem 2rem',
              background: 'rgba(30, 41, 59, 0.4)',
              border: '1px dashed rgba(255, 255, 255, 0.15)',
              borderRadius: '20px',
              color: '#94a3b8',
            }}
          >
            <BookOpen size={48} style={{ color: '#475569', marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.25rem', color: '#f1f5f9', marginBottom: '0.5rem' }}>No examinations found</h3>
            <p style={{ maxWidth: '400px', margin: '0 auto' }}>
              No exams match your selected search or subject filter. Try clearing filters or switching categories.
            </p>
          </div>
        ) : activeTab === 'all' ? (
          /* SPLIT VIEW (School Exams & National Exams side-by-side or sectioned) */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
            {/* SCHOOL EXAMS SECTION */}
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1.5rem',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                  paddingBottom: '0.75rem',
                  flexWrap: 'wrap',
                  gap: '0.75rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '12px',
                      background: 'rgba(59, 130, 246, 0.15)',
                      border: '1px solid rgba(59, 130, 246, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#60a5fa',
                      flexShrink: 0,
                    }}
                  >
                    <Building2 size={22} />
                  </div>
                  <div>
                    <h2 style={{ fontSize: 'clamp(1.2rem, 3vw, 1.5rem)', fontWeight: '800', margin: 0, color: '#ffffff' }}>
                      School Examinations
                    </h2>
                    <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: 0 }}>
                      Internal school midterms, final examinations, and preparatory model tests
                    </p>
                  </div>
                </div>
                <span
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    padding: '0.3rem 0.8rem',
                    borderRadius: '999px',
                    background: 'rgba(59, 130, 246, 0.15)',
                    color: '#93c5fd',
                    border: '1px solid rgba(59, 130, 246, 0.3)',
                  }}
                >
                  {schoolExams.length} Papers
                </span>
              </div>

              {schoolExams.length === 0 ? (
                <p style={{ color: '#64748b', fontStyle: 'italic' }}>No school exams matching current filter.</p>
              ) : (
                <div className="exam-cards-grid">
                        {schoolExams.map((exam) => (
                          <ExamCard
                            key={exam.id}
                            exam={exam}
                            isNational={exam.category === 'national'}
                            onPreview={handleExamAccessRequest}
                            onDownload={handleExamAccessRequest}
                          />
                        ))}
                </div>
              )}
            </div>

            {/* NATIONAL EXAMS SECTION */}
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1.5rem',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                  paddingBottom: '0.75rem',
                  flexWrap: 'wrap',
                  gap: '0.75rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '12px',
                      background: 'rgba(217, 119, 6, 0.2)',
                      border: '1px solid rgba(245, 158, 11, 0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#f59e0b',
                      flexShrink: 0,
                    }}
                  >
                    <Flag size={22} />
                  </div>
                  <div>
                    <h2 style={{ fontSize: 'clamp(1.2rem, 3vw, 1.5rem)', fontWeight: '800', margin: 0, color: '#ffffff' }}>
                      Ethiopian National Examinations (EUEE)
                    </h2>
                    <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: 0 }}>
                      Official Ministry of Education Grade 12 National 
                      University Entrance Exams (EUEE) for Higher Education Admission
                    </p>
                  </div>
                </div>
                <span
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    padding: '0.3rem 0.8rem',
                    borderRadius: '999px',
                    background: 'rgba(217, 119, 6, 0.2)',
                    color: '#fde047',
                    border: '1px solid rgba(245, 158, 11, 0.4)',
                  }}
                >
                  {nationalExams.length} Papers
                </span>
              </div>

              {nationalExams.length === 0 ? (
                <p style={{ color: '#64748b', fontStyle: 'italic' }}>No national exams matching current filter.</p>
              ) : (
                <div className="exam-cards-grid">
                  {nationalExams.map((exam) => (
                    <ExamCard key={exam.id} exam={exam} isNational onPreview={setPreviewFile} onDownload={setPreviewFile} />
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* SINGLE CATEGORY GRID VIEW */
          <div className="exam-cards-grid">
            {filteredExams.map((exam) => (
              <ExamCard
                key={exam.id}
                exam={exam}
                isNational={exam.category === 'national'}
                onPreview={handleExamAccessRequest}
                onDownload={handleExamAccessRequest}
              />
            ))}
          </div>
        )}
      </section>

      {/* per-exam payment removed; exams are free to access */}

      {/* PDF PREVIEW MODAL */}
      {previewFile && (
        <div className="exam-modal-backdrop" onClick={() => setPreviewFile(null)}>
          <div
            className="exam-modal-box"
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '95vw',
              maxWidth: '1100px',
              height: '85vh',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(2,6,23,0.6)'
            }}
          >
            {/* Modal Header */}
            <div
              className="exam-modal-header"
              style={{
                padding: '1rem 1.5rem',
                background: '#1e293b',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '0.75rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', overflow: 'hidden' }}>
                <FileText size={20} style={{ color: '#818cf8', flexShrink: 0 }} />
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0, color: '#f8fafc', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {previewFile.title}
                </h3>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
                {previewFile.fileUrl && (
                  <a
                    href={previewFile.fileUrl}
                    download
                    style={{
                      padding: '0.4rem 0.9rem',
                      borderRadius: '8px',
                      background: '#4f46e5',
                      color: 'white',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                    }}
                  >
                    <Download size={14} /> <span className="exam-modal-download-text">Download PDF</span>
                  </a>
                )}
                <button
                  onClick={() => setPreviewFile(null)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: 'none',
                    color: '#f8fafc',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            
            {/* Modal Body / PDF Viewer */}

 <div style={{ flex: 1, background: '#0b1220', display: 'flex' }}>
              <iframe
                src={`${previewFile.fileUrl}#toolbar=0`}
                title={previewFile.title}
                style={{ width: '100%', height: '100%', border: 'none', minHeight: '60vh' }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Single Exam Card Component
function ExamCard({ exam, isNational, onPreview, onDownload }) {
  const canAccess = true; // all exams are freely accessible

  return (
    <div
      style={{
        background: isNational
          ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(45, 34, 18, 0.8) 100%)'
          : 'rgba(30, 41, 59, 0.65)',
        border: isNational
          ? '1px solid rgba(245, 158, 11, 0.35)'
          : '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '16px',
        padding: '1.5rem',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        boxShadow: isNational
          ? '0 10px 25px -5px rgba(217, 119, 6, 0.15)'
          : '0 10px 25px -5px rgba(0, 0, 0, 0.2)',
      }}
    >
      <div>
        {/* Card Top Badges */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 800,
              padding: '0.25rem 0.7rem',
              borderRadius: '8px',
              background: isNational ? 'rgba(217, 119, 6, 0.25)' : 'rgba(99, 102, 241, 0.2)',
              color: isNational ? '#fde047' : '#a5b4fc',
              border: isNational ? '1px solid rgba(245, 158, 11, 0.4)' : '1px solid rgba(129, 140, 248, 0.3)',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
            }}
          >
            {isNational ? <Flag size={12} /> : <Building2 size={12} />}
            {isNational ? 'National Exam' : 'School Exam'}
          </span>

          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#94a3b8' }}>
            {exam.date}
          </span>
        </div>

        {/* Title */}
        <h3
          style={{
            fontSize: '1.15rem',
            fontWeight: 800,
            lineHeight: 1.35,
            color: '#f8fafc',
            marginBottom: '0.5rem',
          }}
        >
          {exam.title}
        </h3>

        {/* Subject Tag */}
        <div
          style={{
            display: 'inline-block',
            fontSize: '0.8rem',
            fontWeight: 700,
            color: '#38bdf8',
            background: 'rgba(56, 189, 248, 0.1)',
            padding: '0.15rem 0.5rem',
            borderRadius: '6px',
            marginBottom: '1rem',
          }}
        >
          Subject: {exam.subject}
        </div>

        {exam.description && (
          <p
            style={{
              fontSize: '0.88rem',
              color: '#94a3b8',
              lineHeight: 1.5,
              marginBottom: '1.25rem',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {exam.description}
          </p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="exam-card-actions" style={{ display: 'flex', gap: '0.6rem', marginTop: '1rem' }}>
        {exam.fileUrl ? (
          <>
            <button
              onClick={() => onPreview(exam)}
              style={{
                flex: 1,
                padding: '0.65rem 0.9rem',
                borderRadius: '10px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#f8fafc',
                fontSize: '0.85rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
                transition: 'background 0.2s ease',
              }}
            >
              <Eye size={16} /> Preview
            </button>
            <a
              href={exam.fileUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
              style={{
                flex: 1,
                padding: '0.65rem 0.9rem',
                borderRadius: '10px',
                border: 'none',
                background: isNational
                  ? 'linear-gradient(135deg, #d97706, #b45309)'
                  : 'linear-gradient(135deg, #4f46e5, #3b82f6)',
                color: '#ffffff',
                fontSize: '0.85rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
                textDecoration: 'none',
                boxShadow: isNational
                  ? '0 4px 12px rgba(217, 119, 6, 0.3)'
                  : '0 4px 12px rgba(79, 70, 229, 0.3)',
              }}
            >
              <Download size={16} /> Download
            </a>
          </>
        ) : (
          <button
            disabled
            style={{
              width: '100%',
              padding: '0.65rem',
              borderRadius: '10px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              background: 'rgba(255, 255, 255, 0.05)',
              color: '#64748b',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'not-allowed',
            }}
          >
            No Document Attached
          </button>
        )}
      </div>
    </div>
  );
}
