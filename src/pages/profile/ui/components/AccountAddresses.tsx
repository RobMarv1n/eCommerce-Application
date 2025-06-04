import { useState } from 'react';
import { Button } from '../../../../shared/ui/Button';
import { Modal } from '../../../../shared/ui/Modal';
import {
  MOCK_DEFAULT_ADDRESS,
  MOCK_DEFAULT_BILLING_ADDRESS,
  MOCK_DEFAULT_SHIPPING_ADDRESS,
} from '../../model/DefaultAddresses';
import { AccountAddressFormData } from '../../types/types';
import { AccountAddressForm } from './AccountAddressForm';

export function AccountAddresses() {
  const getAddresses: AccountAddressFormData[] = [
    MOCK_DEFAULT_SHIPPING_ADDRESS,
    MOCK_DEFAULT_BILLING_ADDRESS,
  ];

  const [addresses, setAddresses] = useState(getAddresses);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModalHandler = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      {addresses.map((address) => {
        return (
          <div
            className="account-addresses"
            key={address.street + Number(Math.random())}
          >
            <AccountAddressForm
              AccountAddressFormFormData={{
                street: address.street,
                city: address.city,
                country: address.country,
                zipCode: address.zipCode,
                defaultForShipping: address.defaultForShipping,
                defaultForBilling: address.defaultForBilling,
              }}
              isShowInModal={false}
            />
          </div>
        );
      })}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
      >
        <AccountAddressForm
          AccountAddressFormFormData={MOCK_DEFAULT_ADDRESS}
          isShowInModal={isModalOpen}
          closeModal={() => {
            setIsModalOpen(false);
          }}
          addresses={addresses}
          setAddresses={setAddresses}
        ></AccountAddressForm>
      </Modal>

      <Button type="button" onClick={openModalHandler}>
        +
      </Button>
    </>
  );
}
