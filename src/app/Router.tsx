import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ErrorPage } from '../pages/error-page/ErrorPage';
import { Home } from '../pages/home/Home';
import { Login } from '../pages/login/Login';
import { Profile } from '../pages/profile/ui/Profile';
import { Registration } from '../pages/registration/ui/Registration';
import { ROUTES } from '../types';
import { Layout } from './layouts/Layout';
import { Catalog } from '../pages/catalog/ui/Catalog';
import { Product } from '../pages/product';
import { Cart } from '../pages/cart';
import { AboutUs } from '../pages/about-us';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.REGISTRATION} element={<Registration />} />
          <Route path={ROUTES.PROFILE} element={<Profile />} />
          <Route path={ROUTES.CATALOG} element={<Catalog />} />
          <Route path={ROUTES.PRODUCT} element={<Product />} />
          <Route path={ROUTES.CART} element={<Cart />} />
          <Route path={ROUTES.ABOUT} element={<AboutUs />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
