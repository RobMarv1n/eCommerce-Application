import { Outlet } from 'react-router-dom';
import { Header } from '../../widgets/ui/Header';
import { Toaster } from 'sonner';

export function Layout() {
  return (
    <>
      <Header />
      <main className="main-content">
        <Outlet />
        <Toaster position="top-center" richColors />
      </main>
    </>
  );
}
