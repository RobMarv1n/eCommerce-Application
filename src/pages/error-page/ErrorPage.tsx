import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../types';

export function ErrorPage() {
  const navigate = useNavigate();

  return (
    <>
      <h1>Error 404</h1>
      <button onClick={() => navigate(ROUTES.HOME)}>Back to Home</button>
    </>
  );
}
