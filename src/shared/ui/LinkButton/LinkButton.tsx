import { Link } from 'react-router-dom';
import styles from './LinkButton.module.css';

interface LinkButtonProperties {
  className?: string;
  to: string;
  children: React.ReactNode;
}

export function LinkButton({
  to,
  children,
  className = '',
}: LinkButtonProperties) {
  return (
    <Link to={to} className={`${styles.linkButton} ${className}`}>
      {children}
    </Link>
  );
}
