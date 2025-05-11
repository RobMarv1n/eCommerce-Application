import { InputProperties } from '../../types';

export function EmailInput(inputProperties: InputProperties) {
  const { value, isValid, onChange, onInput } = inputProperties;
  return (
    <>
      <input
        type="email"
        className="email-input"
        placeholder="Email"
        id="email-input"
        value={value}
        onChange={onChange}
        onInput={onInput}
        required
      />
      {!isValid && (
        <div className="validation-error">
          Expected format: user@example.com
        </div>
      )}
    </>
  );
}
