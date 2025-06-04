import type {
  ByProjectKeyRequestBuilder,
  MyCustomerChangePassword,
  MyCustomerUpdate,
} from '@commercetools/platform-sdk';
import {
  CreateAnonymousApiRoot,
  CreatePasswordApiRoot,
} from './CreateApiRoots';
import type {
  loginDTO,
  MainCategory,
  PriceRange,
  ProductData,
  ProfileData,
  RangeObject,
  singUpDTO,
} from './types';
import { parseProduct } from './parseProduct';
import { DefaultProfileData, emptyProduct } from './constants';
import { parseCategories } from './parseCategories';
import { parseProfileData } from './parseProfileData';
import { createSignUpBody } from './createSignUpBody';
import {
  AccountSettingsData,
  PasswordChangeData,
} from '../../../pages/profile/types/types';

class ClientApi {
  public isLogin: boolean;
  public categories: MainCategory[];
  public currentCategoryId: string;
  public profileData: ProfileData;
  public priceRange: PriceRange;
  private apiRoot: ByProjectKeyRequestBuilder;

  constructor() {
    this.isLogin = false;
    this.apiRoot = CreateAnonymousApiRoot();
    this.currentCategoryId = '';
    this.categories = [];
    this.profileData = DefaultProfileData;
    this.priceRange = { min: 0, max: 100 };
  }

  public async login(dto: loginDTO): Promise<void> {
    const result = await this.apiRoot
      .me()
      .login()
      .post({
        body: dto,
      })
      .execute();

    this.apiRoot = CreatePasswordApiRoot(dto);
    this.profileData = parseProfileData(result.body.customer);
  }

  public logout(): void {
    this.apiRoot = CreateAnonymousApiRoot();
    this.isLogin = false;
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

  public getCategoryName(id: string): string {
    const category = this.categories.find((item) => item.id === id);
    if (category) return category.name;
    return '';
  }

  public async getProducts(): Promise<ProductData[]> {
    try {
      const response = await this.apiRoot
        .productProjections()
        .search()
        .get({
          queryArgs: {
            filter: [
              `categories.id:"${this.currentCategoryId}"`,
              `variants.price.centAmount: range (${this.priceRange.min} to ${this.priceRange.max})`,
            ],
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
            filter: `id:${id}`,
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
}

export const client = new ClientApi();
