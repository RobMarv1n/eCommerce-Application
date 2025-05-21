import { FieldValues } from 'react-hook-form';
import { InputProperties } from '../../../types';

export function FormInput<T extends FieldValues>(
  properties: InputProperties<T>
) {
  const {
    className = 'form-input',
    type = 'text',
    name,
    label,
    id,
    placeholder,
    rules,
    register,
    errors,
    autocomplete = 'email',
  } = properties;
  const errorMessage = errors?.[name]?.message;

  return (
    <>
      <label className="form-label" htmlFor={id}>
        {label}
      </label>
      <input
        {...register(name, rules)}
        className={className}
        type={type}
        name={name}
        placeholder={placeholder}
        id={id}
        autoComplete={autocomplete}
      />
      {errorMessage && (
        <div className="validation-error">{errorMessage.toString()}</div>
      )}
    </>
  );
}
