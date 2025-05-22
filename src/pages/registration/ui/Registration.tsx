import { Country } from 'postal-code-validator';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import '../../../shared/styles/forms.css';
import { Button } from '../../../shared/ui/Button';
import { emailValidationRules } from '../../../shared/validation/emailValidation';
import { isRegistrationButtonDisabled } from '../../../shared/validation/isRegistrationButtonDisabled';

import { ageValidationRules } from '../../../shared/validation/ageValidation';
import { cityValidationRules } from '../../../shared/validation/cityValidation';
import { nameValidationRules } from '../../../shared/validation/nameValidation';
import { passwordValidationRules } from '../../../shared/validation/passwordValidation';
import { streetValidationRules } from '../../../shared/validation/streetValidation';
import { zipCodeValidation } from '../../../shared/validation/zipCodeValidation';
import { ROUTES } from '../../../types';
import { client } from '../../../utils/clientApi/ClientApi';
import { FormInput } from '../../../widgets/ui/inputs/FormInput';
import { FormPasswordInput } from '../../../widgets/ui/inputs/FormPasswordInput';
import { RegistrationFormDefaultValues } from '../lib/RegistrationFormDefaultValues';
import { RegistrationFormData } from '../model/types';
import './registration.css';

export function Registration() {
  const navigate = useNavigate();

  useEffect(() => {
    if (client.isLogin) navigate(ROUTES.HOME);
  });

  const [showError, setShowError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    getFieldState,
  } = useForm<RegistrationFormData>({
    mode: 'onChange',
    defaultValues: RegistrationFormDefaultValues,
  });

  const onSubmit: SubmitHandler<RegistrationFormData> = (data) => {
    client
      .signUp(data)
      .then(() => {
        client
          .login({ email: data.email, password: data.password })
          .then(() => {
            client.isLogin = true;
            navigate(ROUTES.HOME);
          });
      })
      .catch(() => setShowError(true));
    reset();
  };

  if (client.isLogin) return <></>;

  return (
    <section className="register">
      <h1 className="title">Create Account</h1>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="registration-field">
          <div className="form-group">
            <FormInput
              label="Email"
              id="email-input"
              register={register}
              name="email"
              errors={errors}
              rules={emailValidationRules}
            />
          </div>

          <div className="form-group password-input-container">
            <FormPasswordInput
              type="password"
              name="password"
              label="Password"
              id="password-input"
              placeholder="Password"
              register={register}
              errors={errors}
              rules={passwordValidationRules}
            />
          </div>
        </div>

        <div className="registration-field personal-details">
          <h2 className="form-title">Personal Details</h2>

          <div className="form-group">
            <FormInput
              name="firstName"
              label="First name"
              id="first-name-input"
              placeholder="Dianne"
              register={register}
              errors={errors}
              rules={nameValidationRules}
            />
          </div>

          <div className="form-group">
            <FormInput
              name="lastName"
              label="Last name"
              id="last-name-input"
              placeholder="Russell"
              register={register}
              errors={errors}
              rules={nameValidationRules}
            />
          </div>

          <div className="form-group">
            <FormInput
              type="date"
              name="birthDate"
              label="Date of birth"
              id="date-input"
              placeholder="dd.mm.yyyy"
              register={register}
              errors={errors}
              rules={ageValidationRules}
            />
          </div>
        </div>

        <div className="registration-field shipping-address">
          <h2 className="form-title">Shipping Address</h2>

          <div className="form-group">
            <FormInput
              name="shippingAddress.street"
              label="Address"
              id="address-input"
              placeholder="9978 Witham St "
              register={register}
              errors={errors}
              rules={streetValidationRules}
            />
          </div>

          <div className="form-group">
            <FormInput
              name="shippingAddress.city"
              label="City"
              id="city-input"
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
              {...register('shippingAddress.country', { required: false })}
            >
              {Object.values(Country).map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="zip-code-input">
              Zip Code
            </label>
            <input
              className="form-input"
              type="text"
              id="zip-code-input"
              placeholder="20033"
              {...register('shippingAddress.zipCode', {
                required: false,
                validate: (value) =>
                  value === '' ||
                  zipCodeValidation(
                    value,
                    getValues('shippingAddress.country')
                  ),
              })}
            />
            {errors?.shippingAddress?.zipCode && (
              <div className="validation-error">
                {errors.shippingAddress.zipCode.message}
              </div>
            )}
          </div>

          <div className="address-checkbox-container">
            <input
              {...register('shippingAddress.useAsDefaultForShipping')}
              type="checkbox"
              id="useAsDefault"
            />
            <label htmlFor="useAsDefault">Use as default for shipping</label>
          </div>
          <div className="address-checkbox-container">
            <input
              {...register('shippingAddress.useShippingAsBilling')}
              type="checkbox"
              id="useShippingForBilling"
            />
            <label htmlFor="useShippingForBilling">
              Using shipping address as billing
            </label>
          </div>
        </div>

        <div className="registration-field billing-address">
          <h2 className="form-title">Billing Address</h2>

          <div className="form-group">
            <FormInput
              className="form-input"
              name="billingAddress.street"
              label="Address"
              id="address-billing-input"
              placeholder="9978 Witham St "
              register={register}
              errors={errors}
              rules={streetValidationRules}
            />
          </div>

          <div className="form-group">
            <FormInput
              className="form-input"
              name="billingAddress.city"
              label="City"
              id="city-billing-input"
              placeholder="City"
              register={register}
              errors={errors}
              rules={cityValidationRules}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="country-billing-input">
              Country
            </label>
            <select
              className="form-input"
              id="country-billing-input"
              {...register('billingAddress.country', { required: false })}
            >
              {Object.values(Country).map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="zip-code-billing-input">
              Zip Code
            </label>
            <input
              className="form-input"
              type="text"
              id="zip-code-billing-input"
              placeholder="20033"
              {...register('billingAddress.zipCode', {
                required: false,
                validate: (value) =>
                  value === '' ||
                  zipCodeValidation(value, getValues('billingAddress.country')),
              })}
            />
            {errors?.billingAddress?.zipCode && (
              <div className="validation-error">
                {errors.billingAddress.zipCode.message}
              </div>
            )}
          </div>

          <div className="address-checkbox-container">
            <input
              {...register('billingAddress.useAsDefaultForBilling')}
              type="checkbox"
              id="useAsDefaultForBilling"
            />
            <label htmlFor="useAsDefaultForBilling">
              Use as default for billing
            </label>
          </div>
        </div>

        {showError && (
          <p className="validation-error">
            A user with this email is already registered
          </p>
        )}

        <Button
          type="submit"
          disabled={isRegistrationButtonDisabled(
            getFieldState('email'),
            getFieldState('password')
          )}
        >
          Create Account
        </Button>
      </form>
      <p className="form-question">
        Already have account?{' '}
        <Link to={ROUTES.LOGIN} className="form-link">
          Login
        </Link>
      </p>
    </section>
  );
}
