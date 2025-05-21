import { Link, useNavigate } from 'react-router-dom';
import { useFormValidation } from '../../shared/validation/useFomValidation';
import { ROUTES } from '../../types';
import { EmailInput } from '../../widgets/ui/EmailInput';
import { PasswordInput } from '../../widgets/ui/PasswordInput';
import { Button } from '../../shared/ui/Button';
import './login.css';
import '../../shared/styles/forms.css';
import { client } from '../../utils/clientApi/ClientApi';
import { useEffect, useState } from 'react';

export function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    if (client.isLogin) navigate(ROUTES.HOME);
  });

  const {
    formState,
    isValidForm,
    loginButtonState,
    emailValidationHandler,
    passwordValidationHandler,
  } = useFormValidation();
  const { email, password } = formState;
  const { isValidEmail, isValidPassword } = isValidForm;
  const [showError, setShowError] = useState(false);

  if (client.isLogin) return <></>;

  return (
    <section className="login">
      <h1 className="title">Login</h1>
      <form className="form">
        <div className="form-group">
          <label className="form-label" htmlFor="email-input">
            Email
          </label>
          <EmailInput
            isValid={isValidEmail}
            onInput={emailValidationHandler}
            value={email}
          />
        </div>
        <div className="form-group password-input-container">
          <label className="form-label" htmlFor="password-input">
            Password
          </label>
          <PasswordInput
            isValid={isValidPassword}
            onInput={passwordValidationHandler}
            value={password}
          />
        </div>
        {showError && (
          <p className="validation-error">Invalid email or password</p>
        )}
        <Button
          // type="submit"
          onClick={() =>
            client
              .login({ email, password })
              .then(() => {
                navigate(ROUTES.HOME);
              })
              .catch(() => {
                setShowError(true);
              })
          }
          disabled={!loginButtonState}
        >
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
