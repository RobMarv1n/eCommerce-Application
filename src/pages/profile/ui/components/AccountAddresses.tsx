import { Country } from 'postal-code-validator';
import { useState } from 'react';
import { Button } from '../../../../shared/ui/Button';
import { AccountAddressesData } from '../../types/types';
import { BillingAddress } from './BillingAddress';
import { ShippingAddress } from './ShippingAddress';

export function AccountAddresses() {
  const DefaultAddresses = {
    shippingAddress: {
      street: '',
      city: '',
      country: Country.Russia,
      zipCode: '',
      defaultForShipping: false,
    },

    billingAddress: {
      street: 'Lenina 1',
      city: 'Rostov',
      country: Country.Russia,
      zipCode: '123456',
      defaultForBilling: false,
    },
  };

  const getAddresses: AccountAddressesData[] = [DefaultAddresses];

  const [addresses, setAddresses] = useState(getAddresses);

  const addAddressesHandler = () => {
    console.log(addresses);
    setAddresses([DefaultAddresses, ...addresses]);
  };

  return (
    <>
      {addresses.map((address) => {
        return (
          <div
            className="account-addresses"
            key={address.shippingAddress.street + Number(Math.random())}
          >
            <ShippingAddress
              street={address.shippingAddress.street}
              city={address.shippingAddress.city}
              country={address.shippingAddress.country}
              zipCode={address.shippingAddress.zipCode}
              defaultForShipping={address.shippingAddress.defaultForShipping}
            />
            <BillingAddress
              street={address.billingAddress.street}
              city={address.billingAddress.city}
              country={address.billingAddress.country}
              zipCode={address.billingAddress.zipCode}
              defaultForBilling={address.billingAddress.defaultForBilling}
            />
          </div>
        );
      })}

      <Button type="button" onClick={addAddressesHandler}>
        +
      </Button>
    </>
  );
}
