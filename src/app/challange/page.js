'use client';

import { useEffect, useMemo, useState } from 'react';

const challengeQuestions = [
  { question: 'What is 12 × 8?', options: ['84', '96', '104', '108'], correctAnswer: '96' },
  { question: 'Which planet is known as the Red Planet?', options: ['Venus', 'Mars', 'Jupiter', 'Mercury'], correctAnswer: 'Mars' },
  { question: 'The capital city of Ethiopia is?', options: ['Addis Ababa', 'Nairobi', 'Kampala', 'Asmara'], correctAnswer: 'Addis Ababa' },
  { question: 'What is the square root of 81?', options: ['7', '8', '9', '10'], correctAnswer: '9' },
  { question: 'Which is the largest organ in the human body?', options: ['Heart', 'Liver', 'Skin', 'Lungs'], correctAnswer: 'Skin' },
  { question: 'Choose the correct punctuation mark at the end of a statement.', options: ['?', '!', '.', ';'], correctAnswer: '.' },
  { question: 'Which gas do plants absorb from the atmosphere?', options: ['Oxygen', 'Hydrogen', 'Carbon dioxide', 'Nitrogen'], correctAnswer: 'Carbon dioxide' },
  { question: 'What is 25% of 80?', options: ['15', '20', '25', '30'], correctAnswer: '20' },
  { question: 'Which sentence is correct?', options: ['She go to school every day.', 'She goes to school every day.', 'She going to school every day.', 'She gone to school every day.'], correctAnswer: 'She goes to school every day.' },
  { question: 'What is the value of 5 + 6 × 2?', options: ['17', '22', '32', '11'], correctAnswer: '17' },
];

const topStudents = [
  { rank: 1, medal: '🥇', name: 'Selam Bekele', className: 'Grade 11A', score: 98, bg: 'linear-gradient(135deg, #fde68a 0%, #fbbf24 18%, #f59e0b 42%, #b45309 78%, #7c2d12 100%)', text: '#fffef9', ring: '#fde68a', glow: 'rgba(245, 158, 11, 0.35)' },
  { rank: 2, medal: '🥈', name: 'Daniel Tadesse', className: 'Grade 10B', score: 96, bg: 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 22%, #94a3b8 52%, #475569 100%)', text: '#ffffff', ring: '#e2e8f0', glow: 'rgba(100, 116, 139, 0.35)' },
  { rank: 3, medal: '🥉', name: 'Netsanet Alemu', className: 'Grade 12A', score: 94, bg: 'linear-gradient(135deg, #fed7aa 0%, #fb923c 24%, #c2410c 58%, #7c2d12 100%)', text: '#fffaf5', ring: '#fdba74', glow: 'rgba(194, 65, 12, 0.32)' },
];

const totalTimeInSeconds = 10 * 60;

function createEmptyAnswers() {
  return Object.fromEntries(challengeQuestions.map((_, index) => [String(index), '']));
}

export default function ChallengePage() {
  const [studentName, setStudentName] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [answers, setAnswers] = useState(createEmptyAnswers);
  const [timeLeft, setTimeLeft] = useState(totalTimeInSeconds);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const score = useMemo(() => {
    let total = 0;
    challengeQuestions.forEach((item, index) => {
      if (answers[String(index)] === item.correctAnswer) {
        total += 1;
      }
    });
    return total;
  }, [answers]);

  useEffect(() => {
    if (isSubmitted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          submitAnswers(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isSubmitted]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (index, value) => {
    setAnswers((prev) => ({ ...prev, [String(index)]: value }));
  };

  const submitAnswers = async (autoSubmitted = false) => {
    if (isSubmitted || isSubmitting) return;

    setIsSubmitting(true);

    const payload = {
      student_name: studentName.trim() || 'Anonymous Student',
      student_class: studentClass.trim() || 'Not provided',
      score,
      total_questions: challengeQuestions.length,
      answers,
      time_used_seconds: totalTimeInSeconds - timeLeft,
      status: autoSubmitted ? 'expired' : 'submitted',
      submitted_at: new Date().toISOString(),
    };

    try {
      const response = await fetch('/api/challenge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Unable to save your answers.');
      }

      setIsSubmitted(true);
      setStatusMessage(
        autoSubmitted
          ? 'Time is up! Your answers were automatically saved to the database.'
          : 'Your answers were submitted successfully and saved to the database.'
      );
    } catch (error) {
      setStatusMessage(error.message || 'Something went wrong while saving your answers.');
      console.error('Challenge submit error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await submitAnswers(false);
  };

  if (isSubmitted) {
    return (
      <main style={{ maxWidth: '960px', margin: '0 auto', padding: '2.5rem 1.25rem 4rem' }}>
        <section style={{ background: '#ffffff', borderRadius: '24px', padding: '2rem', boxShadow: '0 18px 40px rgba(15, 23, 42, 0.08)' }}>
          <p style={{ color: '#4f46e5', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', margin: 0 }}>Challenge complete</p>
          <h1 style={{ margin: '0.6rem 0', color: '#111827', fontSize: '2.2rem' }}>Your exam has been submitted</h1>
          <p style={{ color: '#374151', fontSize: '1rem', marginBottom: '1.5rem' }}>{statusMessage}</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            <div style={{ background: '#eef2ff', padding: '1rem', borderRadius: '16px' }}>
              <p style={{ margin: 0, color: '#4f46e5', fontWeight: 700 }}>Student</p>
              <h3 style={{ margin: '0.5rem 0 0', color: '#111827' }}>{studentName.trim() || 'Anonymous Student'}</h3>
            </div>
            <div style={{ background: '#ecfeff', padding: '1rem', borderRadius: '16px' }}>
              <p style={{ margin: 0, color: '#0f766e', fontWeight: 700 }}>Class</p>
              <h3 style={{ margin: '0.5rem 0 0', color: '#111827' }}>{studentClass.trim() || 'Not provided'}</h3>
            </div>
            <div style={{ background: '#fef3c7', padding: '1rem', borderRadius: '16px' }}>
              <p style={{ margin: 0, color: '#b45309', fontWeight: 700 }}>Score</p>
              <h3 style={{ margin: '0.5rem 0 0', color: '#111827' }}>{score}/{challengeQuestions.length}</h3>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem 1.25rem 4rem' }}>
      <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <p style={{ color: '#4f46e5', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 0.75rem' }}>Student challenge</p>
        <h1 style={{ color: '#111827', fontSize: 'clamp(2rem, 4vw, 3rem)', margin: 0 }}>10 Questions • 10 Minutes</h1>
      </header>

      <section style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
          <p style={{ margin: 0, color: '#4f46e5', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.8rem' }}>Top students</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', alignItems: 'end' }}>
          {topStudents.map((student) => {
            const isChampion = student.rank === 1;

            return (
              <div
                key={student.rank}
                style={{
                  background: student.bg,
                  color: student.text,
                  borderRadius: '28px',
                  padding: isChampion ? '1.8rem 1.3rem 1.6rem' : '1.5rem 1.2rem 1.4rem',
                  boxShadow: `0 22px 45px ${student.glow}`,
                  border: `3px solid ${student.ring}`,
                  transform: isChampion ? 'translateY(-10px)' : 'none',
                  minHeight: isChampion ? '270px' : '230px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '14px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'rgba(15, 23, 42, 0.14)',
                    borderRadius: '999px',
                    padding: '0.45rem 0.9rem',
                    fontSize: '0.8rem',
                    fontWeight: 800,
                    border: '1px solid rgba(255,255,255,0.35)',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2)',
                    letterSpacing: '0.04em',
                  }}
                >
                  {student.medal} #{student.rank}
                </div>

                <div
                  style={{
                    width: isChampion ? '82px' : '68px',
                    height: isChampion ? '82px' : '68px',
                    borderRadius: '50%',
                    display: 'grid',
                    placeItems: 'center',
                    background: 'rgba(255,255,255,0.16)',
                    border: '2px solid rgba(255,255,255,0.38)',
                    boxShadow: 'inset 0 2px 12px rgba(255,255,255,0.2), 0 12px 24px rgba(15,23,42,0.12)',
                    fontSize: isChampion ? '2.7rem' : '2.2rem',
                    marginTop: '1.9rem',
                    marginBottom: '0.8rem',
                  }}
                >
                  {student.medal}
                </div>

                <h3 style={{ margin: '0', fontSize: isChampion ? '1.8rem' : '1.45rem', fontWeight: 800, lineHeight: 1.2, textShadow: '0 1px 1px rgba(15,23,42,0.15)' }}>{student.name}</h3>
                <p style={{ margin: '0.35rem 0 0', fontSize: '0.95rem', opacity: 0.96 }}>{student.className}</p>

                <div
                  style={{
                    marginTop: '1rem',
                    background: 'rgba(15, 23, 42, 0.08)',
                    borderRadius: '16px',
                    padding: '0.7rem 1rem',
                    border: '1px solid rgba(255,255,255,0.26)',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.18)',
                  }}
                >
                  <span style={{ fontWeight: 900, fontSize: isChampion ? '2.1rem' : '1.7rem' }}>{student.score}</span>
                  <span style={{ fontSize: '0.8rem', marginLeft: '0.25rem', opacity: 0.92 }}>pts</span>
                </div>

                <div
                  style={{
                    position: 'absolute',
                    bottom: '0',
                    left: '0',
                    width: '100%',
                    height: isChampion ? '18px' : '14px',
                    background: 'rgba(255,255,255,0.18)',
                  }}
                />
              </div>
            );
          })}
        </div>
      </section>

      <section style={{ background: '#ffffff', borderRadius: '24px', padding: '1.5rem 1.25rem', boxShadow: '0 18px 40px rgba(15, 23, 42, 0.08)', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <div>
            <p style={{ margin: 0, color: '#4f46e5', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Timed exam</p>
            <h2 style={{ margin: '0.4rem 0 0', color: '#111827' }}>Answer all 10 questions before the timer ends</h2>
          </div>
          <div style={{ background: '#fef2f2', color: '#b91c1c', borderRadius: '999px', padding: '0.7rem 1rem', fontWeight: 800, fontSize: '1.1rem' }}>
            Time Left: {formatTime(timeLeft)}
          </div>
        </div>
      </section>

      <form onSubmit={handleSubmit} style={{ background: '#fff', borderRadius: '28px', padding: '1.5rem 1.25rem', boxShadow: '0 18px 40px rgba(15, 23, 42, 0.08)' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
            background: 'linear-gradient(135deg, #eef2ff 0%, #ede9fe 50%, #fef3c7 100%)',
            border: '1px solid rgba(79, 70, 229, 0.14)',
            borderRadius: '20px',
            padding: '1rem 1.1rem',
            marginBottom: '1.5rem',
          }}
        >
          <div>
            <p style={{ margin: 0, color: '#4f46e5', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', fontSize: '0.74rem' }}>Join the challenge</p>
            <h2 style={{ margin: '0.4rem 0 0', color: '#111827', fontSize: 'clamp(1.4rem, 2vw, 2rem)' }}>Register now and compete for the top spot</h2>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              background: 'rgba(255,255,255,0.7)',
              borderRadius: '999px',
              padding: '0.7rem 1rem',
              color: '#312e81',
              fontWeight: 700,
              border: '1px solid rgba(99, 102, 241, 0.15)',
            }}
          >
            <span style={{ fontSize: '1.1rem' }}>⚡</span>
            10 Questions • 10 Minutes
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          <label style={{ display: 'grid', gap: '0.45rem', color: '#1f2937', fontWeight: 700 }}>
            Student Name
            <input
              type="text"
              value={studentName}
              onChange={(event) => setStudentName(event.target.value)}
              placeholder="Enter student name"
              style={{
                padding: '0.95rem 1rem',
                border: '1px solid #dbe3f0',
                borderRadius: '14px',
                fontSize: '1rem',
                background: '#f8fafc',
                boxShadow: '0 2px 10px rgba(79, 70, 229, 0.05)',
                outline: 'none',
              }}
            />
          </label>

          <label style={{ display: 'grid', gap: '0.45rem', color: '#1f2937', fontWeight: 700 }}>
            Class
            <input
              type="text"
              value={studentClass}
              onChange={(event) => setStudentClass(event.target.value)}
              placeholder="Enter class"
              style={{
                padding: '0.95rem 1rem',
                border: '1px solid #dbe3f0',
                borderRadius: '14px',
                fontSize: '1rem',
                background: '#f8fafc',
                boxShadow: '0 2px 10px rgba(79, 70, 229, 0.05)',
                outline: 'none',
              }}
            />
          </label>
        </div>

        <div style={{ display: 'grid', gap: '1rem' }}>
          {challengeQuestions.map((item, index) => (
            <div key={item.question} style={{ border: '1px solid #e5e7eb', borderRadius: '16px', padding: '1rem 1.1rem', background: '#f9fafb' }}>
              <p style={{ fontWeight: 700, margin: '0 0 0.75rem', color: '#111827' }}>
                {index + 1}. {item.question}
              </p>
              <div style={{ display: 'grid', gap: '0.6rem' }}>
                {item.options.map((option) => (
                  <label key={option} style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', color: '#374151', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={option}
                      checked={answers[String(index)] === option}
                      onChange={() => handleAnswerChange(index, option)}
                      style={{ accentColor: '#4f46e5' }}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        {statusMessage && (
          <p style={{ margin: '1rem 0 0', color: statusMessage.includes('Could not') || statusMessage.includes('Unable') ? '#b91c1c' : '#166534', fontWeight: 700 }}>
            {statusMessage}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting || timeLeft <= 0}
          style={{
            marginTop: '1.5rem',
            width: '100%',
            background: 'linear-gradient(135deg, #4f46e5, #8b5cf6)',
            color: '#fff',
            border: 'none',
            borderRadius: '14px',
            padding: '1rem 1.2rem',
            fontSize: '1rem',
            fontWeight: 700,
            cursor: 'pointer',
            opacity: isSubmitting || timeLeft <= 0 ? 0.7 : 1,
          }}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Answers'}
        </button>
      </form>
    </main>
  );
}
