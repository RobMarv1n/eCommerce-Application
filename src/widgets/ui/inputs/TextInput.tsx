import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from 'react-hook-form';
import { RegistrationFormData } from '../../../pages/registration/model/types';

type textInputProperties<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  id: string;
  placeholder?: string;
  field?: ControllerRenderProps<RegistrationFormData>;
  fieldState?: ControllerFieldState;
  rules?: object;
  register: UseFormRegister<T>;
  errors?: FieldErrors<T>;
};

export function TextInput<T extends FieldValues>(
  properties: textInputProperties<T>
) {
  const { name, label, id, placeholder, rules, register, errors } = properties;
  const errorMessage = errors?.[name]?.message;

  return (
    <>
      <label className="form-label" htmlFor={id}>
        {label}
      </label>
      <input
        {...register(name, rules)}
        type="text"
        name={name}
        className="form-input"
        placeholder={placeholder}
        id={id}
      />
      {errorMessage && (
        <div className="validation-error">{errorMessage.toString()}</div>
      )}
    </>
  );
}
