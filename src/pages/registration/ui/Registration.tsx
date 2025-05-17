import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../types';
import { RegistrationFormData } from '../model/types';
import './registration.css';

export function Registration() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    getValues,
    getFieldState,
  } = useForm<RegistrationFormData>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<RegistrationFormData> = (data) => {
    console.log(data.email);

    reset();
  };

  console.log(getValues('email'));
  console.log(getFieldState('email'));

  return (
    <>
      <h1>Create Account</h1>
      <form className="registration-form" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Email"
          {...register('email', {
            required: true,
            validate: {
              validationEmail: (value) => {
                if (!(value === value.trim())) {
                  return 'Email must not contain trailing spaces';
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
                ) {
                  return 'Expected format: user@example.com';
                }
              },
            },
          })}
        />
        {errors?.email && (
          <div style={{ color: 'red' }}>{errors.email.message}</div>
        )}

        <input
          type="password"
          placeholder="Password"
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
            validate: {
              validationPassword: (value) => {
                if (!(value === value.trim())) {
                  return 'Password must not contain trailing spaces';
                } else if (!/[a-z]/.test(value)) {
                  return 'Password must contain at least one lowercase letter';
                } else if (!/[A-Z]/.test(value)) {
                  return 'Password must contain at least one capital letter';
                } else if (!/\d/.test(value)) {
                  return 'Password must contain at least one digit';
                } else if (!/[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/.test(value)) {
                  return 'Password must contain at least one special character';
                }
              },
            },
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
            {...register('firstName', { required: true })}
          />
          <input
            type="text"
            placeholder="Last name"
            {...register('lastName', { required: true })}
          />
          <input
            type="date"
            placeholder="Date of birth"
            {...register('birthDate', { required: false })}
          />
        </div>

        <div className="registration-field shipping-address">
          <h2>Shipping Address</h2>
          <input
            type="text"
            placeholder="Street"
            {...register('address.street', { required: false })}
          />
          <input
            type="text"
            placeholder="City"
            {...register('address.city', { required: false })}
          />
          <select {...register('address.country', { required: false })} />
          <input
            type="text"
            placeholder="Zip code"
            {...register('address.zipCode', { required: false })}
          />
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
            {...register('address.street', { required: false })}
          />
          <input
            type="text"
            placeholder="City"
            {...register('address.city', { required: false })}
          />
          <select {...register('address.country', { required: false })} />
          <input
            type="text"
            placeholder="Zip code"
            {...register('address.zipCode', { required: false })}
          />
          <div className="address-checkbox-container">
            <input type="checkbox" id="useAsDefaultForBilling" />
            <label htmlFor="useAsDefaultForBilling">
              Use as default for billing
            </label>
          </div>
        </div>

        <button
          type="submit"
          onClick={() => navigate(ROUTES.HOME)}
          disabled={!isValid}
        >
          Create Account
        </button>
      </form>

      <Link to={ROUTES.LOGIN}>Login</Link>
    </>
  );
}
