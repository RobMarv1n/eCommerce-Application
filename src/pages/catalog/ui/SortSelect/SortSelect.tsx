import styles from './SortSelect.module.css';

export function SortSelect() {
  return (
    <div>
      <label className={styles.sortLabel} htmlFor="product-sort">
        Sort by:
      </label>
      <select
        className={styles.sortSelect}
        id="product-sort"
        name="product-sort"
      >
        <option value="default">Default</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="name-asc">Name: A–Z</option>
        <option value="name-desc">Name: Z–A</option>
      </select>
    </div>
  );
}
