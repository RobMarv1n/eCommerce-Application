import { InputProperties } from '../../types';

export function EmailInput(inputProperties: InputProperties) {
  return (
    <>
      <input
        type="email"
        className="email-input"
        placeholder="Email"
        id="email-input"
        value={inputProperties.value}
        onChange={inputProperties.onChange}
        onInput={inputProperties.onInput}
        required
      />
      {!inputProperties.isValid && (
        <div className="validation-error">
          Expected format: user@example.com
        </div>
      )}
    </>
  );
}
