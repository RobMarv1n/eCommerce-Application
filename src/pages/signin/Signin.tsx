import { Link, useNavigate } from 'react-router-dom';

export function Signin() {
  const navigate = useNavigate();

  return (
    <>
      <h1>Sign in</h1>
      <button onClick={() => navigate('/home')}>Login</button>
      <Link to="/signup">Register</Link>
    </>
  );
}
