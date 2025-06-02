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
    value,
    readonly,
    placeholder,
    rules,
    register,
    errors,
    autocomplete = 'email',
    disabled,
  } = properties;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const errorsObject = errors as Record<string, any>;
  const [first, second] = name.split('.');
  const errorMessage = name.includes('.')
    ? errorsObject?.[first]?.[second]?.message
    : errorsObject?.[name]?.message;

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
        id={id}
        value={value}
        readOnly={readonly}
        placeholder={placeholder}
        autoComplete={autocomplete}
        disabled={disabled}
      />

      {errorMessage && (
        <div className="validation-error">{errorMessage?.toString()}</div>
      )}
    </>
  );
}
