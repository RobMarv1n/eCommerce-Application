import { Outlet } from 'react-router-dom';
import { Header } from '../../widgets/ui/Header';

export function Layout() {
  return (
    <>
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
    </>
  );
}
