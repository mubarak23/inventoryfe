import { useState } from 'react';
import styles from './auth.module.scss';
import { BiLogIn } from 'react-icons/bi';
import Card from '../../components/Card/Card';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { loginUser, validateEmail } from '../../redux/feature/auth/authService';
import { SET_LOGIN, SET_NAME } from '../../redux/feature/auth/authSlice';
import Loader from '../../components/Loader/Loader';

const initialState = {
  emailAddress: '',
  password: '',
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const { emailAddress, password } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const login = async (e) => {
    e.preventDefault();
    if (!emailAddress || !password) {
      return toast.error('All Fields are required');
    }

    const userLogin = {
      emailAddress,
      password,
    };

    setIsLoading(true);
    try {
      const data = await loginUser(userLogin);
      dispatch(SET_LOGIN(true));
      dispatch(SET_NAME(data.firstName));
      navigate('/dashboard');
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <div className={`container ${styles.auth}`}>
      {isLoading && <Loader />}
      <Card>
        <div className={styles.form}>
          <div className='--flex-center'>
            <BiLogIn size={35} color='#999' />
          </div>
          <h2>Login</h2>
          <form onSubmit={login}>
            <input
              type='email'
              placeholder='Email Address'
              required
              name='emailAddress'
              value={emailAddress}
              onChange={handleInputChange}
            />
            <input
              type='password'
              placeholder='Password'
              required
              name='password'
              value={password}
              onChange={handleInputChange}
            />
            <button type='submit' className='--btn --btn-primary --btn-block'>
              Login
            </button>
          </form>
          <Link to='/forgot'>Forgot Password</Link>

          <span className={styles.register}>
            <Link to='/'>Home</Link>
            <p> &nbsp; Don't have an account? &nbsp;</p>
            <Link to='/register'>Register</Link>
          </span>
        </div>
      </Card>
    </div>
  );
};

export default Login;
