import { InputProperties } from '../../types';

export function PasswordInput(inputProperties: InputProperties) {
  return (
    <>
      <input
        type="password"
        className="password-input"
        placeholder="Password"
        id="password-input"
        value={inputProperties.value}
        onChange={inputProperties.onChange}
        onInput={inputProperties.onInput}
      />
      {!inputProperties.isValid && (
        <div className="validation-error">
          The password must be longer than 5 characters and less than 25
          characters and contain at least one uppercase Latin letter, one
          lowercase letter, one digit and one special character.
        </div>
      )}
    </>
  );
}
