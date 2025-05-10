import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../types';

export function Login() {
  const navigate = useNavigate();

  return (
    <>
      <h1>Login</h1>
      <button onClick={() => navigate(ROUTES.HOME)}>Login</button>
      <Link to={ROUTES.SIGN_UP}>Register</Link>
    </>
  );
}
