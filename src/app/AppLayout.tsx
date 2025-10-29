import { Link, Outlet, useLocation } from 'react-router-dom';

function AppLayout() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="app-container">
      <header className="app-header">
        {!isHome && (
          <Link to="/" className="back-link">Back</Link>
        )}
        <h1 className="app-title">Podcast App</h1>
      </header>

      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
