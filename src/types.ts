export enum ROUTES {
  HOME = '/',
  LOGIN = '/login',
  REGISTRATION = '/registration',
  CATALOG = '/catalog',
  ABOUT = '/about',
  WISHLIST = '/wishlist',
  CART = '/cart',
  PROFILE = '/profile',
}

export type ON_INPUT_EVENT = React.FormEvent<HTMLInputElement>;
export type ON_CHANGE_EVENT = React.ChangeEvent<HTMLInputElement>;

export type InputProperties = {
  value?: string;
  isValid?: boolean;
  onInput?: (event: ON_INPUT_EVENT) => void;
  onChange?: (event: ON_CHANGE_EVENT) => void;
};
