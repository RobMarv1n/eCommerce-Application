import { useState } from 'react';
import { client } from '../../../../shared/api/clientApi/ClientApi';
import { Category, Subcategory } from '../../../../shared/api/clientApi/types';
import './SubcategoriesList.css';

type CategoriesListProperties = {
  subcategories: Category[];
  onClick: (subcategory: Subcategory) => void;
};

export function SubcategoriesList({
  subcategories,
  onClick,
}: CategoriesListProperties) {
  const [selectValue, setSelectValue] = useState(subcategories[0].id);

  return (
    <div className="categories">
      {subcategories.map((subcategory) => (
        <div key={subcategory.id} className="subcategory-item">
          <input
            type="radio"
            name="subcategory"
            id={subcategory.id}
            value={subcategory.id}
            checked={selectValue === subcategory.id}
            onChange={(event) => {
              setSelectValue(event.target.value);
              client.productApi.currentCategoryId = subcategory.id;
              onClick(subcategory);
            }}
          />
          <label htmlFor={subcategory.id}>{subcategory.name}</label>
        </div>
      ))}
    </div>
  );
}
