import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from 'react-hook-form';
import { LoginFormData } from './pages/login/model/types';

export enum ROUTES {
  HOME = '/',
  LOGIN = '/login',
  REGISTRATION = '/registration',
  CATALOG = '/catalog',
  ABOUT = '/about',
  WISHLIST = '/wishlist',
  CART = '/cart',
  PROFILE = '/profile',
  PRODUCT = '/catalog/:id',
}

export type InputProperties<T extends FieldValues> = {
  type?: string;
  className?: string;
  name: Path<T>;
  label: string;
  id: string;
  readonly?: boolean;
  value?: string;
  placeholder?: string;
  field?: ControllerRenderProps<LoginFormData>;
  fieldState?: ControllerFieldState;
  rules?: object;
  register: UseFormRegister<T>;
  errors?: FieldErrors<T>;
  autocomplete?: string;
  disabled?: boolean;
};
