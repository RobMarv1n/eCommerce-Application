import { Country } from 'postal-code-validator';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '../../../../shared/ui/Button';
import { cityValidationRules } from '../../../../shared/validation/cityValidation';
import { streetValidationRules } from '../../../../shared/validation/streetValidation';
import { zipCodeValidationRules } from '../../../../shared/validation/zipCodeValidation';
import { FormInput } from '../../../../widgets/ui/inputs/FormInput';
import {
  AccountBillingAddressData,
  AccountShippingAddressData,
} from '../../types/types';

const DefaultAddressData = {
  street: '',
  city: '',
  country: Country.Russia,
  zipCode: '',
};

export function AddressForm(
  properties: AccountBillingAddressData | AccountShippingAddressData
) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
    getValues,
    setValue,
  } = useForm<AccountBillingAddressData | AccountShippingAddressData>({
    mode: 'onChange',
    defaultValues: DefaultAddressData,
    values: properties,
  });

  const onSubmit: SubmitHandler<
    AccountBillingAddressData | AccountShippingAddressData
    // eslint-disable-next-line unicorn/consistent-function-scoping
  > = (data) => {
    console.log(data);
  };

  const [isEditable, setIsEditable] = useState(false);
  const [isDefaultAddress, setIsDefaultAddress] = useState(false);

  const toggleEditable = () => {
    const hasNotErrors = Object.keys(errors).length === 0;

    if (!isEditable) {
      setIsEditable(true);
    } else if (isEditable && hasNotErrors) {
      setIsEditable(false);
    }
  };

  const setDefaultAddressHandler = () => {
    if ('defaultForBilling' in properties && isValid) {
      setValue('defaultForBilling', true);
    }
    if ('defaultForShipping' in properties && isValid) {
      setValue('defaultForShipping', true);
    }
    if (isValid) {
      setIsDefaultAddress(true);
    }
  };

  return (
    <form className="address-form" onSubmit={handleSubmit(onSubmit)}>
      <Button
        type="submit"
        disabled={isEditable || (isSubmitted && isDefaultAddress)}
        onClick={setDefaultAddressHandler}
      >
        {isDefaultAddress ? 'default' : 'make default'}
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
            disabled={!isEditable}
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
            disabled={!isEditable}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="country-input">
            Country
          </label>
          <select
            id="country-input"
            className="form-input"
            disabled={!isEditable}
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
            disabled={!isEditable}
          />
        </div>
      </div>

      <Button type={isEditable ? 'button' : 'submit'} onClick={toggleEditable}>
        {isEditable ? 'Save Changes' : 'Edit'}
      </Button>
    </form>
  );
}
