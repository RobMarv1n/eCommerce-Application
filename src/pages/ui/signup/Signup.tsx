import { Link, useNavigate } from 'react-router-dom';
import { RouterConstants } from '../../../types';

export function Signup() {
  const navigate = useNavigate();

  return (
    <>
      <h1>Sign up</h1>
      <button onClick={() => navigate(RouterConstants.HOME)}>
        Create Account
      </button>
      <Link to={RouterConstants.SIGN_IN}>Sign in</Link>
    </>
  );
}
