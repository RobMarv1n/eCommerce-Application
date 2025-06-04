import { Country } from 'postal-code-validator';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '../../../../shared/ui/Button';
import { cityValidationRules } from '../../../../shared/validation/cityValidation';
import { streetValidationRules } from '../../../../shared/validation/streetValidation';
import { zipCodeValidationRules } from '../../../../shared/validation/zipCodeValidation';
import { FormInput } from '../../../../widgets/ui/inputs/FormInput';
import { MOCK_DEFAULT_ADDRESS } from '../../model/DefaultAddresses';
import {
  AccountAddressFormData,
  AccountAddressFormProperties,
} from '../../types/types';

export function AccountAddressForm(properties: AccountAddressFormProperties) {
  const { isShowInModal, children, closeModal, addresses, setAddresses } =
    properties;
  const { defaultForBilling, defaultForShipping } =
    properties.AccountAddressFormFormData;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
    getValues,
    setValue,
  } = useForm<AccountAddressFormData>({
    mode: 'onChange',
    defaultValues: MOCK_DEFAULT_ADDRESS,
    values: properties.AccountAddressFormFormData,
  });

  const onSubmit: SubmitHandler<AccountAddressFormData> = (data) => {
    console.log(data);
    closeModal?.();
    setAddresses?.([...(addresses || []), data]);
  };

  const [isEditable, setIsEditable] = useState(false);
  const [isDefaultForShipping, setIsDefaultForShipping] = useState(false);
  const [isDefaultForBilling, setIsDefaultForBilling] = useState(false);

  const toggleEditable = () => {
    const hasNotErrors = Object.keys(errors).length === 0;
    if (!isEditable) {
      setIsEditable(true);
    } else if (isEditable && hasNotErrors) {
      setIsEditable(false);
    }
  };

  const setDefaultShippingAddressHandler = () => {
    if (isValid) {
      setValue('defaultForShipping', true);
      setIsDefaultForShipping(true);
    }
  };

  const setDefaultBillingAddressHandler = () => {
    if (isValid) {
      setValue('defaultForBilling', true);
      setIsDefaultForBilling(true);
    }
  };

  return (
    <form className="address-form" onSubmit={handleSubmit(onSubmit)}>
      <Button
        type="submit"
        disabled={
          defaultForShipping ||
          isEditable ||
          (isSubmitted && isDefaultForShipping)
        }
        onClick={setDefaultShippingAddressHandler}
      >
        {isDefaultForShipping
          ? 'default for shipping'
          : 'make default for shipping'}
      </Button>

      <Button
        type="submit"
        disabled={
          defaultForBilling ||
          isEditable ||
          (isSubmitted && isDefaultForBilling)
        }
        onClick={setDefaultBillingAddressHandler}
      >
        {isDefaultForBilling
          ? 'default for billing'
          : 'make default for billing'}
      </Button>

      <Button type="button" className="delete-address-button">
        ✕
      </Button>

      <div className="registration-field">
        <div className="form-group">
          <FormInput
            name="street"
            label="Address"
            id="address-input"
            placeholder="9978 Witham St"
            register={register}
            errors={errors}
            rules={streetValidationRules}
            disabled={!isShowInModal && !isEditable}
          />
        </div>

        <div className="form-group">
          <FormInput
            name="city"
            label="City"
            id="city-input"
            placeholder="Dallas"
            register={register}
            errors={errors}
            rules={cityValidationRules}
            disabled={!isShowInModal && !isEditable}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="country-input">
            Country
          </label>
          <select
            id="country-input"
            className="form-input"
            disabled={!isShowInModal && !isEditable}
            {...register('country', { required: false })}
          >
            {Object.values(Country).map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <FormInput
            name="zipCode"
            label="Zip Code"
            id="zip-code-input"
            placeholder="20033"
            register={register}
            errors={errors}
            rules={zipCodeValidationRules(getValues('country'))}
            disabled={!isShowInModal && !isEditable}
          />
        </div>
      </div>

      {!isShowInModal && (
        <Button
          type={isEditable ? 'button' : 'submit'}
          onClick={toggleEditable}
        >
          {isEditable ? 'Save Changes' : 'Edit'}
        </Button>
      )}

      {isShowInModal && <Button type="submit">Save</Button>}

      {children}
    </form>
  );
}
