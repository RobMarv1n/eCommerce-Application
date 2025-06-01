import { Country } from 'postal-code-validator';
import { Button } from '../../../../shared/ui/Button';
import { AccountAddressesData } from '../../types/types';
import { BillingAddress } from './BillingAddress';
import { ShippingAddress } from './ShippingAddress';

export function AccountAddresses() {
  const DefaultAddresses: AccountAddressesData = [
    {
      shippingAddress: {
        street: '',
        city: '',
        country: Country.Russia,
        zipCode: '',
      },

      billingAddress: {
        street: '',
        city: '',
        country: Country.Russia,
        zipCode: '',
      },
    },
  ];
  return (
    <>
      {DefaultAddresses.map((address) => {
        return (
          <div
            className="account-addresses"
            key={address.shippingAddress.street}
          >
            <ShippingAddress
              street={address.shippingAddress.street}
              city={address.shippingAddress.city}
              country={address.shippingAddress.country}
              zipCode={address.shippingAddress.zipCode}
            />
            <BillingAddress
              street={address.billingAddress.street}
              city={address.billingAddress.city}
              country={address.billingAddress.country}
              zipCode={address.billingAddress.zipCode}
            />
          </div>
        );
      })}

      <Button type="button">+</Button>
    </>
  );
}
