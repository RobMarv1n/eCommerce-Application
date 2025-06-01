import { Country } from 'postal-code-validator';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '../../../../shared/ui/Button';
import { cityValidationRules } from '../../../../shared/validation/cityValidation';
import { streetValidationRules } from '../../../../shared/validation/streetValidation';
import { zipCodeValidationRules } from '../../../../shared/validation/zipCodeValidation';
import { FormInput } from '../../../../widgets/ui/inputs/FormInput';
import { AccountShippingAddressData } from '../../types/types';

const DefaultShippingAddressData = {
  street: '',
  city: '',
  country: Country.Russia,
  zipCode: '',
};

export function ShippingAddress(
  properties: AccountShippingAddressData = DefaultShippingAddressData
) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<AccountShippingAddressData>({
    mode: 'onChange',
  });

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const onSubmit: SubmitHandler<AccountShippingAddressData> = (data) => {
    console.log(data);
  };

  return (
    <form className="shipping-address" onSubmit={handleSubmit(onSubmit)}>
      <div className="registration-field">
        <h3>Shipping Address</h3>

        <div className="form-group">
          <FormInput
            name="street"
            label="Address"
            id="address-input"
            value={properties.street}
            placeholder="9978 Witham St "
            register={register}
            errors={errors}
            rules={streetValidationRules}
          />
        </div>

        <div className="form-group">
          <FormInput
            name="city"
            label="City"
            id="city-input"
            value={properties.city}
            placeholder="Dallas"
            register={register}
            errors={errors}
            rules={cityValidationRules}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="country-input">
            Country
          </label>
          <select
            id="country-input"
            className="form-input"
            value={properties.country}
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
            value={properties.zipCode}
            placeholder="20033"
            register={register}
            errors={errors}
            rules={zipCodeValidationRules(getValues('country'))}
          />
        </div>
      </div>

      <Button type="submit">Edit</Button>
    </form>
  );
}
