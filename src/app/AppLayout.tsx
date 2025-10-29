import { Link, Outlet, useLocation, useNavigation } from 'react-router-dom';
import { usePodcastStore } from '@/features/podcast/store/podcast.store';

function AppLayout() {
  const navigation = useNavigation();
  const location = useLocation();
  const isHome = location.pathname === '/';

  const storeLoading = usePodcastStore((s) => s.loading);
  const routeLoading = navigation.state === 'loading' || navigation.state === 'submitting';

  return (
    <div className="app-container">
      <header className="app-header">
        {isHome ? <h1 className="app-title">Podcast App</h1> : <Link to="/"><h1 className="app-title">Podcast App</h1></Link>}
        {(storeLoading || routeLoading) && <div className="app-loader" />}
      </header>

      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
