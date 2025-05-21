import { LogOutIcon } from '../Icon/LogOutIcon';
import styles from './LogOutButton.module.css';

interface LogOutButtonProperties {
  onClick: () => void;
}

export function LogOutButton({ onClick }: LogOutButtonProperties) {
  return (
    <button
      onClick={onClick}
      className={styles.logoutButton}
      aria-label="logout"
      title="log out"
    >
      <LogOutIcon />
    </button>
  );
}
