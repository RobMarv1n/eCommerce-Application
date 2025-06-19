import type {
  ByProjectKeyRequestBuilder,
  MyCustomerChangePassword,
  MyCustomerUpdate,
} from '@commercetools/platform-sdk';
import {
  CreateAnonymousApiRoot,
  CreatePasswordApiRoot,
} from './CreateApiRoots';
import {
  AccountAddress,
  type loginDTO,
  type ProfileData,
  type singUpDTO,
} from './types';
import { DefaultProfileData } from './constants';
import { parseProfileData } from './parsers/parseProfileData';
import { createSignUpBody } from './utils/createSignUpBody';
import {
  AccountAddressFormData,
  AccountSettingsData,
  PasswordChangeData,
} from '../../../pages/profile/types/types';
import { countryCodes } from './utils/CountryCodes';
import { parseCartData } from './parsers/parseCartData';
import { CartApi } from './subclasses/CartApi';
import { ProductApi } from './subclasses/ProductApi';

class ClientApi {
  public isLogin: boolean;
  public profileData: ProfileData;
  public productApi: ProductApi;
  public cartApi: CartApi;
  private apiRoot: ByProjectKeyRequestBuilder;

  constructor() {
    this.isLogin = false;
    this.apiRoot = CreateAnonymousApiRoot();
    this.profileData = DefaultProfileData;

    this.productApi = new ProductApi(this.apiRoot);
    this.cartApi = new CartApi(this.apiRoot);
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
    this.cartApi.cartData.id = cart.body.id;
    this.cartApi.cartData.version = cart.body.version;
    this.cartApi.cartData = parseCartData(cart.body);
  }

  public async logout(): Promise<void> {
    this.apiRoot = CreateAnonymousApiRoot();
    this.isLogin = false;
    const cart = await this.cartApi.createCart();
    this.cartApi.cartData.id = cart.id;
    this.cartApi.cartData.version = cart.version;
    this.cartApi.cartData.products = [];
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
    this.cartApi.cartData.id = cart.body.id;
    this.cartApi.cartData.version = cart.body.version;
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
}

export const client = new ClientApi();
