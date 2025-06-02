import type {
  BaseAddress,
  ByProjectKeyRequestBuilder,
  ClientResponse,
  CustomerSignInResult,
  MyCustomerDraft,
} from '@commercetools/platform-sdk';
import { countryCodes } from './CountryCodes';
import {
  CreateAnonymousApiRoot,
  CreatePasswordApiRoot,
} from './CreateApiRoots';
import type { loginDTO, MainCategory, ProductData, singUpDTO } from './types';
import { parseProduct } from './parseProduct';
import { emptyProduct } from './constants';
import { parseCategories } from './parseCategories';

class ClientApi {
  public isLogin: boolean;
  public categories: MainCategory[];
  public currentCategoryId: string;
  private apiRoot: ByProjectKeyRequestBuilder;

  constructor() {
    this.isLogin = false;
    this.apiRoot = CreateAnonymousApiRoot();
    this.currentCategoryId = '';
    this.categories = [];
  }

  public async login(
    dto: loginDTO
  ): Promise<ClientResponse<CustomerSignInResult>> {
    const result = await this.apiRoot
      .me()
      .login()
      .post({
        body: dto,
      })
      .execute();

    this.apiRoot = CreatePasswordApiRoot(dto);
    return result;
  }

  public logout(): void {
    this.apiRoot = CreateAnonymousApiRoot();
    this.isLogin = false;
  }

  public async signUp(
    dto: singUpDTO
  ): Promise<ClientResponse<CustomerSignInResult>> {
    const addresses: BaseAddress[] = [
      {
        country: countryCodes[dto.shippingAddress.country],
        city: dto.shippingAddress.city,
        streetName: dto.shippingAddress.street,
        postalCode: dto.shippingAddress.zipCode,
      },
    ];

    const defaultShippingAddress = dto.shippingAddress.useAsDefaultForShipping
      ? 0
      : undefined;
    let defaultBillingAddress = dto.billingAddress.useAsDefaultForBilling
      ? 0
      : undefined;

    if (!dto.shippingAddress.useShippingAsBilling) {
      addresses.push({
        country: countryCodes[dto.billingAddress.country],
        city: dto.billingAddress.city,
        streetName: dto.billingAddress.street,
        postalCode: dto.billingAddress.zipCode,
      });

      defaultBillingAddress = dto.billingAddress.useAsDefaultForBilling
        ? 1
        : undefined;
    }

    const body: MyCustomerDraft = {
      email: dto.email,
      password: dto.password,
      firstName: dto.firstName,
      lastName: dto.lastName,
      defaultShippingAddress,
      defaultBillingAddress,
      addresses,
    };

    const result = this.apiRoot
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
    return result;
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
