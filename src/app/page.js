import Link from 'next/link';

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section 
        style={{ 
          padding: '6rem 1rem', 
          position: 'relative',
          backgroundImage: "linear-gradient(rgba(15, 23, 42, 0.75), rgba(15, 23, 42, 0.85)), url('/kolfe2.jpg')", 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          textAlign: 'center',
          borderRadius: '0 0 30px 30px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.15)'
        }}
      >
        <div className="container" style={{ maxWidth: '900px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', padding: '0.4rem 1.2rem', borderRadius: '999px', marginBottom: '1.5rem', border: '1px solid rgba(255,255,255,0.2)' }}>
            <img src="/logo.jpeg" alt="Logo Badge" style={{ width: '24px', height: '24px', borderRadius: '50%' }} />
            <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#e0e7ff' }}>Official Kolfe Secondary School Learning Portal</span>
          </div>

          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, lineHeight: 1.2, marginBottom: '1.5rem', color: '#ffffff' }}>
            Empower Your Academic <span style={{ background: 'linear-gradient(135deg, #818cf8, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Learning Journey</span>
          </h1>

          <p style={{ fontSize: '1.2rem', color: '#cbd5e1', maxWidth: '720px', margin: '0 auto 2.5rem', lineHeight: 1.6 }}>
            Access past exam papers , explore digital textbooks, connect with dedicated teachers, and stay up to date with school news.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/exams" className="btn-primary" style={{ padding: '0.9rem 2rem', fontSize: '1rem' }}>
              📚 Browse Past Exams
            </Link>
            <Link href="/textbook" className="btn-secondary" style={{ padding: '0.9rem 2rem', fontSize: '1rem' }}>
              📖 Explore Textbooks
            </Link>
            <Link href="/contact" className="btn-primary" style={{ background: 'linear-gradient(135deg, #ec4899, #8b5cf6)', padding: '0.9rem 2rem', fontSize: '1rem' }}>
              📞 Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container" style={{ marginTop: '-3rem', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
          <div className="glass glass-card" style={{ textAlign: 'center', padding: '1.5rem' }}>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--primary)' }}>5,000+</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.95rem', fontWeight: 500 }}>Active Students</div>
          </div>
          <div className="glass glass-card" style={{ textAlign: 'center', padding: '1.5rem' }}>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--secondary)' }}>150+</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.95rem', fontWeight: 500 }}>Qualified Teachers</div>
          </div>
          <div className="glass glass-card" style={{ textAlign: 'center', padding: '1.5rem' }}>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#ec4899' }}>500+</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.95rem', fontWeight: 500 }}>Past Exam Papers</div>
          </div>
          <div className="glass glass-card" style={{ textAlign: 'center', padding: '1.5rem' }}>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#10b981' }}>40+</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.95rem', fontWeight: 500 }}>Curated Textbooks</div>
          </div>
        </div>
      </section>

      {/* Quick Core Services Grid */}
      <section className="container" style={{ marginTop: '4rem' }}>
        <div className="page-header" style={{ padding: '1rem 0 2.5rem' }}>
          <h2>Academic Services & Resources</h2>
          <p style={{ color: 'var(--text-muted)' }}>Everything you need to excel in your studies</p>
        </div>

        <div className="grid">
          <div className="glass glass-card">
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📝</div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '0.75rem', color: 'var(--primary)' }}>Past Exam Papers</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              Comprehensive past examination papers categorized by grade level and subject with answer keys.
            </p>
            <Link href="/exams" style={{ fontWeight: 700, color: 'var(--secondary)', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
              Explore Exams &rarr;
            </Link>
          </div>

          <div className="glass glass-card">
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📚</div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '0.75rem', color: 'var(--primary)' }}>Digital Student Books</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              Access required curriculum textbooks, study guides, and supplementary reference materials anytime.
            </p>
            <Link href="/textbook" style={{ fontWeight: 700, color: 'var(--secondary)', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
              Explore Library &rarr;
            </Link>
          </div>

          <div className="glass glass-card">
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📰</div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '0.75rem', color: 'var(--primary)' }}>School News & Updates</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              Stay updated with academic schedules, exam timetables, extracurricular events, and official announcements.
            </p>
            <Link href="/news" style={{ fontWeight: 700, color: 'var(--secondary)', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
              Read Latest News &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Faculty & Staff Section featuring Teachers Images */}
      <section className="container" style={{ marginTop: '3.5rem' }}>
        <div className="glass glass-card" style={{ padding: '2.5rem 1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', alignItems: 'center' }}>
            <div>
              <span className="badge">Faculty Excellence</span>
              <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', fontWeight: 800, color: 'var(--dark)', margin: '0.5rem 0 1rem', lineHeight: 1.3 }}>
                Our Experienced & Dedicated Teachers
              </h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: 1.7 }}>
                At Kolfe Study, our highly qualified faculty members work tirelessly to provide personalized academic guidance, foster critical thinking, and ensure every student fulfills their full potential.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>✓</span>
                  <span>Interactive learning & modern teaching methods</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>✓</span>
                  <span>Continuous assessment & exam preparation support</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>✓</span>
                  <span>Direct consultation with teachers & mentors</span>
                </div>
              </div>
              <Link href="/about" className="btn-primary">
                Learn More About Our Staff
              </Link>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
              <div className="img-card">
                <img src="/techers.jpg" alt="Kolfe School Teachers" />
                <div className="img-card-body">
                  <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Academic Faculty</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Expert Department Teachers</div>
                </div>
              </div>
              <div className="img-card">
                <img src="/meeting.jpg" alt="Faculty Staff Meeting" />
                <div className="img-card-body">
                  <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Staff Workshops</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Curriculum Development</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Public Images Gallery Section: Students, Campus, Events */}
      <section className="container" style={{ marginTop: '5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="badge">Campus Life & Gallery</span>
          <h2 style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--dark)', marginTop: '0.5rem' }}>
            Life at Kolfe Study
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0.5rem auto 0' }}>
            Explore our vibrant student community, academic activities, parent-teacher events, and campus facilities.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.75rem' }}>
          
          {/* Card 1: Student studying */}
          <div className="img-card">
            <img src="/student.jpg" alt="Student Studying" />
            <div className="img-card-body">
              <span className="badge">Student Life</span>
              <h4 style={{ fontSize: '1.1rem', margin: '0.4rem 0' }}>Focused Academic Growth</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Students accessing past exam papers and digitized study resources.
              </p>
            </div>
          </div>

          {/* Card 2: Student Group */}
          <div className="img-card">
            <img src="/student2.jpg" alt="Group Study Session" />
            <div className="img-card-body">
              <span className="badge">Collaboration</span>
              <h4 style={{ fontSize: '1.1rem', margin: '0.4rem 0' }}>Recommandation </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
               recommendation for our gread 12 studentes about national examinations.
              </p>
            </div>
          </div>

{/* Card 4: Library & Resources */}
          <div className="img-card">
            <img src="/studentg1.jpg" alt="School Library" />
            <div className="img-card-body">
              <span className="badge">Achievements</span>
              <h4 style={{ fontSize: '1.1rem', margin: '0.4rem 0' }}>Graduation</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Students celebrating academic achievements and graduation ceremonies.
              </p>
            </div>
          </div>


          {/* Card 3: School Campus exterior */}
          <div className="img-card">
            <img src="/kolfe1.webp" alt="Kolfe School Campus" />
            <div className="img-card-body">
              <span className="badge">Campus</span>
              <h4 style={{ fontSize: '1.1rem', margin: '0.4rem 0' }}>Modern School Campus</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Safe, inspiring, and well-equipped environment for students.
              </p>
            </div>
          </div>

          

          {/* Card 5: Parent Teacher Meetings */}
          <div className="img-card">
            <img src="/meet1.jpg" alt="Parent-Teacher Conference" />
            <div className="img-card-body">
              <span className="badge">Community</span>
              <h4 style={{ fontSize: '1.1rem', margin: '0.4rem 0' }}>Parent-Teacher Meetings</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Regular engagement between teachers and parents for student progress.
              </p>
            </div>
          </div>

          {/* Card 6: Cafeteria & Life */}
          <div className="img-card">
            <img src="/studentv1.jpg" alt="Student Cafeteria & Meals" />
            <div className="img-card-body">
              <span className="badge">Activity</span>
              <h4 style={{ fontSize: '1.1rem', margin: '0.4rem 0' }}>Social participation</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                student particepation
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="container" style={{ marginTop: '5rem' }}>
        <div className="glass glass-card" style={{ 
          background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
          color: 'white',
          textAlign: 'center',
          padding: '3.5rem 2rem'
        }}>
          <h2 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '1rem', color: '#ffffff' }}>
            Ready to Accelerate Your Learning?
          </h2>
          <p style={{ fontSize: '1.15rem', color: '#e0e7ff', maxWidth: '650px', margin: '0 auto 2rem' }}>
            Start revising today with our comprehensive past exam archives and grade-wise textbooks.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/exams" className="btn-secondary" style={{ background: '#ffffff', color: 'var(--primary)', border: 'none' }}>
              Explore Exam Repository
            </Link>
            <Link href="/contact" className="btn-secondary" style={{ background: 'transparent', color: '#ffffff', border: '2px solid #ffffff' }}>
              Contact Administration
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
