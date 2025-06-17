import type {
  ByProjectKeyRequestBuilder,
  Cart,
  MyCustomerChangePassword,
  MyCustomerUpdate,
} from '@commercetools/platform-sdk';
import {
  CreateAnonymousApiRoot,
  CreatePasswordApiRoot,
} from './CreateApiRoots';
import {
  AccountAddress,
  CartData,
  QueryMode,
  SortingTypes,
  type loginDTO,
  type MainCategory,
  type PriceRange,
  type ProductData,
  type ProfileData,
  type RangeObject,
  type singUpDTO,
} from './types';
import { parseProduct } from './parseProduct';
import {
  DefaultCartData,
  DefaultProfileData,
  emptyProduct,
  productPerPage,
} from './constants';
import { parseCategories } from './parseCategories';
import { parseProfileData } from './parseProfileData';
import { createSignUpBody } from './createSignUpBody';
import {
  AccountAddressFormData,
  AccountSettingsData,
  PasswordChangeData,
} from '../../../pages/profile/types/types';
import { countryCodes } from './CountryCodes';
import { parseCartData } from './parseCartData';

class ClientApi {
  public isLogin: boolean;
  public categories: MainCategory[];
  public currentCategoryId: string;
  public profileData: ProfileData;
  public priceRange: PriceRange;
  public minRating: string;
  public sortingType: string;
  public searchText: string;
  public queryMode: string;
  public pageCount: number;
  public cartData: CartData;
  private apiRoot: ByProjectKeyRequestBuilder;

  constructor() {
    this.isLogin = false;
    this.apiRoot = CreateAnonymousApiRoot();
    this.currentCategoryId = '';
    this.categories = [];
    this.profileData = DefaultProfileData;
    this.priceRange = { min: 0, max: 100 };
    this.minRating = '1';
    this.sortingType = SortingTypes.DEFAULT;
    this.searchText = '';
    this.queryMode = QueryMode.FILTER;
    this.pageCount = 1;
    this.cartData = DefaultCartData;
  }

  public async login(dto: loginDTO): Promise<void> {
    const result = await this.apiRoot
      .me()
      .login()
      .post({
        body: { ...dto, activeCartSignInMode: 'MergeWithExistingCustomerCart' },
      })
      .execute();

    this.apiRoot = CreatePasswordApiRoot(dto);
    this.profileData = parseProfileData(result.body.customer);
    const cart = await this.apiRoot.me().activeCart().get().execute();
    this.cartData.id = cart.body.id;
    this.cartData.version = cart.body.version;
    this.cartData = parseCartData(cart.body);
  }

  public async logout(): Promise<void> {
    this.apiRoot = CreateAnonymousApiRoot();
    this.isLogin = false;
    const cart = await this.createCart();
    this.cartData.id = cart.id;
    this.cartData.version = cart.version;
    this.cartData.products = [];
  }

  public async signUp(dto: singUpDTO): Promise<void> {
    const body = createSignUpBody(dto);

    const result = await this.apiRoot
      .me()
      .signup()
      .post({
        body,
      })
      .execute();

    this.apiRoot = CreatePasswordApiRoot({
      email: dto.email,
      password: dto.password,
    });

    this.profileData = parseProfileData(result.body.customer);
    const cart = await this.apiRoot.me().activeCart().get().execute();
    this.cartData.id = cart.body.id;
    this.cartData.version = cart.body.version;
  }

  public async updateAccountSettingData(
    data: AccountSettingsData
  ): Promise<void> {
    const body: MyCustomerUpdate = {
      version: this.profileData.version,
      actions: [
        { action: 'changeEmail', email: data.email },
        { action: 'setFirstName', firstName: data.firstName },
        { action: 'setLastName', lastName: data.lastName },
        { action: 'setDateOfBirth', dateOfBirth: data.birthDate },
      ],
    };
    const results = await this.apiRoot.me().post({ body }).execute();

    this.profileData.accountSettingData = data;
    this.profileData.version = results.body.version;
  }

  public async updatePassword(data: PasswordChangeData): Promise<void> {
    const body: MyCustomerChangePassword = {
      version: this.profileData.version,
      newPassword: data.newPassword,
      currentPassword: data.currentPassword,
    };
    const results = await this.apiRoot.me().password().post({ body }).execute();

    this.apiRoot = CreatePasswordApiRoot({
      email: this.profileData.accountSettingData.email,
      password: data.newPassword,
    });
    this.profileData.version = results.body.version;
  }

  public async updateAddress(
    id: string,
    data: AccountAddressFormData
  ): Promise<AccountAddress[]> {
    const body: MyCustomerUpdate = {
      version: client.profileData.version,
      actions: [
        {
          action: 'changeAddress',
          addressId: id,
          address: {
            streetName: data.street,
            city: data.city,
            postalCode: data.zipCode,
            country: countryCodes[data.country],
          },
        },
      ],
    };
    if (data.defaultForBilling)
      body.actions.push({
        action: 'setDefaultBillingAddress',
        addressId: id,
      });
    if (data.defaultForShipping)
      body.actions.push({
        action: 'setDefaultShippingAddress',
        addressId: id,
      });
    const results = await this.apiRoot.me().post({ body }).execute();

    this.profileData = parseProfileData(results.body);
    this.profileData.version = results.body.version;
    return this.profileData.accountAddresses;
  }

  public async createAddress(
    data: AccountAddressFormData
  ): Promise<AccountAddress[]> {
    const body: MyCustomerUpdate = {
      version: client.profileData.version,
      actions: [
        {
          action: 'addAddress',
          address: {
            streetName: data.street,
            city: data.city,
            postalCode: data.zipCode,
            country: countryCodes[data.country],
          },
        },
      ],
    };
    let results = await this.apiRoot.me().post({ body }).execute();

    const id = results.body.addresses.at(-1)?.id;
    if (id) {
      const body: MyCustomerUpdate = {
        version: client.profileData.version + 1,
        actions: [],
      };
      if (data.defaultForBilling)
        body.actions.push({
          action: 'setDefaultBillingAddress',
          addressId: id,
        });
      if (data.defaultForShipping)
        body.actions.push({
          action: 'setDefaultShippingAddress',
          addressId: id,
        });
      if (body.actions.length > 0) {
        results = await this.apiRoot.me().post({ body }).execute();
      }
    }

    this.profileData = parseProfileData(results.body);
    this.profileData.version = results.body.version;
    return this.profileData.accountAddresses;
  }

  public async deleteAddress(id: string): Promise<AccountAddress[]> {
    const body: MyCustomerUpdate = {
      version: client.profileData.version,
      actions: [
        {
          action: 'removeAddress',
          addressId: id,
        },
      ],
    };

    const results = await this.apiRoot.me().post({ body }).execute();

    this.profileData = parseProfileData(results.body);
    this.profileData.version = results.body.version;
    return this.profileData.accountAddresses;
  }

  public getCategoryName(id: string): string {
    const category = this.categories.find((item) => item.id === id);
    if (category) return category.name;
    return '';
  }

  public async getProducts(pageIndex?: number): Promise<ProductData[]> {
    try {
      this.queryMode = QueryMode.FILTER;

      if (pageIndex === undefined) {
        const response = await this.apiRoot
          .productProjections()
          .search()
          .get({
            queryArgs: {
              filter: [
                `categories.id:"${this.currentCategoryId}"`,
                `variants.price.centAmount: range (${this.priceRange.min} to ${this.priceRange.max + 1})`,
                `variants.attributes.rating: range (${client.minRating} to 6)`,
              ],
            },
          })
          .execute();
        const countProduct = response.body.results.length;
        this.pageCount = Math.ceil(countProduct / productPerPage);
        if (this.pageCount === 0) this.pageCount = 1;
      }

      const response = await this.apiRoot
        .productProjections()
        .search()
        .get({
          queryArgs: {
            filter: [
              `categories.id:"${this.currentCategoryId}"`,
              `variants.price.centAmount: range (${this.priceRange.min} to ${this.priceRange.max + 1})`,
              `variants.attributes.rating: range (${client.minRating} to 6)`,
            ],
            limit: productPerPage,
            offset: pageIndex ? pageIndex - 1 : 0,
          },
        })
        .execute();

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

      if (pageIndex === undefined) {
        const response = await this.apiRoot
          .productProjections()
          .search()
          .get({
            queryArgs: {
              'text.en-US': `${client.searchText}`,
              fuzzy: true,
            },
          })
          .execute();
        const countProduct = response.body.results.length;
        this.pageCount = Math.ceil(countProduct / productPerPage);
        if (this.pageCount === 0) this.pageCount = 1;
      }

      const response = await this.apiRoot
        .productProjections()
        .search()
        .get({
          queryArgs: {
            'text.en-US': `${client.searchText}`,
            fuzzy: true,
            sort:
              client.sortingType === SortingTypes.DEFAULT
                ? undefined
                : client.sortingType,
            limit: productPerPage,
            offset: pageIndex ? pageIndex - 1 : 0,
          },
        })
        .execute();

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

  public async getMainCategories(): Promise<void> {
    try {
      const response = await this.apiRoot.categories().get().execute();
      this.categories = parseCategories(response.body.results);
      this.currentCategoryId = this.categories[0].id;
    } catch {
      this.categories = [];
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

  public async createCart(): Promise<Cart> {
    const cart = await this.apiRoot
      .me()
      .carts()
      .post({ body: { currency: 'USD' } })
      .execute();
    return cart.body;
  }

  public async addCartProduct(productId: string): Promise<void> {
    if (this.cartData.id === '') {
      const cart = await this.createCart();
      this.cartData.id = cart.id;
      this.cartData.version = cart.version;
    }

    const cart = await this.apiRoot
      .me()
      .carts()
      .withId({ ID: this.cartData.id })
      .post({
        body: {
          actions: [{ action: 'addLineItem', productId }],
          version: this.cartData.version,
        },
      })
      .execute();
    this.cartData = parseCartData(cart.body);
  }

  public async removeCardProduct(
    productId: string,
    all: boolean = false
  ): Promise<void> {
    const product = this.cartData.products.find(
      (product) => product.id === productId
    );
    if (product === undefined) return;

    const cart = await this.apiRoot
      .me()
      .carts()
      .withId({ ID: this.cartData.id })
      .post({
        body: {
          actions: [
            {
              action: 'removeLineItem',
              lineItemId: product.lineItemId,
              quantity: all ? product.quantity : 1,
            },
          ],
          version: this.cartData.version,
        },
      })
      .execute();
    this.cartData = parseCartData(cart.body);
  }

  public async getCartData(): Promise<void> {
    if (this.cartData.id == '') return;
    const cart = await this.apiRoot
      .me()
      .carts()
      .withId({ ID: this.cartData.id })
      .get()
      .execute();
    this.cartData = parseCartData(cart.body);
  }

  public inCart(id: string): boolean {
    return this.cartData.products.some((product) => product.id === id);
  }

  public get cartCount(): number {
    return this.cartData.products.length;
  }
}

export const client = new ClientApi();
