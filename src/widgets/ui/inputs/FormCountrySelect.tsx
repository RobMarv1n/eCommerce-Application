import { Country } from 'postal-code-validator';
import { FieldValues } from 'react-hook-form';
import { InputProperties } from '../../../types';

export function FormCountrySelect<T extends FieldValues>(
  properties: InputProperties<T>
) {
  const {
    className = 'form-input',
    name,
    label,
    id,
    value,
    rules,
    register,
    errors,
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
      <select
        {...register(name, rules)}
        className={className}
        id={id}
        value={value}
        disabled={disabled}
      >
        {Object.values(Country).map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>

      {errorMessage && (
        <div className="validation-error">{errorMessage?.toString()}</div>
      )}
    </>
  );
}
