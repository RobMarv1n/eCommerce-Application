import { client } from '../../../../shared/api/clientApi/ClientApi';
import {
  MainCategory,
  Subcategory,
} from '../../../../shared/api/clientApi/types';
import './CatalogNavigation.css';

type Properties = {
  category: MainCategory;
  subcategory: Subcategory;
  onClick: () => void;
};

export function CatalogNavigation({
  category,
  subcategory,
  onClick,
}: Properties) {
  const style =
    'category-name' + (subcategory.id ? '' : 'category-name-active');

  return (
    <div className="catalog-navigation">
      <span>Main &gt; </span>
      <span
        className={style}
        onClick={() => {
          client.productApi.currentCategoryId = category.id;
          onClick();
        }}
      >
        {category.name}
      </span>
      {subcategory.id && <span> &gt; {subcategory.name}</span>}
    </div>
  );
}
