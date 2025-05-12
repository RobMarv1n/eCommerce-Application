import { Link, useNavigate } from 'react-router-dom';
import { useFormValidation } from '../../Shared/validation/useFomValidation';
import { ROUTES } from '../../types';
import { EmailInput } from '../../widgets/ui/EmailInput';
import { PasswordInput } from '../../widgets/ui/PasswordInput';
import './login.css';

export function Login() {
  const navigate = useNavigate();
  const {
    formState,
    isValidForm,
    loginButtonState,
    emailValidationHandler,
    passwordValidationHandler,
  } = useFormValidation();
  const { email, password } = formState;
  const { isValidEmail, isValidPassword } = isValidForm;

  return (
    <div className="login-page-container">
      <h1>Login</h1>
      <form className="login-form">
        <label htmlFor="login-input">Email</label>
        <EmailInput
          isValid={isValidEmail}
          onInput={emailValidationHandler}
          value={email}
        />

        <label htmlFor="password-input">Password</label>
        <PasswordInput
          isValid={isValidPassword}
          onInput={passwordValidationHandler}
          value={password}
        />
      </form>
      <button
        type="submit"
        onClick={() => navigate(ROUTES.HOME)}
        disabled={!loginButtonState}
      >
        Login
      </button>
      <div>
        Don't have account? <Link to={ROUTES.SIGN_UP}>Register</Link>
      </div>
    </div>
  );
}
