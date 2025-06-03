import type {
  ByProjectKeyRequestBuilder,
  MyCustomerUpdate,
} from '@commercetools/platform-sdk';
import {
  CreateAnonymousApiRoot,
  CreatePasswordApiRoot,
} from './CreateApiRoots';
import type {
  loginDTO,
  MainCategory,
  ProductData,
  ProfileData,
  singUpDTO,
} from './types';
import { parseProduct } from './parseProduct';
import { DefaultProfileData, emptyProduct } from './constants';
import { parseCategories } from './parseCategories';
import { parseProfileData } from './parseProfileData';
import { createSignUpBody } from './createSignUpBody';
import { AccountSettingsData } from '../../../pages/profile/types/types';

class ClientApi {
  public isLogin: boolean;
  public categories: MainCategory[];
  public currentCategoryId: string;
  public profileData: ProfileData;
  private apiRoot: ByProjectKeyRequestBuilder;

  constructor() {
    this.isLogin = false;
    this.apiRoot = CreateAnonymousApiRoot();
    this.currentCategoryId = '';
    this.categories = [];
    this.profileData = DefaultProfileData;
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
    console.log(result);
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

  public getCategoryName(id: string): string {
    const category = this.categories.find((item) => item.id === id);
    if (category) return category.name;
    return '';
  }

  public async getProducts(): Promise<ProductData[]> {
    try {
      const response = await this.apiRoot
        .products()
        .get(
          this.currentCategoryId
            ? {
                queryArgs: {
                  where: `masterData(current(categories(id = "${this.currentCategoryId}")))`,
                },
              }
            : undefined
        )
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
        .products()
        .withId({ ID: id })
        .get()
        .execute();
      const result = response.body;
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
}

export const client = new ClientApi();
