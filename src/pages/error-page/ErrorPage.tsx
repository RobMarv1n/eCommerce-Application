import { useNavigate } from 'react-router-dom';

export function ErrorPage() {
  const navigate = useNavigate();

  return (
    <>
      <h1>Error 404</h1>
      <button onClick={() => navigate(-1)}>Back to Home</button>
    </>
  );
}
