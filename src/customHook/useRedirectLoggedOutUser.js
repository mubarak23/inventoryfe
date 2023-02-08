import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SET_LOGIN, selectIsLoggedIn } from '../redux/feature/auth/authSlice';
import { getLoginStatus } from '../redux/feature/auth/authService';
import { toast } from 'react-toastify';

const useRedirectLoggedOutUser = (path) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  useEffect(() => {
    const redirectLoggedOutUser = async () => {
      // const isLoggedIn = await getLoginStatus();
      // dispatch(SET_LOGIN(isLoggedIn));
      const token = localStorage.getItem('token');
      if (!token) {
        toast.info('Auth Token expired, please login to continue.');
        navigate(path);
        return;
      }
    };
    redirectLoggedOutUser();
  }, [navigate, path, dispatch, isLoggedIn]);
};

export default useRedirectLoggedOutUser;
