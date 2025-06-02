import { AccountBillingAddressData } from '../../types/types';
import { AddressForm } from './AddressForm';

export function BillingAddress(properties: AccountBillingAddressData) {
  return (
    <div className="account-address billing-address">
      <h3>Billing Address</h3>
      <AddressForm {...properties} />
    </div>
  );
}
