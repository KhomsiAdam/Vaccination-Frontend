import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useRefreshToken, useAuth } from '@/hooks';

export function PersistLogin() {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth, persist } = useAuth();

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

    return () => (isMounted = false);
  }, [auth.accessToken, refresh]);

  useEffect(() => {
    console.log(`isLoading: ${isLoading}`);
    console.log(`AccessToken: ${auth?.accessToken}`);
  }, [isLoading, auth?.accessToken]);

  return (
    <>{!persist ? <Outlet /> : isLoading ? <p>Loading...</p> : <Outlet />}</>
  );
}
