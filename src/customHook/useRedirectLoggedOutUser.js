import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SET_LOGIN } from '../redux/features/auth/authSlice';
import { getLoginStatus } from '../redux/feature/auth/authService';
import { toast } from 'react-toastify';

const useRedirectLoggedOutUser = (path) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const redirectLoggedOutUser = async () => {
      const isLoggedIn = await getLoginStatus();
      dispatch(SET_LOGIN(isLoggedIn));
      if (!isLoggedIn) {
        toast.info('Auth Token expired, please login to continue.');
        navigate(path);
        return;
      }
    };
    redirectLoggedOutUser();
  }, [navigate, path, dispatch]);
};

export default useRedirectLoggedOutUser;
