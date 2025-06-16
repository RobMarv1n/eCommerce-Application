import { useEffect, useState, useRef } from 'react';
import { CategoriesList } from './CategoriesList/CategoriesList';
import { FilterItem } from './FilterItem/FilterItem';
import { client } from '../../../shared/api/clientApi/ClientApi';
import {
  MainCategory,
  ProductData,
  QueryMode,
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
import { RatingList } from './RatingList/RatingList';
import { FiltersIcon } from '../../../shared/ui/Icon/FiltersIcon';
import { Pagination } from './Pagination/Pagination';

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
  const [pageCount, setPageCount] = useState(1);
  const [pageIndex, setPageIndex] = useState(1);

  const filtersReference = useRef<HTMLDivElement>(null);

  async function updateProducts(pageIndex?: number): Promise<void> {
    await client.getCartData();
    const products = await client.getProducts(pageIndex);
    setProducts(products);
    if (pageIndex === undefined) {
      setPageCount(client.pageCount);
      setPageIndex(1);
    }
  }

  async function searchProducts(pageIndex?: number): Promise<void> {
    await client.getCartData();
    const products = await client.searchProducts(pageIndex);
    setProducts(products);
    if (pageIndex === undefined) {
      setPageCount(client.pageCount);
      setPageIndex(1);
    }
  }

  async function initial(): Promise<void> {
    await client.getMainCategories();
    await client.getMinMaxPrice();
    await client.getCartData();
    const products = await client.getProducts();
    setCategories(client.categories);
    setCurrentCategory(client.categories[0]);
    setSubcategories(client.categories[0].subCategory);
    setProducts(products);
    setPageCount(client.pageCount);
  }

  useEffect(() => {
    initial();
  }, []);

  function toggleFilters() {
    filtersReference.current?.classList.toggle('filters-active');
    document.body.classList.toggle('overflow-hidden');
  }

  return (
    <section className="catalog container">
      <div className="filters" ref={filtersReference}>
        <button className="close-filters-button" onClick={toggleFilters}>
          ✕
        </button>
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
        <FilterItem title="Price">
          <CatalogPriceFilter
            updateRange={() => {
              updateProducts();
            }}
          />
        </FilterItem>
        <FilterItem title="Rating">
          <RatingList
            onClick={() => {
              updateProducts();
            }}
          />
        </FilterItem>
        <Button>Reset</Button>
      </div>
      <div className="products-panel">
        <div className="sort-search-panel">
          <Button className="filters-button" onClick={toggleFilters}>
            Filters <FiltersIcon />
          </Button>
          <SortSelect
            onChange={() => {
              if (client.queryMode === QueryMode.FILTER) updateProducts();
              else searchProducts();
            }}
          />
          <SearchInput onKeyDown={() => searchProducts()} />
        </div>
        <CatalogNavigation
          category={currentCategory}
          subcategory={currentSubcategory}
          onClick={() => {
            setCurrentSubcategory(emptySubcategory);
            updateProducts();
          }}
        />
        <Pagination
          pageIndex={pageIndex}
          pageCount={pageCount}
          onPageChange={(page) => {
            if (client.queryMode === QueryMode.FILTER) updateProducts(page);
            else searchProducts(page);
            setPageIndex(page);
          }}
        />
        <ProductsList products={products} />
      </div>
    </section>
  );
}
