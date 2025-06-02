import { ChangeEvent, useState } from 'react';
import { client } from '../../../../shared/api/clientApi/ClientApi';
import { Category } from '../../../../shared/api/clientApi/types';
import './CategoriesList.css';

type Properties = {
  categories: Category[];
  onClick: () => void;
};

export function CategoriesList({ categories, onClick }: Properties) {
  const [selectValue, setSelectValue] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectValue(event.target.value);
    client.setCurrentCategoryId(event.target.value);
    onClick();
  };

  return (
    <div className="categories">
      <div className="category-item">
        <input
          id="all"
          type="radio"
          name="category"
          value=""
          checked={selectValue === ''}
          onChange={handleChange}
        />
        <label htmlFor="all">All</label>
      </div>
      {categories.map((s) => (
        <div key={s.id} className="category-item">
          <input
            id={s.id}
            type="radio"
            name="category"
            value={s.id}
            checked={selectValue === s.id}
            onChange={handleChange}
          />
          <label htmlFor={s.id}>{s.name}</label>
        </div>
      ))}
    </div>
  );
}
