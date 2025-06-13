import styles from './Counter.module.css';

interface CounterProperties {
  className?: string;
}

export function Counter({ className = '' }: CounterProperties) {
  return (
    <div className={`${styles.counter} ${className}`}>
      <button className={styles.counterBtn}>-</button>
      <span>5</span>
      <button className={styles.counterBtn}>+</button>
    </div>
  );
}
