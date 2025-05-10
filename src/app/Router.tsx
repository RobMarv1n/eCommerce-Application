import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ErrorPage } from '../pages/ui/error-page/ErrorPage';
import { Home } from '../pages/ui/home/Home';
import { Login } from '../pages/ui/login/Login';
import { Signup } from '../pages/ui/signup/Signup';
import { RouterConstants } from '../types';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RouterConstants.HOME} element={<Home />} />
        <Route path={RouterConstants.SIGN_IN} element={<Login />} />
        <Route path={RouterConstants.SIGN_UP} element={<Signup />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}
