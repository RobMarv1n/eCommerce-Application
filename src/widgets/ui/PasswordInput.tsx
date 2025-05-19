import { useState } from 'react';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { InputProperties } from '../../types';

export function PasswordInput(inputProperties: InputProperties) {
  const { value, isValid, onChange, onInput } = inputProperties;
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <input
        type={showPassword ? 'text' : 'password'}
        className="form-input form-input-icon"
        placeholder="Password"
        id="password-input"
        value={value}
        onChange={onChange}
        onInput={onInput}
        required
      />
      <IoMdEye
        className="password-eye-icon eye-icon"
        onClick={() => setShowPassword(true)}
        style={{ display: showPassword ? 'none' : 'block' }}
      />
      <IoMdEyeOff
        style={{ display: showPassword ? 'block' : 'none' }}
        className="password-eye-icon eye-off-icon"
        onClick={() => setShowPassword(false)}
      />
      {!isValid && (
        <div className="validation-error">
          The password must be longer than 8 characters and less than 25
          characters and contain at least one uppercase Latin letter, one
          lowercase letter, one digit and one special character. Spaces are not
          allowed at the beginning and end of the line.
        </div>
      )}
    </>
  );
}
