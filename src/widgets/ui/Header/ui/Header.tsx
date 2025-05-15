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
  { path: ROUTES.CATALOG, label: 'Catalog', disabled: true },
  { path: ROUTES.ABOUT, label: 'About Us', disabled: true },
];

const iconLinks = [
  {
    path: ROUTES.WISHLIST,
    label: 'Wishlist',
    icon: <WishlistIcon />,
    disabled: true,
  },
  {
    path: ROUTES.CART,
    label: 'Cart',
    icon: <CartIcon />,
    disabled: true,
  },
  {
    path: ROUTES.PROFILE,
    label: 'Profile',
    icon: <ProfileIcon />,
    disabled: true,
  },
];

export function Header() {
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
                  {icon}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
