import { useState } from 'react';
import { client } from '../../../../shared/api/clientApi/ClientApi';
import { Category, MainCategory } from '../../../../shared/api/clientApi/types';
import './CategoriesList.css';
import { emptyCategory } from '../../../../shared/api/clientApi/constants';

type Properties = {
  categories: Category[];
  onClick: (category: MainCategory) => void;
};

export function CategoriesList({ categories, onClick }: Properties) {
  if (!categories[0]) return <></>;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [selectValue, setSelectValue] = useState(categories[0].id);

  return (
    <div className="categories">
      {categories.map((category) => (
        <div key={category.id} className="category-item">
          <input
            type="radio"
            name="category"
            id={category.id}
            value={category.id}
            checked={selectValue === category.id}
            onChange={(event) => {
              setSelectValue(event.target.value);
              client.productApi.currentCategoryId = event.target.value;
              const currentCategory = client.productApi.categories.find(
                (item) => item.id === category.id
              );
              onClick(currentCategory || emptyCategory);
            }}
          />
          <label htmlFor={category.id}>{category.name}</label>
        </div>
      ))}
    </div>
  );
}
