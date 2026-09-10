const aiTools = [
  {
    name: 'Ask ChatGPT',
    url: 'https://chatgpt.com/',
    description: 'Ask questions, explain difficult concepts, and get study help in seconds.',
    accent: 'from-cyan-500 to-blue-600',
    logoType: 'chatgpt',
  },
  {
    name: 'Google Gemini',
    url: 'https://gemini.google.com/app',
    description: 'Use Gemini for brainstorming, summaries, explanations, and quick research support.',
    accent: 'from-violet-500 to-fuchsia-600',
    logoType: 'gemini',
  },
  {
    name: 'Hugging Face',
    url: 'https://huggingface.co/',
    description: 'Explore AI demos and model playgrounds for learning, coding, and experiments.',
    accent: 'from-amber-400 to-orange-500',
    logoType: 'huggingface',
  },
  {
    name: 'Gradio Demos',
    url: 'https://gradio.app/',
    description: 'Try interactive AI demos and easy-to-use open-source tools for students.',
    accent: 'from-emerald-500 to-teal-600',
    logoType: 'gradio',
  },
];

function ToolLogo({ type }) {
  if (type === 'chatgpt') {
    return (
      <svg viewBox="0 0 64 64" width="42" height="42" aria-label="ChatGPT logo" style={{ display: 'block' }}>
        <circle cx="32" cy="32" r="30" fill="url(#chatgptGradient)" />
        <path
          d="M41.5 22.8c-1.7-2.2-4.5-3.5-7.7-3.5-6 0-10.5 4.3-10.5 10.2 0 .4 0 .8.1 1.2-4.7.6-8.4 4.7-8.4 9.7 0 5.3 4.3 9.6 9.6 9.6h20.8c5.5 0 9.9-4.4 9.9-9.9 0-5.1-3.8-9.3-8.8-9.7a10.8 10.8 0 0 0-4.9-8.6Zm-3.8 21.7h-15c-3.7 0-6.7-3-6.7-6.7 0-3.5 2.7-6.3 6.1-6.6l1.7-.1.4-1.5c.2-1 .6-1.8 1.3-2.6a6.7 6.7 0 0 1 5.3-2.3c2.3 0 4.5 1 5.8 2.8l.7 1.1.9-.1c2.6-.2 4.8 1.6 5.1 3.9.1.9.1 1.8-.2 2.6l-.6 1.8 1.7.2c2.1.3 3.7 2.2 3.7 4.4 0 2.5-2 4.5-4.5 4.5Z"
          fill="#F8FAFC"
        />
        <defs>
          <linearGradient id="chatgptGradient" x1="8" x2="56" y1="10" y2="54" gradientUnits="userSpaceOnUse">
            <stop stopColor="#34D399" />
            <stop offset="1" stopColor="#10B981" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  if (type === 'gemini') {
    return <span style={{ width: 42, height: 42, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: 12, background: 'linear-gradient(135deg, #8b5cf6, #ec4899)', color: '#fff', fontWeight: 900 }}>G</span>;
  }

  if (type === 'huggingface') {
    return <span style={{ width: 42, height: 42, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: 12, background: 'linear-gradient(135deg, #f59e0b, #f97316)', color: '#fff', fontWeight: 900 }}>HF</span>;
  }

  return <span style={{ width: 42, height: 42, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: 12, background: 'linear-gradient(135deg, #10b981, #14b8a6)', color: '#fff', fontWeight: 900 }}>AI</span>;
}

export default function AIPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #020817 0%, #111827 38%, #0f172a 100%)',
        color: '#e2e8f0',
        padding: '2rem 1.25rem 4rem',
      }}
    >
      <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
      

        <section style={{ marginTop: '1rem' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1.2rem',
              flexWrap: 'wrap',
            }}
          >
            <h2 style={{ margin: 0, fontSize: '1.6rem', color: '#f8fafc' }}>AI study tools</h2>
            <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Free tools for learning and revision</div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {aiTools.map((tool) => (
              <a
                key={tool.name}
                href={tool.url}
                target='_self'
                rel='noreferrer'
                style={{
                  textDecoration: 'none',
                  display: 'block',
                  background: 'rgba(15, 23, 42, 0.75)',
                  border: '1px solid rgba(148, 163, 184, 0.18)',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 18px 35px rgba(2, 6, 23, 0.32)',
                  transition: 'transform 0.2s ease, border-color 0.2s ease',
                  transform: 'translateY(0)',
                }}
              >
                <div
                  style={{
                    height: '8px',
                    background: `linear-gradient(90deg, #38bdf8, #8b5cf6)`,
                  }}
                />
                <div style={{ padding: '1.25rem' }}>
                  <div style={{ marginBottom: '0.8rem' }}>
                    {tool.logoType === 'chatgpt' ? (
                      <img
                        src="/chatGPTlogo.png"
                        alt="ChatGPT logo"
                        style={{ width: 42, height: 42, display: 'block', borderRadius: 12 }}
                      />
                    ) : (
                      <ToolLogo type={tool.logoType} />
                    )}
                  </div>

                  <h3 style={{ margin: 0, color: '#f8fafc', fontSize: '1.15rem', fontWeight: 800 }}>
                    {tool.name}
                  </h3>

                  <p style={{ margin: '0.7rem 0 1rem', color: '#cbd5e1', lineHeight: 1.6, minHeight: '72px' }}>
                    {tool.description}
                  </p>

                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '0.65rem 1rem',
                      borderRadius: '10px',
                      background: 'linear-gradient(135deg, rgba(34,197,94,0.14), rgba(59,130,246,0.2))',
                      color: '#dbeafe',
                      fontWeight: 700,
                    }}
                  >
                    Open tool
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

