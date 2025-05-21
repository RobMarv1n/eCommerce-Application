import { useState } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { RegistrationFormData } from '../../../pages/registration/model/types';

export function RegistrationPasswordInput(
  properties: UseControllerProps<RegistrationFormData>
) {
  const { field, fieldState } = useController(properties);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <label className="form-label" htmlFor="password-input">
        Password
      </label>
      <input
        {...field}
        type={showPassword ? 'text' : 'password'}
        className="form-input form-input-icon"
        placeholder="Password"
        value={field.value.toString()}
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
      {fieldState.error && (
        <div className="validation-error">{fieldState.error.message}</div>
      )}
    </>
  );
}
