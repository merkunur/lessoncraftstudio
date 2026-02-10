export default function BlogPostLoading() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
      {/* Hero Section Skeleton - matches purple gradient */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Breadcrumb skeleton */}
        <div style={{ padding: '16px 24px' }}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <div className="animate-pulse" style={{ width: '60px', height: '14px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '4px' }} />
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>/</span>
            <div className="animate-pulse" style={{ width: '40px', height: '14px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '4px' }} />
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>/</span>
            <div className="animate-pulse" style={{ width: '120px', height: '14px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '4px' }} />
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>/</span>
            <div className="animate-pulse" style={{ width: '180px', height: '14px', backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: '4px' }} />
          </div>
        </div>

        {/* Hero header skeleton */}
        <div style={{ padding: '40px 24px 60px', maxWidth: '900px', margin: '0 auto' }}>
          <div className="animate-pulse" style={{ width: '80%', height: '36px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '8px', marginBottom: '16px' }} />
          <div className="animate-pulse" style={{ width: '60%', height: '20px', backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: '6px', marginBottom: '12px' }} />
          <div className="animate-pulse" style={{ width: '40%', height: '16px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '6px' }} />
        </div>
      </div>

      {/* Gradient transition - matches blog post curve */}
      <div style={{ marginTop: '-1px', lineHeight: 0, background: 'linear-gradient(180deg, #764ba2 0%, #8b6ab5 100%)' }}>
        <svg viewBox="0 0 1440 56" preserveAspectRatio="none" aria-hidden="true"
             style={{ width: '100%', height: '56px', display: 'block' }}>
          <path d="M0,0 C480,56 960,56 1440,0 L1440,56 L0,56 Z" fill="#ffffff" />
        </svg>
      </div>

      {/* Article body skeleton */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 24px' }}>
        {/* Paragraph blocks */}
        {Array.from({ length: 4 }).map((_, blockIdx) => (
          <div key={blockIdx} style={{ marginBottom: '32px' }}>
            {blockIdx === 0 && (
              <div className="animate-pulse" style={{ width: '50%', height: '28px', backgroundColor: '#e5e7eb', borderRadius: '6px', marginBottom: '20px' }} />
            )}
            {blockIdx === 2 && (
              <div className="animate-pulse" style={{ width: '45%', height: '24px', backgroundColor: '#e5e7eb', borderRadius: '6px', marginBottom: '16px' }} />
            )}
            {Array.from({ length: blockIdx === 0 ? 5 : 4 }).map((_, lineIdx) => (
              <div
                key={lineIdx}
                className="animate-pulse"
                style={{
                  width: lineIdx === (blockIdx === 0 ? 4 : 3) ? '70%' : '100%',
                  height: '16px',
                  backgroundColor: '#f3f4f6',
                  borderRadius: '4px',
                  marginBottom: '10px',
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
