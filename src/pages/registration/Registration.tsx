import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../types';

export function Registration() {
  const navigate = useNavigate();

  return (
    <>
      <h1>Registration</h1>
      <button onClick={() => navigate(ROUTES.HOME)}>Create Account</button>
      <Link to={ROUTES.LOGIN}>Login</Link>
    </>
  );
}
