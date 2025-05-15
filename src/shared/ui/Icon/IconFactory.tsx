import { WishlistIcon } from './WishlistIcon';
import { CartIcon } from './CartIcon';
import { ProfileIcon } from './ProfileIcon';

const iconsMap = {
  wishlist: WishlistIcon,
  cart: CartIcon,
  profile: ProfileIcon,
} as const;

export type IconName = keyof typeof iconsMap;

export interface IconFactoryProperties {
  name: IconName;
}

export function IconFactory({ name }: IconFactoryProperties) {
  const IconComponent = iconsMap[name];
  return <IconComponent />;
}
