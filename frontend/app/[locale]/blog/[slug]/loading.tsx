export default function BlogPostLoading() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      {/* Breadcrumb Skeleton */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '16px 24px' }}>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <div className="animate-pulse" style={{ height: '16px', width: '48px', backgroundColor: '#e5e7eb', borderRadius: '4px' }} />
          <div style={{ color: '#d1d5db' }}>/</div>
          <div className="animate-pulse" style={{ height: '16px', width: '64px', backgroundColor: '#e5e7eb', borderRadius: '4px' }} />
          <div style={{ color: '#d1d5db' }}>/</div>
          <div className="animate-pulse" style={{ height: '16px', width: '120px', backgroundColor: '#e5e7eb', borderRadius: '4px' }} />
          <div style={{ color: '#d1d5db' }}>/</div>
          <div className="animate-pulse" style={{ height: '16px', width: '200px', backgroundColor: '#e5e7eb', borderRadius: '4px' }} />
        </div>
      </div>

      {/* Featured Image Skeleton */}
      <div style={{ maxWidth: '900px', margin: '24px auto', padding: '0 24px' }}>
        <div
          className="animate-pulse"
          style={{
            width: '100%',
            height: '400px',
            backgroundColor: '#e5e7eb',
            borderRadius: '12px',
          }}
        />
      </div>

      {/* Title & Meta Skeleton */}
      <div style={{ maxWidth: '800px', margin: '32px auto', padding: '0 24px' }}>
        {/* Title */}
        <div className="animate-pulse" style={{ height: '36px', width: '85%', backgroundColor: '#d1d5db', borderRadius: '8px', marginBottom: '12px' }} />
        <div className="animate-pulse" style={{ height: '36px', width: '60%', backgroundColor: '#d1d5db', borderRadius: '8px', marginBottom: '24px' }} />
        {/* Meta line (date, author) */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
          <div className="animate-pulse" style={{ height: '16px', width: '100px', backgroundColor: '#e5e7eb', borderRadius: '4px' }} />
          <div className="animate-pulse" style={{ height: '16px', width: '120px', backgroundColor: '#e5e7eb', borderRadius: '4px' }} />
        </div>

        {/* Body Text Lines */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse"
            style={{
              height: '16px',
              width: `${75 + (i % 3) * 8}%`,
              backgroundColor: '#e5e7eb',
              borderRadius: '4px',
              marginBottom: '12px',
            }}
          />
        ))}

        {/* Subheading */}
        <div className="animate-pulse" style={{ height: '28px', width: '45%', backgroundColor: '#d1d5db', borderRadius: '6px', margin: '32px 0 16px' }} />

        {/* More body lines */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={`b${i}`}
            className="animate-pulse"
            style={{
              height: '16px',
              width: `${70 + (i % 4) * 7}%`,
              backgroundColor: '#e5e7eb',
              borderRadius: '4px',
              marginBottom: '12px',
            }}
          />
        ))}
      </div>

      {/* Related Posts Skeleton */}
      <div style={{ maxWidth: '1200px', margin: '64px auto', padding: '0 24px' }}>
        <div className="animate-pulse" style={{ height: '32px', width: '220px', backgroundColor: '#d1d5db', borderRadius: '8px', margin: '0 auto 32px' }} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              style={{
                border: '2px solid #e5e7eb',
                borderRadius: '12px',
                overflow: 'hidden',
                backgroundColor: '#ffffff',
              }}
            >
              <div className="animate-pulse" style={{ height: '200px', backgroundColor: '#e5e7eb' }} />
              <div style={{ padding: '24px' }}>
                <div className="animate-pulse" style={{ height: '20px', width: '80%', backgroundColor: '#e5e7eb', borderRadius: '4px', marginBottom: '12px' }} />
                <div className="animate-pulse" style={{ height: '14px', width: '100%', backgroundColor: '#f3f4f6', borderRadius: '4px', marginBottom: '8px' }} />
                <div className="animate-pulse" style={{ height: '14px', width: '70%', backgroundColor: '#f3f4f6', borderRadius: '4px', marginBottom: '16px' }} />
                <div className="animate-pulse" style={{ height: '14px', width: '90px', backgroundColor: '#fef3c7', borderRadius: '4px' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
