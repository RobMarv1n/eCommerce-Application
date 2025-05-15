import { useState } from 'react';
import { ON_CHANGE_EVENT, ON_INPUT_EVENT } from '../../types.ts';
import { emailValidation } from './emailValidation';
import { validationPassword } from './passwordValidation';

export function useFormValidation() {
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

    const isValid = emailValidation(currentValue);

    setIsValidForm({ ...isValidForm, isValidEmail: isValid });
    isLoginButtonDisabled(isValid, isValidPassword);
  };

  const passwordValidationHandler = (
    event: ON_INPUT_EVENT | ON_CHANGE_EVENT
  ) => {
    const currentValue = event.currentTarget.value;
    setFormState({ ...formState, password: currentValue });
    const isValid = validationPassword(currentValue);

    if (isValid) {
      isLoginButtonDisabled(isValidEmail, true);
      setIsValidForm({ ...isValidForm, isValidPassword: true });
    } else {
      isLoginButtonDisabled(isValidEmail, false);
      setIsValidForm({ ...isValidForm, isValidPassword: false });
    }
  };

  const isLoginButtonDisabled = (
    emailValidation: boolean,
    passwordValidation: boolean
  ) => {
    if (emailValidation && passwordValidation && email && password) {
      setLoginButtonState(true);
    } else {
      setLoginButtonState(false);
    }
  };

  return {
    formState,
    isValidForm,
    loginButtonState,
    emailValidationHandler,
    passwordValidationHandler,
  };
}
