import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from '../pages/home/Home';
import { Signin } from '../pages/signin/Signin';
import { Signup } from '../pages/signup/Signup';
import { ErrorPage } from '../pages/error-page/ErrorPage';
import { RouterConstants } from '../types';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RouterConstants.HOME} element={<Home />} />
        <Route path={RouterConstants.SIGN_IN} element={<Signin />} />
        <Route path={RouterConstants.SIGN_UP} element={<Signup />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}
