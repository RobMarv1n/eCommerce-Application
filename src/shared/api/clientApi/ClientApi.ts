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
import type { loginDTO, singUpDTO } from './types';

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
}

export const client = new ClientApi();
