import { Outlet } from 'react-router-dom';
import { Header } from '../../widgets/ui/Header';
import { Toaster } from 'sonner';

type Properties = {
  cartCount: number;
  setCartCount: React.Dispatch<React.SetStateAction<number>>;
};

export function Layout({ cartCount, setCartCount }: Properties) {
  return (
    <>
      <Header cartCount={cartCount} setCartCount={setCartCount} />
      <main className="main-content">
        <Outlet />
        <Toaster position="top-center" richColors />
      </main>
    </>
  );
}
