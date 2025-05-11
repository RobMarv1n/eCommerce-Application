import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../types';

export function Signup() {
  const navigate = useNavigate();

  return (
    <>
      <h1>Sign up</h1>
      <button onClick={() => navigate(ROUTES.HOME)}>Create Account</button>
      <Link to={ROUTES.LOGIN}>Sign in</Link>
    </>
  );
}
