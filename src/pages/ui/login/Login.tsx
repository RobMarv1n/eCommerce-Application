import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ON_CHANGE_EVENT, ON_INPUT_EVENT, ROUTES } from '../../../types';
import { EmailInput } from '../../../widgets/ui/EmailInput';
import { PasswordInput } from '../../../widgets/ui/PasswordInput';
import './login.css';

export function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);

  const [isValidForm, setIsValidForm] = useState(false);

  const emailValidationHandler = (event: ON_INPUT_EVENT | ON_CHANGE_EVENT) => {
    const currentValue = event.currentTarget.value;
    setEmail(currentValue);

    const isValidValue =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(currentValue);
    setIsValidEmail(isValidValue);
    toggleLoginButtonStatus(isValidValue, isValidPassword);
  };

  const passwordValidationHandler = (
    event: ON_INPUT_EVENT | ON_CHANGE_EVENT
  ) => {
    const currentValue = event.currentTarget.value;
    setPassword(currentValue);

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
      setIsValidPassword(true);
    } else {
      toggleLoginButtonStatus(isValidEmail, false);
      setIsValidPassword(false);
    }
  };

  const toggleLoginButtonStatus = (
    emailValidation: boolean,
    passwordValidation: boolean
  ) => {
    if (emailValidation && passwordValidation && email && password) {
      setIsValidForm(true);
    } else {
      setIsValidForm(false);
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
        disabled={!isValidForm}
      >
        Login
      </button>
      <div>
        Don't have account? <Link to={ROUTES.SIGN_UP}>Register</Link>
      </div>
    </div>
  );
}
