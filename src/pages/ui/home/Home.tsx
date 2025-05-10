import { Link } from 'react-router-dom';
import { RouterConstants } from '../../../types';

export function Home() {
  return (
    <>
      <h1>Home</h1>
      <Link to={RouterConstants.SIGN_IN}>Sign in</Link>
      <Link to={RouterConstants.SIGN_UP}>Sign up</Link>
    </>
  );
}
