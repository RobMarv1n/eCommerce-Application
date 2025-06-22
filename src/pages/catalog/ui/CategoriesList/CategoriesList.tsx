import { client } from '../../../../shared/api/clientApi/ClientApi';
import { rootCategoryId } from '../../../../shared/api/clientApi/constants';
import './CategoriesList.css';

type Properties = {
  categoryId: string;
  onClick: (id: string) => void;
};

export function CategoriesList({ categoryId, onClick }: Properties) {
  let subCategoryIndex = client.productApi.rootCategory.subCategories.findIndex(
    (item) => item.id === categoryId
  );

  for (
    let index = 0;
    index < client.productApi.rootCategory.subCategories.length;
    index++
  ) {
    const subSubCategory = client.productApi.rootCategory.subCategories[
      index
    ].subCategories.find((item) => item.id === categoryId);
    if (subSubCategory != undefined) subCategoryIndex = index;
  }

  return (
    <div className="categories">
      <div className="category-item">
        <input
          type="radio"
          name="category"
          id={rootCategoryId}
          value={rootCategoryId}
          checked={categoryId === rootCategoryId}
          onChange={(event) => {
            client.productApi.currentCategoryId = event.target.value;
            onClick(event.target.value);
          }}
        />
        <label htmlFor={rootCategoryId}>all</label>
      </div>

      <div className="category-border"></div>

      {client.productApi.rootCategory.subCategories.map((category) => (
        <div key={category.id} className="category-item">
          <input
            type="radio"
            name="category"
            id={category.id}
            value={category.id}
            checked={categoryId === category.id}
            onChange={(event) => {
              client.productApi.currentCategoryId = event.target.value;
              onClick(event.target.value);
            }}
          />
          <label htmlFor={category.id}>{category.name}</label>
        </div>
      ))}

      {subCategoryIndex != -1 && <div className="category-border"></div>}

      {subCategoryIndex != -1 &&
        client.productApi.rootCategory.subCategories[
          subCategoryIndex
        ].subCategories.map((category) => (
          <div key={category.id} className="category-item">
            <input
              type="radio"
              name="category"
              id={category.id}
              value={category.id}
              checked={categoryId === category.id}
              onChange={(event) => {
                client.productApi.currentCategoryId = event.target.value;
                onClick(event.target.value);
              }}
            />
            <label htmlFor={category.id}>{category.name}</label>
          </div>
        ))}
    </div>
  );
}
