import { BaseAddress, MyCustomerDraft } from '@commercetools/platform-sdk';
import { singUpDTO } from '../types';
import { countryCodes } from './CountryCodes';

export function createSignUpBody(dto: singUpDTO): MyCustomerDraft {
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

  return body;
}
