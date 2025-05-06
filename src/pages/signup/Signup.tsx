import { Link, useNavigate } from 'react-router-dom';

export function Signup() {
  const navigate = useNavigate();

  return (
    <>
      <h1>Sign up</h1>
      <button onClick={() => navigate('/home')}>Create Account</button>
      <Link to="/signin">Sign in</Link>
    </>
  );
}
