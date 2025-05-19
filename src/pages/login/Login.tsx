import { Link, useNavigate } from 'react-router-dom';
import { useFormValidation } from '../../shared/validation/useFomValidation';
import { ROUTES } from '../../types';
import { EmailInput } from '../../widgets/ui/EmailInput';
import { PasswordInput } from '../../widgets/ui/PasswordInput';
import { Button } from '../../shared/ui/Button';
import './login.css';
import '../../shared/styles/forms.css';

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
    <section className="login">
      <h1 className="title">Login</h1>
      <form className="form">
        <div className="form-group">
          <label htmlFor="email-input">Email</label>
          <EmailInput
            isValid={isValidEmail}
            onInput={emailValidationHandler}
            value={email}
          />
        </div>
        <div className="form-group password-input-container">
          <label htmlFor="password-input">Password</label>
          <PasswordInput
            isValid={isValidPassword}
            onInput={passwordValidationHandler}
            value={password}
          />
        </div>
        <Button
          type="submit"
          onClick={() => navigate(ROUTES.HOME)}
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
