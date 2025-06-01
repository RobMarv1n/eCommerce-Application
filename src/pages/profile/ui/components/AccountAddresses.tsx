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
    },

    billingAddress: {
      street: 'Lenina 1',
      city: 'Rostov',
      country: Country.Russia,
      zipCode: '12345',
    },
  };

  const getAddresses: AccountAddressesData[] = [DefaultAddresses];

  const [addresses, setAddresses] = useState(getAddresses);
  // const [isDefaultForBilling, setIsDefaultForBilling] = useState(false);

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
            {/* <Button
              onClick={() => setIsDefaultForBilling(!isDefaultForBilling)}
            >
              {isDefaultForBilling ? 'default' : 'make default'}
            </Button> */}
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

      <Button type="button" onClick={addAddressesHandler}>
        +
      </Button>
    </>
  );
}
