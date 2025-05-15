import { NavLink, Link } from 'react-router-dom';
import { ROUTES } from '../../../../types';
import { Logo } from '../../../../shared/ui/Logo';
import {
  WishlistIcon,
  CartIcon,
  ProfileIcon,
} from '../../../../shared/ui/Icon';
import styles from './Header.module.css';

const navLinks = [
  { path: ROUTES.LOGIN, label: 'Login' },
  { path: ROUTES.SIGN_UP, label: 'Register' },
  { path: ROUTES.HOME, label: 'Home' },
];

export function Header() {
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
                  className={({ isActive }) =>
                    isActive
                      ? `${styles.navLink} ${styles.isActive}`
                      : styles.navLink
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
            <li className={styles.navItem}>
              <NavLink
                to={'/catalog'}
                className={`${styles.navLink} disabled-link`}
              >
                Catalog
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink
                to={'/about'}
                className={`${styles.navLink} disabled-link`}
              >
                About Us
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className={styles.icons}>
          <ul className={styles.iconsList}>
            <li>
              <Link
                to=""
                className={`${styles.iconsLink} disabled-link`}
                aria-label="wishlist"
              >
                <WishlistIcon />
              </Link>
            </li>
            <li>
              <Link
                to=""
                className={`${styles.iconsLink} disabled-link`}
                aria-label="cart"
              >
                <CartIcon />
              </Link>
            </li>
            <li>
              <Link
                to=""
                className={`${styles.iconsLink} disabled-link`}
                aria-label="profile"
              >
                <ProfileIcon />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
