import { useState } from 'react';
import { Button } from '../../../../shared/ui/Button';
import { Modal } from '../../../../shared/ui/Modal';
import { MOCK_DEFAULT_ADDRESS } from '../../model/DefaultAddresses';
import { AccountAddressForm } from './AccountAddressForm';
import { client } from '../../../../shared/api/clientApi/ClientApi';

export function AccountAddresses() {
  const [addresses, setAddresses] = useState(
    client.profileApi.profileData.accountAddresses
  );
  const [modalOpen, setModalOpen] = useState(false);

  const openModalHandler = () => {
    setModalOpen(true);
  };

  return (
    <>
      <div className="account-addresses">
        {addresses.map((address) => {
          return (
            <AccountAddressForm
              id={address.id || ''}
              key={address.id}
              AccountAddressFormFormData={{
                street: address.street,
                city: address.city,
                country: address.country,
                zipCode: address.zipCode,
                defaultForShipping: address.defaultForShipping,
                defaultForBilling: address.defaultForBilling,
              }}
              isShowInModal={false}
              setAddresses={setAddresses}
            />
          );
        })}
      </div>
      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <AccountAddressForm
            id={''}
            AccountAddressFormFormData={MOCK_DEFAULT_ADDRESS}
            isShowInModal={modalOpen}
            closeModal={() => {
              setModalOpen(false);
            }}
            addresses={addresses}
            setAddresses={setAddresses}
          ></AccountAddressForm>
        </Modal>
      )}

      {addresses.length === 0 && (
        <p>
          <strong>No addresses</strong>
        </p>
      )}

      <Button type="button" onClick={openModalHandler}>
        +
      </Button>
    </>
  );
}
