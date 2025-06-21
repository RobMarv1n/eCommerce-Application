import styles from './SearchInput.module.css';
import { client } from '../../../../shared/api/clientApi/ClientApi';

type Properties = {
  onKeyDown: () => void;
};

export function SearchInput({ onKeyDown }: Properties) {
  return (
    <input
      className={styles.search}
      type="search"
      placeholder="Search..."
      onChange={(event) => {
        client.productApi.searchText = event.target.value;
      }}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          onKeyDown();
        }
      }}
    />
  );
}
