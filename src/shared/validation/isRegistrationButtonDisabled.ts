import { RegistrationFieldState } from '../../pages/registration/model/types';

export function isRegistrationButtonDisabled(
  emailFieldState: RegistrationFieldState,
  passwordFieldState: RegistrationFieldState
): boolean {
  return !emailFieldState.invalid &&
    !passwordFieldState.invalid &&
    emailFieldState.isDirty &&
    passwordFieldState.isDirty
    ? false
    : true;
}
