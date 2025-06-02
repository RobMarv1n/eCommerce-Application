import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { client } from '../../../../shared/api/clientApi/ClientApi';
import { IconFactory } from '../../../../shared/ui/Icon';
import { Logo } from '../../../../shared/ui/Logo';
import { LogOutButton } from '../../../../shared/ui/LogOutButton';
import { ROUTES } from '../../../../types';
import styles from './Header.module.css';

const navLinks = [
  { path: ROUTES.LOGIN, label: 'Login' },
  { path: ROUTES.REGISTRATION, label: 'Register' },
  { path: ROUTES.HOME, label: 'Home' },
  { path: ROUTES.CATALOG, label: 'Catalog' },
  { path: ROUTES.ABOUT, label: 'About Us', disabled: true },
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
    disabled: true,
  },
  {
    path: ROUTES.PROFILE,
    label: 'My profile',
    icon: 'profile',
    disabled: true,
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
            {navLinks.map(({ path, label, disabled }) => (
              <li key={path} className={styles.navItem}>
                <NavLink
                  to={path}
                  className={({ isActive }) => {
                    const baseClass = isActive
                      ? `${styles.navLink} ${styles.isActive}`
                      : styles.navLink;
                    return disabled ? `${baseClass} disabled-link` : baseClass;
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
            {iconLinks.map(({ path, label, icon, disabled }) => (
              <li key={label}>
                <Link
                  to={path}
                  className={
                    disabled
                      ? `${styles.iconsLink} disabled-link`
                      : styles.iconsLink
                  }
                  aria-label={label}
                >
                  <IconFactory name={icon} />
                </Link>
              </li>
            ))}
            {isAuthenticated && (
              <li className={styles.iconsLink}>
                <LogOutButton onClick={handleLogout} />
              </li>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
}
