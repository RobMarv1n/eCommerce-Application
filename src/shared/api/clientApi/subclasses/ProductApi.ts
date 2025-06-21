import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk';
import {
  MainCategory,
  PriceRange,
  ProductData,
  QueryMode,
  RangeObject,
  SortingTypes,
} from '../types';
import { parseCategories } from '../parsers/parseCategories';
import { emptyProduct, productPerPage } from '../constants';
import { parseProduct } from '../parsers/parseProduct';

export class ProductApi {
  public categories: MainCategory[];
  public currentCategoryId: string;
  public queryMode: string;
  public priceRange: PriceRange;
  public minRating: string;
  public pageCount: number;
  public sortingType: string;
  public searchText: string;
  public apiRoot: ByProjectKeyRequestBuilder;

  constructor(apiRoot: ByProjectKeyRequestBuilder) {
    this.apiRoot = apiRoot;
    this.categories = [];
    this.currentCategoryId = '';
    this.queryMode = QueryMode.FILTER;
    this.priceRange = { min: 0, max: 100 };
    this.minRating = '1';
    this.pageCount = 1;
    this.sortingType = SortingTypes.DEFAULT;
    this.searchText = '';
  }

  public getCategoryName(id: string): string {
    const category = this.categories.find((item) => item.id === id);
    if (category) return category.name;
    return '';
  }

  public async getMainCategories(): Promise<void> {
    try {
      const response = await this.apiRoot.categories().get().execute();
      this.categories = parseCategories(response.body.results);
      this.currentCategoryId = this.categories[0].id;
    } catch {
      this.categories = [];
    }
  }

  public async getProducts(pageIndex?: number): Promise<ProductData[]> {
    try {
      this.queryMode = QueryMode.FILTER;

      const response = await this.apiRoot
        .productProjections()
        .search()
        .get({
          queryArgs: {
            filter: [
              `categories.id:"${this.currentCategoryId}"`,
              `variants.price.centAmount: range (${this.priceRange.min} to ${this.priceRange.max + 1})`,
              `variants.attributes.rating: range (${this.minRating} to 6)`,
            ],
            limit: productPerPage,
            offset: pageIndex ? (pageIndex - 1) * productPerPage : 0,
          },
        })
        .execute();

      const countProduct = response.body.total || 0;
      this.pageCount = Math.ceil(countProduct / productPerPage);
      if (this.pageCount === 0) this.pageCount = 1;

      const results = response.body.results;
      const products: ProductData[] = results.map((result) =>
        parseProduct(result)
      );
      return products;
    } catch {
      return [];
    }
  }

  public async searchProducts(pageIndex?: number): Promise<ProductData[]> {
    try {
      this.queryMode = QueryMode.SEARCH;

      const response = await this.apiRoot
        .productProjections()
        .search()
        .get({
          queryArgs: {
            'text.en-US': `${this.searchText}`,
            fuzzy: true,
            sort:
              this.sortingType === SortingTypes.DEFAULT
                ? undefined
                : this.sortingType,
            limit: productPerPage,
            offset: pageIndex ? (pageIndex - 1) * productPerPage : 0,
          },
        })
        .execute();

      const countProduct = response.body.results.length;
      this.pageCount = Math.ceil(countProduct / productPerPage);
      if (this.pageCount === 0) this.pageCount = 1;

      const results = response.body.results;
      const products: ProductData[] = results.map((result) =>
        parseProduct(result)
      );
      return products;
    } catch {
      return [];
    }
  }

  public async getProduct(id: string | undefined): Promise<ProductData> {
    try {
      if (id === undefined) return emptyProduct;
      const response = await this.apiRoot
        .productProjections()
        .search()
        .get({
          queryArgs: {
            filter: `id:"${id}"`,
          },
        })
        .execute();
      const result = response.body.results[0];
      return parseProduct(result);
    } catch {
      return emptyProduct;
    }
  }

  public async getMinMaxPrice(): Promise<PriceRange> {
    const response = await this.apiRoot
      .productProjections()
      .search()
      .get({
        queryArgs: {
          facet: 'variants.price.centAmount: range(0 to *)',
        },
      })
      .execute();
    if (!response.body.facets) return { min: 0, max: 100 };
    const range = response.body.facets['variants.price.centAmount'] as unknown;
    if (range && typeof range === 'object') {
      const rangeObject: Partial<RangeObject> = range;
      if (rangeObject.ranges !== undefined) {
        const range = rangeObject.ranges[0];
        this.priceRange = { min: range.min, max: range.max };
        return {
          min: Math.floor(range.min / 100),
          max: Math.ceil(range.max / 100),
        };
      }
    }
    return { min: 0, max: 100 };
  }
}
