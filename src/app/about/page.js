import Link from 'next/link';

export default function About() {
  return (
    <main className="container" style={{ paddingTop: '2rem' }}>
      <div className="page-header">
        <h1>About Kolfe Study</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
          Dedicated to academic excellence, student empowerment, and modern digital learning tools.
        </p>
      </div>

      {/* Hero Campus Banner */}
      <div className="img-card" style={{ marginBottom: '3rem', minHeight: '260px', position: 'relative' }}>
        <img src="/kolfe1.webp" alt="Kolfe School Campus" style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'linear-gradient(transparent, rgba(15, 23, 42, 0.95))',
          padding: '1.5rem',
          color: 'white'
        }}>
          <span className="badge" style={{ background: 'var(--primary)', color: 'white' }}>Est. Kolfe Sub-City</span>
          <h2 style={{ fontSize: 'clamp(1.3rem, 3.5vw, 1.8rem)', color: '#ffffff', margin: '0.25rem 0' }}>Our Educational Institution</h2>
          <p style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>Providing quality education and student support resources.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
        
        {/* Mission Card */}
        <div className="glass glass-card">
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🎯</div>
          <h2 style={{ color: 'var(--primary)', marginBottom: '1rem', fontSize: '1.5rem' }}>Our Mission</h2>
          <p style={{ lineHeight: '1.7', color: 'var(--text-main)' }}>
            At Kolfe Study, our mission is to empower students with accessible, high-quality educational resources. 
            We believe every student should have the tools they need to succeed academically, which is why we have curated a comprehensive platform offering past exams, digital textbooks, and up-to-date school news.
          </p>
        </div>
        
        {/* Vision Card */}
        <div className="glass glass-card">
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🌟</div>
          <h2 style={{ color: 'var(--primary)', marginBottom: '1rem', fontSize: '1.5rem' }}>Our Vision</h2>
          <p style={{ lineHeight: '1.7', color: 'var(--text-main)' }}>
            We envision a future where learning is seamless, engaging, and collaborative. By leveraging modern technology 
            and design, we aim to foster an environment that not only aids in academic success but also inspires a 
            lifelong passion for knowledge.
          </p>
        </div>

      </div>

      {/* Leadership & Faculty Showcase */}
      <section style={{ marginTop: '3.5rem', marginBottom: '3.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span className="badge">Our Educators</span>
          <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 800, marginTop: '0.5rem' }}>Meet Our Leadership & Teachers</h2>
          <p style={{ color: 'var(--text-muted)' }}>Experienced professionals guiding students toward success</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.75rem' }}>
          
          <div className="img-card">
            <img src="/techers.jpg" alt="Teaching Staff" />
            <div className="img-card-body">
              <span className="badge">Faculty</span>
              <h3 style={{ fontSize: '1.2rem', margin: '0.3rem 0' }}>Academic Instructors</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Dedicated subject matter experts delivering interactive lessons and continuous mentoring.
              </p>
            </div>
          </div>

          <div className="img-card">
            <img src="/techerrs.jpg" alt="Senior Teachers" />
            <div className="img-card-body">
              <span className="badge">Mentorship</span>
              <h3 style={{ fontSize: '1.2rem', margin: '0.3rem 0' }}>Department Heads</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Overseeing academic curriculum standards and examination preparations.
              </p>
            </div>
          </div>

          <div className="img-card">
            <img src="/meet4.jpg" alt="Administrative Leadership" />
            <div className="img-card-body">
              <span className="badge">Administration</span>
              <h3 style={{ fontSize: '1.2rem', margin: '0.3rem 0' }}>School Administration</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Ensuring smooth school operations, student welfare, and parent communications.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Student Community Section */}
      <div className="glass glass-card" style={{ padding: '2rem 1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem', alignItems: 'center' }}>
        <div>
          <span className="badge">Student Excellence</span>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, margin: '0.5rem 0 1rem' }}>Supporting Student Success</h2>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '1.5rem' }}>
            Through our digital library and past exam archives, thousands of students have improved their test scores and gained confidence in their academic pursuits.
          </p>
          <Link href="/exams" className="btn-primary">
            Explore Exam Resources
          </Link>
        </div>
        <div style={{ borderRadius: '16px', overflow: 'hidden', height: '220px' }}>
          <img src="/student2.jpg" alt="Students in Classroom" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </div>

    </main>
  );
}
