import { Link } from 'react-router-dom';

export function User() {
  return (
    <section>
      <h1>Users Page</h1>
      <br />
      <p>You must have a User role.</p>
      <div>
        <Link to="/">Home</Link>
      </div>
    </section>
  );
}
