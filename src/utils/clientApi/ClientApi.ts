import type {
  ByProjectKeyRequestBuilder,
  ClientResponse,
  CustomerSignInResult,
  MyCustomerDraft,
} from '@commercetools/platform-sdk';
import {
  CreateAnonymousApiRoot,
  CreatePasswordApiRoot,
} from './CreateApiRoots';
import type { loginDTO, singUpDTO } from './types';
import { countryCodes } from './CountryCodes';

class ClientApi {
  public isLogin: boolean;
  private apiRoot: ByProjectKeyRequestBuilder;

  constructor() {
    this.isLogin = false;
    this.apiRoot = CreateAnonymousApiRoot();
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
    this.isLogin = true;
    return result;
  }

  public logout(): void {
    this.apiRoot = CreateAnonymousApiRoot();
    this.isLogin = false;
  }

  public async signUp(
    dto: singUpDTO
  ): Promise<ClientResponse<CustomerSignInResult>> {
    const body: MyCustomerDraft = {
      email: dto.email,
      password: dto.password,
      firstName: dto.firstName,
      lastName: dto.lastName,
      defaultShippingAddress: dto.shippingAddress.useAsDefaultForShipping
        ? 0
        : undefined,
      defaultBillingAddress: dto.billingAddress.useAsDefaultForBilling
        ? 1
        : undefined,
      addresses: [
        {
          country: countryCodes[dto.shippingAddress.country],
          city: dto.shippingAddress.city,
          streetName: dto.shippingAddress.street,
          postalCode: dto.shippingAddress.zipCode,
        },
        {
          country: countryCodes[dto.billingAddress.country],
          city: dto.billingAddress.city,
          streetName: dto.billingAddress.street,
          postalCode: dto.billingAddress.zipCode,
        },
      ],
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
    this.isLogin = true;
    return result;
  }
}

export const client = new ClientApi();
