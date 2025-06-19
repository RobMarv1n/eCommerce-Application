import {
  ByProjectKeyRequestBuilder,
  MyCustomerChangePassword,
  MyCustomerUpdate,
} from '@commercetools/platform-sdk';
import {
  AccountAddressFormData,
  AccountSettingsData,
  PasswordChangeData,
} from '../../../../pages/profile/types/types';
import { AccountAddress, ProfileData } from '../types';
import { DefaultProfileData } from '../constants';
import { CreatePasswordApiRoot } from '../CreateApiRoots';
import { countryCodes } from '../utils/CountryCodes';
import { parseProfileData } from '../parsers/parseProfileData';

export class ProfileApi {
  public profileData: ProfileData;
  public apiRoot: ByProjectKeyRequestBuilder;

  constructor(apiRoot: ByProjectKeyRequestBuilder) {
    this.apiRoot = apiRoot;
    this.profileData = DefaultProfileData;
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
      version: this.profileData.version,
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
      version: this.profileData.version,
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
        version: this.profileData.version + 1,
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
      version: this.profileData.version,
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
