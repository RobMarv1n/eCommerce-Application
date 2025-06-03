import styles from './SearchInput.module.css';

export function SearchInput() {
  return (
    <input className={styles.search} type="search" placeholder="Search..." />
  );
}
