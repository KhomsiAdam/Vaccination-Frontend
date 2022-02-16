import { Link } from 'react-router-dom';
import { Users } from '@/data';

export function Admin() {
  return (
    <section>
      <h1>Admins Page</h1>
      <br />
      <p>You must have an Admin role.</p>
      <br />
      <Users />
      <br />
      <div>
        <Link to="/">Home</Link>
      </div>
    </section>
  );
}
