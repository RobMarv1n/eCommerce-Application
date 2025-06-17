import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { client } from '../../../../shared/api/clientApi/ClientApi';
import { IconFactory } from '../../../../shared/ui/Icon';
import { Logo } from '../../../../shared/ui/Logo';
import { LogOutButton } from '../../../../shared/ui/LogOutButton';
import { CartIconWithCount } from './CartIconWithCount/CartIconWithCount';
import { ROUTES } from '../../../../types';

import styles from './Header.module.css';

const navLinks = [
  { path: ROUTES.LOGIN, label: 'Login' },
  { path: ROUTES.REGISTRATION, label: 'Register' },
  { path: ROUTES.HOME, label: 'Home' },
  { path: ROUTES.CATALOG, label: 'Catalog' },
  { path: ROUTES.ABOUT, label: 'About Us' },
];

const iconLinks = [
  {
    path: ROUTES.WISHLIST,
    label: 'My wishlist',
    icon: 'wishlist',
    disabled: true,
  },
  {
    path: ROUTES.CART,
    label: 'My cart',
    icon: 'cart',
    disabled: false,
  },
  {
    path: ROUTES.PROFILE,
    label: 'My profile',
    icon: 'profile',
    disabled: false,
  },
] as const;

export function Header() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(client.isLogin);

  useEffect(() => {
    setIsAuthenticated(client.isLogin);
  }, [client.isLogin]);

  const handleLogout = () => {
    client.logout();
    setIsAuthenticated(false);
    navigate(ROUTES.HOME);
  };

  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContainer}`}>
        <Logo />
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {navLinks.map(({ path, label }) => (
              <li key={path} className={styles.navItem}>
                <NavLink
                  to={path}
                  className={({ isActive }) => {
                    return isActive
                      ? `${styles.navLink} ${styles.isActive}`
                      : styles.navLink;
                  }}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles.icons}>
          <ul className={styles.iconsList}>
            {iconLinks.map(({ path, label, icon, disabled }) => {
              if (icon === 'cart') {
                return (
                  <li key={label}>
                    <CartIconWithCount
                      count={10}
                      path={path}
                      className={styles.iconsLink}
                    />
                  </li>
                );
              }

              return (
                <li key={label}>
                  <NavLink
                    to={path}
                    className={({ isActive }) => {
                      const baseClass = isActive
                        ? `${styles.iconsLink} ${styles.isActive}`
                        : styles.iconsLink;
                      return disabled
                        ? `${baseClass} disabled-link`
                        : baseClass;
                    }}
                    aria-label={label}
                  >
                    <IconFactory name={icon} />
                  </NavLink>
                </li>
              );
            })}

            {isAuthenticated && (
              <li>
                <LogOutButton onClick={handleLogout} />
              </li>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
}
