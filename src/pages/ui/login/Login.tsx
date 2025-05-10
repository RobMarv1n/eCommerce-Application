import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../types';
import './login.css';

export function Login() {
  const navigate = useNavigate();

  return (
    <div className="login-page-container">
      <h1>Login</h1>
      <form className="login-form">
        <label htmlFor="login-input">Email</label>
        <input
          type="text"
          className="login-input"
          placeholder="Email"
          id="login-input"
        />

        <label htmlFor="password-input">Password</label>
        <input
          type="password"
          className="password-input"
          placeholder="Password"
          id="password-input"
        />
      </form>
      <button onClick={() => navigate(ROUTES.HOME)}>Login</button>
      <div>
        Don't have account?<Link to={ROUTES.SIGN_UP}>Register</Link>
      </div>
    </div>
  );
}
