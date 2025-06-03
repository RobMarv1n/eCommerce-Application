import { useEffect, useState } from 'react';
import { CategoriesList } from './CategoriesList/CategoriesList';
import { FilterItem } from './FilterItem/FilterItem';
import { client } from '../../../shared/api/clientApi/ClientApi';
import {
  MainCategory,
  ProductData,
  Subcategory,
} from '../../../shared/api/clientApi/types';
import { ProductsList } from './ProductsList/ProductsList';
import './catalog.css';
import { SubcategoriesList } from './SubcategoriesList/SubcategoriesList';
import {
  emptyCategory,
  emptySubcategory,
} from '../../../shared/api/clientApi/constants';
import { CatalogNavigation } from './CatalogNavigation/CatalogNavigation';
import { SortSelect } from './SortSelect/SortSelect';
import { SearchInput } from './SearchInput/SearchInput';
import { CatalogPriceFilter } from './CatalogPriceFilter/CatalogPriceFilter';
import { Button } from '../../../shared/ui/Button';

export function Catalog() {
  const [categories, setCategories] = useState<MainCategory[]>([]);
  const [products, setProducts] = useState<ProductData[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([
    emptySubcategory,
  ]);
  const [currentCategory, setCurrentCategory] =
    useState<MainCategory>(emptyCategory);
  const [currentSubcategory, setCurrentSubcategory] =
    useState<Subcategory>(emptySubcategory);

  async function updateProducts(): Promise<void> {
    const products = await client.getProducts();
    setProducts(products);
  }

  async function initial(): Promise<void> {
    await client.getMainCategories();
    const products = await client.getProducts();
    setCategories(client.categories);
    setCurrentCategory(client.categories[0]);
    setSubcategories(client.categories[0].subCategory);
    setProducts(products);
  }

  useEffect(() => {
    initial();
  }, []);

  return (
    <section className="catalog container">
      <div className="filters">
        <FilterItem title="Categories">
          <CategoriesList
            categories={categories}
            onClick={(category) => {
              setCurrentCategory(category);
              setSubcategories(category.subCategory);
              setCurrentSubcategory(emptySubcategory);
              updateProducts();
            }}
          />
        </FilterItem>
        <FilterItem title="Subcategories">
          <SubcategoriesList
            subcategories={subcategories}
            onClick={(subcategory) => {
              setCurrentSubcategory(subcategory);
              updateProducts();
            }}
          />
        </FilterItem>
        <CatalogPriceFilter />
        <Button>Reset</Button>
      </div>
      <div className="products-panel">
        <div className="sort-search-panel">
          <SortSelect />
          <SearchInput />
        </div>
        <CatalogNavigation
          category={currentCategory}
          subcategory={currentSubcategory}
          onClick={() => {
            setCurrentSubcategory(emptySubcategory);
            updateProducts();
          }}
        />
        <ProductsList products={products} />
      </div>
    </section>
  );
}
