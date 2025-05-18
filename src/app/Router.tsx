import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './layouts/Layout';
import { ErrorPage } from '../pages/error-page/ErrorPage';
import { Home } from '../pages/home/Home';
import { Login } from '../pages/login/Login';
import { Signup } from '../pages/signup/Signup';
import { ROUTES } from '../types';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.SIGN_UP} element={<Signup />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
