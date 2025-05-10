import { Link, useNavigate } from 'react-router-dom';
import { RouterConstants } from '../../../types';

export function Login() {
  const navigate = useNavigate();

  return (
    <>
      <h1>Login</h1>
      <button onClick={() => navigate(RouterConstants.HOME)}>Login</button>
      <Link to={RouterConstants.SIGN_UP}>Register</Link>
    </>
  );
}
