import { useEffect, useState } from 'react';
import { CategoriesList } from './CategoriesList/CategoriesList';
import { FilterItem } from './FilterItem/FilterItem';
import { client } from '../../../shared/api/clientApi/ClientApi';
import { Category } from '../../../shared/api/clientApi/types';

export function Catalog() {
  const [categories, setCategories] = useState<Category[]>([]);

  async function initial(): Promise<void> {
    const categories = await client.getCategories();
    setCategories(categories);
  }

  useEffect(() => {
    initial();
  }, []);

  return (
    <>
      <div>
        <FilterItem title="All categories">
          <CategoriesList
            categories={categories}
            onClick={() => console.log('categories')}
          />
        </FilterItem>
      </div>
    </>
  );
}
