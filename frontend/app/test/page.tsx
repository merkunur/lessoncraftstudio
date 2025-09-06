export default function TestPage() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui' }}>
      <h1>LessonCraftStudio Test Page</h1>
      <p>This is a simple test page to verify the application is running.</p>
      
      <h2>System Status:</h2>
      <ul>
        <li>Frontend (Next.js 14): Working ✅</li>
        <li>Routes: Accessible ✅</li>
      </ul>
      
      <h2>Available Services:</h2>
      <ul>
        <li>API Health Check: <a href="http://localhost:3001/health">http://localhost:3001/health</a></li>
        <li>Frontend: <a href="http://localhost:3000">http://localhost:3000</a></li>
      </ul>
    </div>
  );
}