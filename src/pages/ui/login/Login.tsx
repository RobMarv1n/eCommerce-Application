import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ON_CHANGE_EVENT, ON_INPUT_EVENT, ROUTES } from '../../../types';
import { EmailInput } from '../../../widgets/ui/EmailInput';
import { PasswordInput } from '../../../widgets/ui/PasswordInput';
import './login.css';

export function Login() {
  const navigate = useNavigate();

  const [formState, setFormState] = useState({ email: '', password: '' });
  const { email, password } = formState;

  const [isValidForm, setIsValidForm] = useState({
    isValidEmail: true,
    isValidPassword: true,
  });
  const { isValidEmail, isValidPassword } = isValidForm;

  const [loginButtonState, setLoginButtonState] = useState(false);

  const emailValidationHandler = (event: ON_INPUT_EVENT | ON_CHANGE_EVENT) => {
    const currentValue = event.currentTarget.value;
    setFormState({ ...formState, email: currentValue });

    const isValidValue =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(currentValue);

    setIsValidForm({ ...isValidForm, isValidEmail: isValidValue });
    toggleLoginButtonStatus(isValidValue, isValidPassword);
  };

  const passwordValidationHandler = (
    event: ON_INPUT_EVENT | ON_CHANGE_EVENT
  ) => {
    const currentValue = event.currentTarget.value;
    setFormState({ ...formState, password: currentValue });

    const minPasswordLength = currentValue.length > 8;
    const maxPasswordLength = currentValue.length < 25;
    const hasOneLowercaseLetter = /[a-z]/.test(currentValue);
    const hasOneCapitalLetter = /[A-Z]/.test(currentValue);
    const hasOneDigit = /\d/.test(currentValue);
    const hasOneSpecialChar = /[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/.test(
      currentValue
    );
    if (
      minPasswordLength &&
      maxPasswordLength &&
      hasOneLowercaseLetter &&
      hasOneCapitalLetter &&
      hasOneDigit &&
      hasOneSpecialChar
    ) {
      toggleLoginButtonStatus(isValidEmail, true);
      setIsValidForm({ ...isValidForm, isValidPassword: true });
    } else {
      toggleLoginButtonStatus(isValidEmail, false);
      setIsValidForm({ ...isValidForm, isValidPassword: false });
    }
  };

  const toggleLoginButtonStatus = (
    emailValidation: boolean,
    passwordValidation: boolean
  ) => {
    if (emailValidation && passwordValidation && email && password) {
      setLoginButtonState(true);
    } else {
      setLoginButtonState(false);
    }
  };

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
