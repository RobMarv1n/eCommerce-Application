import styles from './Home.module.css';

export function Home() {
  return (
    <div className={styles['discount-container']}>
      <h1>Discount codes</h1>
      <div className={styles['discount-list']}>
        <span>Discount amount</span>
        <span>Discount code</span>
        <span>10 %</span>
        <span>DISCOUNT-10</span>
        <span>15 %</span>
        <span>DISCOUNT-15</span>
        <span>20 %</span>
        <span>DISCOUNT-20</span>
      </div>
      <p>
        <strong>Attention!</strong> A big discount replaces a small one. You
        cannot accept the same discount twice.
      </p>
    </div>
  );
}
