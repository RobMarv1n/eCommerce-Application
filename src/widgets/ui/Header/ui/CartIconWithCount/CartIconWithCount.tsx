import { NavLink } from 'react-router-dom';
import { CartIcon } from '../../../../../shared/ui/Icon/CartIcon';
import styles from './CartIconWithCount.module.css';

interface CartIconWithCountProperties {
  count: number;
  path: string;
  className: string;
}

export function CartIconWithCount({
  count,
  path,
  className,
}: CartIconWithCountProperties) {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `${className} ${styles.cartIconLink} ${isActive ? styles.isActive : ''}`
      }
      aria-label="My cart"
    >
      <CartIcon />
      {count > 0 && <span className={styles.cartCount}>{count}</span>}
    </NavLink>
  );
}
