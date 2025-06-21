import { client } from '../../../../shared/api/clientApi/ClientApi';
import { SortingTypes } from '../../../../shared/api/clientApi/types';
import styles from './SortSelect.module.css';

type Properties = {
  onChange: () => void;
};

export function SortSelect({ onChange }: Properties) {
  return (
    <div>
      <label className={styles.sortLabel} htmlFor="product-sort">
        Sort by:
      </label>
      <select
        className={styles.sortSelect}
        id="product-sort"
        name="product-sort"
        onChange={(event) => {
          client.productApi.sortingType = event.target.value;
          onChange();
        }}
      >
        <option value={SortingTypes.DEFAULT}>Default</option>
        <option value={SortingTypes.NAME_ASC}>Name: A–Z</option>
        <option value={SortingTypes.NAME_DESC}>Name: Z–A</option>
        <option value={SortingTypes.PRICE_ASC}>Price: Low to High</option>
        <option value={SortingTypes.PRICE_DESC}>Price: High to Low</option>
      </select>
    </div>
  );
}
