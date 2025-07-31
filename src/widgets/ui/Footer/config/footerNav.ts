import { ROUTES } from '../../../../types';

export const footerNav = [
  {
    title: 'My Account',
    id: 'my-account',
    items: [
      { label: 'My Account', path: ROUTES.PROFILE },
      { label: 'Order History' },
      { label: 'Shopping Cart', path: ROUTES.CART },
      { label: 'Wishlist', path: ROUTES.WISHLIST },
    ],
  },
  {
    title: 'Helps',
    id: 'helps',
    items: [
      { label: 'Contact' },
      { label: 'Faqs' },
      { label: 'Terms & Condition' },
      { label: 'Privacy Policy' },
    ],
  },
  {
    title: 'Proxy',
    id: 'proxy',
    items: [
      { label: 'About', path: ROUTES.ABOUT },
      { label: 'Catalog', path: ROUTES.CATALOG },
      { label: 'Product' },
      { label: 'Track Order' },
    ],
  },
];
