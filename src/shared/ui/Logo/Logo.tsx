import { Link } from 'react-router-dom';
import styles from './Logo.module.css';
import sproutIcon from './assets/img/sprout.svg';

interface LogoProperties {
  color?: 'green' | 'white';
}

export function Logo({ color = 'green' }: LogoProperties) {
  const textColorClass =
    color === 'green' ? styles.greenText : styles.whiteText;

  return (
    <Link to="/" className={styles.logo}>
      <img src={sproutIcon} alt="Ecobazar logo sprout" />
      <span className={`${styles.logoText} ${textColorClass}`}>Ecobazar</span>
    </Link>
  );
}
