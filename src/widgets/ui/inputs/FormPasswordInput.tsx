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
      <button
        className="password-eye-icon"
        type="button"
        aria-label="Show password"
        onClick={(event) => {
          event.preventDefault();
          setShowPassword(!showPassword);
        }}
      >
        <IoMdEye
          className="eye-icon"
          style={{ display: showPassword ? 'none' : 'block' }}
        />
        <IoMdEyeOff
          style={{ display: showPassword ? 'block' : 'none' }}
          className="eye-off-icon"
        />
      </button>
      {errorMessage && (
        <div className="validation-error">{errorMessage.toString()}</div>
      )}
    </>
  );
}
