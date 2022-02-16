import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div>
      <h1>Oops!</h1>
      <p>Page Not Found</p>
      <div>
        <Link to="/">Visit Our Homepage</Link>
      </div>
    </div>
  );
}
