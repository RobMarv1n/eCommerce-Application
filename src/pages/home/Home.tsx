import { Link } from 'react-router-dom';
import { ROUTES } from '../../types';

export function Home() {
  return (
    <>
      <h1>Home</h1>
      <Link to={ROUTES.LOGIN}>Sign in</Link>
      <Link to={ROUTES.SIGN_UP}>Sign up</Link>
    </>
  );
}
