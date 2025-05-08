import { useNavigate } from 'react-router-dom';
import { RouterConstants } from '../../types';

export function ErrorPage() {
  const navigate = useNavigate();

  return (
    <>
      <h1>Error 404</h1>
      <button onClick={() => navigate(RouterConstants.HOME)}>
        Back to Home
      </button>
    </>
  );
}
