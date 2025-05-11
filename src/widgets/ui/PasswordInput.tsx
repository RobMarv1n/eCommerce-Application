import { InputProperties } from '../../types';

export function PasswordInput(inputProperties: InputProperties) {
  const { value, isValid, onChange, onInput } = inputProperties;
  return (
    <>
      <input
        type="password"
        className="password-input"
        placeholder="Password"
        id="password-input"
        value={value}
        onChange={onChange}
        onInput={onInput}
        required
      />
      {!isValid && (
        <div className="validation-error">
          The password must be longer than 5 characters and less than 25
          characters and contain at least one uppercase Latin letter, one
          lowercase letter, one digit and one special character.
        </div>
      )}
    </>
  );
}
