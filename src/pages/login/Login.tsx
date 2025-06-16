import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { client } from '../../shared/api/clientApi/ClientApi';
import { Button } from '../../shared/ui/Button';
import { emailValidationRules } from '../../shared/validation/emailValidation';
import { passwordValidationRules } from '../../shared/validation/passwordValidation';
import { ROUTES } from '../../types';
import { FormInput } from '../../widgets/ui/inputs/FormInput';
import { FormPasswordInput } from '../../widgets/ui/inputs/FormPasswordInput';
import { RegistrationFormDefaultValues } from '../registration/lib/RegistrationFormDefaultValues';
import './login.css';
import { LoginFormData } from './model/types';

type Properties = {
  setCartCount: React.Dispatch<React.SetStateAction<number>>;
};

export function Login({ setCartCount }: Properties) {
  const navigate = useNavigate();

  useEffect(() => {
    if (client.isLogin) navigate(ROUTES.HOME);
  });

  const [showError, setShowError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<LoginFormData>({
    mode: 'onChange',
    defaultValues: RegistrationFormDefaultValues,
  });

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    await client
      .login(data)
      .then(() => {
        client.isLogin = true;
        setCartCount(client.cartCount);
        navigate(ROUTES.HOME);
      })
      .catch(() => {
        setShowError(true);
      });
    reset();
  };

  if (client.isLogin) return <></>;

  return (
    <section className="login">
      <h1 className="title">Login</h1>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <FormInput
            className="form-input"
            name="email"
            label="Email"
            id="email-input"
            placeholder="Email"
            register={register}
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
            autocomplete="current-password"
          />
        </div>
        {showError && (
          <p className="validation-error">Invalid email or password</p>
        )}
        <Button type="submit" disabled={!isValid}>
          Login
        </Button>
      </form>
      <p className="form-question">
        Don't have account?{' '}
        <Link to={ROUTES.REGISTRATION} className="form-link">
          Register
        </Link>
      </p>
    </section>
  );
}
