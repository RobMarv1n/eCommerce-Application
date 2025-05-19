import { Link } from 'react-router-dom';
import styles from './LinkButton.module.css';

interface LinkButtonProperties {
  to: string;
  children: React.ReactNode;
}

export function LinkButton({ to, children }: LinkButtonProperties) {
  return (
    <Link to={to} className={styles.linkButton}>
      {children}
    </Link>
  );
}
