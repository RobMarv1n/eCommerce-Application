import { useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { InputProperties } from '../../../types';

export function FormPasswordInput<T extends FieldValues>(
  properties: InputProperties<T>
) {
  const {
    className = 'form-input from-input-icon',
    name,
    label,
    id,
    placeholder,
    rules,
    register,
    errors,
    autocomplete = 'new-password',
  } = properties;
  const errorMessage = errors?.[name]?.message;
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <label className="form-label" htmlFor={id}>
        {label}
      </label>
      <input
        {...register(name, rules)}
        className={className}
        type={showPassword ? 'text' : 'password'}
        name={name}
        placeholder={placeholder}
        id={id}
        autoComplete={autocomplete}
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
      {errorMessage && (
        <div className="validation-error">{errorMessage.toString()}</div>
      )}
    </>
  );
}
