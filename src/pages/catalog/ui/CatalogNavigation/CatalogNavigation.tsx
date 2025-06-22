import { client } from '../../../../shared/api/clientApi/ClientApi';
import './CatalogNavigation.css';

type Properties = {
  onClick: (id: string) => void;
};

export function CatalogNavigation({ onClick }: Properties) {
  const style = 'category-name';
  const styleNoActive = style + ' category-name-no-active';
  const categoryPath = client.productApi.getCategoryPath();

  return (
    <div className="catalog-navigation">
      {categoryPath.map((item, index) => (
        <span key={'path' + item.id}>
          <span
            className={index < categoryPath.length - 1 ? style : styleNoActive}
            onClick={() => {
              client.productApi.currentCategoryId = item.id;
              onClick(item.id);
            }}
          >
            {item.name}
          </span>
          <span> &gt; </span>
        </span>
      ))}
    </div>
  );
}
