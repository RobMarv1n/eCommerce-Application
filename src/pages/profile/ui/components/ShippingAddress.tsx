import { AccountShippingAddressData } from '../../types/types';
import { AddressForm } from './AddressForm';

export function ShippingAddress(properties: AccountShippingAddressData) {
  return (
    <div className="shipping-address">
      <h3>Shipping Address</h3>
      <AddressForm {...properties} />
    </div>
  );
}
