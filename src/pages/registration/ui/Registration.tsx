import { Country } from 'postal-code-validator';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import '../../../shared/styles/forms.css';
import { Button } from '../../../shared/ui/Button';
import { ROUTES } from '../../../types';
import { client } from '../../../utils/clientApi/ClientApi';
import { RegistrationPasswordInput } from '../../../widgets/ui/inputs/RegistrationPasswordInput';
import { TextInput } from '../../../widgets/ui/inputs/TextInput';
import { reactHookFormDefaultValues } from '../lib/reactHookFormDefaultValues';
import { RegistrationFormData } from '../model/types';
import { ageValidation } from '../model/validation/ageValidation';
import { isRegistrationButtonDisabled } from '../model/validation/isRegistrationButtonDisabled';
import { emailValidationRules } from '../model/validation/validationEmail';
import { validationName } from '../model/validation/validationName';
import { passwordValidationRules } from '../model/validation/validationPassword';
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
    control,
  } = useForm<RegistrationFormData>({
    mode: 'onChange',
    defaultValues: reactHookFormDefaultValues,
  });

  const onSubmit: SubmitHandler<RegistrationFormData> = (data) => {
    client
      .signUp(data)
      .then(() => {
        console.log('New user successfully sign up');
        navigate(ROUTES.HOME);
      })
      .catch(() => console.log('A user with this email is already registered'));
    reset();
  };

  return (
    <section className="register">
      <h1 className="title">Create Account</h1>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="registration-field">
          <div className="form-group">
            <TextInput
              label="Email"
              id="email-input"
              register={register}
              name="email"
              errors={errors}
              rules={emailValidationRules}
            />
          </div>

          <div className="form-group password-input-container">
            <RegistrationPasswordInput
              control={control}
              name="password"
              rules={passwordValidationRules}
            />
          </div>
        </div>

        <div className="registration-field personal-details">
          <h2 className="form-title">Personal Details</h2>

          <div className="form-group">
            <label className="form-label" htmlFor="first-name-input">
              First name
            </label>
            <input
              className="form-input"
              type="text"
              id="first-name-input"
              placeholder="Dianne"
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
              <div className="validation-error">{errors.firstName.message}</div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="last-name-input">
              Last name
            </label>
            <input
              className="form-input"
              type="text"
              id="last-name-input"
              placeholder="Russell"
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
              <div className="validation-error">{errors.lastName.message}</div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="date-input">
              Date of birth
            </label>
            <input
              className="form-input"
              type="date"
              id="date-input"
              placeholder="dd.mm.yyyy"
              {...register('birthDate', {
                required: false,
                validate: (value) => value === '' || ageValidation(value),
              })}
            />
            {errors?.birthDate && (
              <div className="validation-error">{errors.birthDate.message}</div>
            )}
          </div>
        </div>

        <div className="registration-field shipping-address">
          <h2 className="form-title">Shipping Address</h2>

          <div className="form-group">
            <label className="form-label" htmlFor="address-input">
              Address
            </label>
            <input
              className="form-input"
              type="text"
              id="address-input"
              placeholder="9978 Witham St "
              {...register('shippingAddress.street', { required: false })}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="city-input">
              City
            </label>
            <input
              className="form-input"
              type="text"
              id="city-input"
              placeholder="Dallas"
              {...register('shippingAddress.city', { required: false })}
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
                  validationZipCode(
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
          <h2 className="form-title">Billing Address</h2>

          <div className="form-group">
            <label className="form-label" htmlFor="address-billing-input">
              Address
            </label>
            <input
              className="form-input"
              type="text"
              id="address-billing-input"
              placeholder="9978 Witham St "
              {...register('billingAddress.street', { required: false })}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="city-billing-input">
              City
            </label>
            <input
              className="form-input"
              type="text"
              id="city-billing-input"
              placeholder="City"
              {...register('billingAddress.city', { required: false })}
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
                  validationZipCode(value, getValues('billingAddress.country')),
              })}
            />
            {errors?.billingAddress?.zipCode && (
              <div className="validation-error">
                {errors.billingAddress.zipCode.message}
              </div>
            )}
          </div>

          <div className="address-checkbox-container">
            <input type="checkbox" id="useAsDefaultForBilling" />
            <label htmlFor="useAsDefaultForBilling">
              Use as default for billing
            </label>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isRegistrationButtonDisabled(
            getFieldState('email'),
            getFieldState('password')
          )}
          onClick={() => navigate(ROUTES.HOME)}
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
