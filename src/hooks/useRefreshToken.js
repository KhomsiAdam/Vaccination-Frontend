import { axiosPrivate } from '@/api/axios';
import { useAuth } from './useAuth';

export const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axiosPrivate.post('/refresh');
    setAuth((prev) => {
      console.log(prev);
      console.log(response.data);
      return {
        ...prev,
        roles: response.data.role,
        accessToken: response.data.token,
      };
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
