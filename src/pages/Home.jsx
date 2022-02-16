import { useNavigate, Link } from 'react-router-dom';
import { useLogout } from '@/hooks';

export function Home() {
  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <section>
      <h1>Home</h1>
      <br />
      <p>You are signed in!</p>
      <br />
      <Link to="/admin">Go to the Admin page</Link>
      <br />
      <div>
        <button type="button" onClick={signOut}>
          Sign Out
        </button>
      </div>
    </section>
  );
}
