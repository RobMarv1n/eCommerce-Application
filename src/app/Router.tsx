import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ErrorPage } from '../pages/error-page/ErrorPage';
import { Home } from '../pages/home/Home';
import { Login } from '../pages/login/Login';
import { Registration } from '../pages/registration/ui/Registration';
import { ROUTES } from '../types';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.REGISTRATION} element={<Registration />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}
