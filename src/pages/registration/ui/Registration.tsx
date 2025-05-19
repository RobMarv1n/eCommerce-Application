import { Country } from 'postal-code-validator';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../types';
import { reactHookFormDefaultValues } from '../lib/reactHookFormDefaultValues';
import { RegistrationFormData } from '../model/types';
import { ageValidation } from '../model/validation/ageValidation';
import { isRegistrationButtonDisabled } from '../model/validation/isRegistrationButtonDisabled';
import { validationEmail } from '../model/validation/validationEmail';
import { validationName } from '../model/validation/validationName';
import { validationPassword } from '../model/validation/validationPassword';
import { validationZipCode } from '../model/validation/validationZipCode';
import './registration.css';

export function Registration() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    getFieldState,
  } = useForm<RegistrationFormData>({
    mode: 'onChange',
    defaultValues: reactHookFormDefaultValues,
  });

  const onSubmit: SubmitHandler<RegistrationFormData> = (data) => {
    console.log(data);
    navigate(ROUTES.HOME);
    reset();
  };

  return (
    <>
      <h1>Create Account</h1>
      <form className="registration-form" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Email"
          autoComplete="email"
          {...register('email', {
            required: true,
            validate: validationEmail,
          })}
        />
        {errors?.email && (
          <div style={{ color: 'red' }}>{errors.email.message}</div>
        )}

        <input
          type="password"
          placeholder="Password"
          autoComplete="new-password"
          {...register('password', {
            required: true,
            minLength: {
              value: 8,
              message: 'Minimum length should be 8 characters',
            },
            maxLength: {
              value: 25,
              message: 'Maximum length should be 25 characters',
            },
            validate: validationPassword,
          })}
        />
        {errors?.password && (
          <div style={{ color: 'red' }}>{errors.password.message}</div>
        )}

        <div className="registration-field personal-details">
          <h2>Personal Details</h2>

          <input
            type="text"
            placeholder="First name"
            {...register('firstName', {
              required: false,
              minLength: {
                value: 1,
                message: 'Minimum length should be 1 character',
              },
              validate: (value) => value === '' || validationName(value),
            })}
          />
          {errors?.firstName && (
            <div style={{ color: 'red' }}>{errors.firstName.message}</div>
          )}

          <input
            type="text"
            placeholder="Last name"
            {...register('lastName', {
              required: false,
              minLength: {
                value: 1,
                message: 'Minimum length should be 1 character',
              },
              validate: (value) => value === '' || validationName(value),
            })}
          />
          {errors?.lastName && (
            <div style={{ color: 'red' }}>{errors.lastName.message}</div>
          )}

          <input
            type="date"
            placeholder="Date of birth"
            {...register('birthDate', {
              required: false,
              validate: (value) => value === '' || ageValidation(value),
            })}
          />
          {errors?.birthDate && (
            <div style={{ color: 'red' }}>{errors.birthDate.message}</div>
          )}
        </div>

        <div className="registration-field shipping-address">
          <h2>Shipping Address</h2>

          <input
            type="text"
            placeholder="Street"
            {...register('shippingAddress.street', { required: false })}
          />

          <input
            type="text"
            placeholder="City"
            {...register('shippingAddress.city', { required: false })}
          />

          <select {...register('shippingAddress.country', { required: false })}>
            {Object.values(Country).map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Zip code"
            {...register('shippingAddress.zipCode', {
              required: false,
              validate: (value) =>
                value === '' ||
                validationZipCode(value, getValues('shippingAddress.country')),
            })}
          />
          {errors?.shippingAddress?.zipCode && (
            <div style={{ color: 'red' }}>
              {errors.shippingAddress.zipCode.message}
            </div>
          )}

          <div className="address-checkbox-container">
            <input type="checkbox" id="useAsDefault" />
            <label htmlFor="useAsDefault">Use as default for shipping</label>
          </div>
          <div className="address-checkbox-container">
            <input type="checkbox" id="useShippingForBilling" />
            <label htmlFor="useShippingForBilling">
              Using shipping address as billing
            </label>
          </div>
        </div>

        <div className="registration-field billing-address">
          <h2>Billing Address</h2>

          <input
            type="text"
            placeholder="Street"
            {...register('billingAddress.street', { required: false })}
          />

          <input
            type="text"
            placeholder="City"
            {...register('billingAddress.city', { required: false })}
          />

          <select {...register('billingAddress.country', { required: false })}>
            {Object.values(Country).map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Zip code"
            {...register('billingAddress.zipCode', {
              required: false,
              validate: (value) =>
                value === '' ||
                validationZipCode(value, getValues('billingAddress.country')),
            })}
          />
          {errors?.billingAddress?.zipCode && (
            <div style={{ color: 'red' }}>
              {errors.billingAddress.zipCode.message}
            </div>
          )}

          <div className="address-checkbox-container">
            <input type="checkbox" id="useAsDefaultForBilling" />
            <label htmlFor="useAsDefaultForBilling">
              Use as default for billing
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={isRegistrationButtonDisabled(
            getFieldState('email'),
            getFieldState('password')
          )}
        >
          Create Account
        </button>
      </form>

      <Link to={ROUTES.LOGIN}>Login</Link>
    </>
  );
}
