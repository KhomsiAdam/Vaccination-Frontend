import { useNavigate } from 'react-router-dom';

export function Unauthorized() {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <section>
      <h1>Unauthorized</h1>
      <br />
      <p>You do not have access to the requested page.</p>
      <div>
        <button type="button" onClick={goBack}>
          Go Back
        </button>
      </div>
    </section>
  );
}
