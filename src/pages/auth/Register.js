import React, { useState } from 'react';
import styles from './auth.module.scss';
import Loader from '../../components/Loader/Loader';
import Card from '../../components/Card/Card';
import { TiUserAddOutline } from 'react-icons/ti';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import {
  validateEmail,
  registerUser,
} from '../../redux/feature/auth/authService';
import { useNavigate, Link } from 'react-router-dom';
import { SET_LOGIN, SET_NAME } from '../../redux/feature/auth/authSlice';

const initialState = {
  firstName: '',
  lastName: '',
  emailAddress: '',
  phoneNumber: '',
  password: '',
  password2: '',
  bio: '',
};
const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const {
    firstName,
    lastName,
    emailAddress,
    phoneNumber,
    password,
    password2,
    bio,
  } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const register = async (e) => {
    e.preventDefault();

    if (
      !firstName ||
      !lastName ||
      !emailAddress ||
      !phoneNumber ||
      !password ||
      !bio
    ) {
      return toast.error('All Fields are required');
    }
    if (password !== password2) {
      return toast.error('Confirm password Does Match');
    }
    if (!validateEmail(emailAddress)) {
      return toast.error('Please Provide a Valid Email Address');
    }
    setIsLoading(true);
    const userData = {
      firstName,
      lastName,
      emailAddress,
      phoneNumber,
      password,
      bio,
    };
    try {
      const data = await registerUser(userData);
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
            <TiUserAddOutline size={35} color='#999' />
          </div>
          <h2>Register</h2>
          <form onSubmit={register}>
            <input
              type='text'
              placeholder='First Name'
              required
              name='firstName'
              onChange={handleInputChange}
              value={firstName}
            />
            <input
              type='text'
              placeholder='Last Name'
              required
              name='lastName'
              value={lastName}
              onChange={handleInputChange}
            />
            <input
              type='text'
              placeholder='Email Address'
              required
              name='emailAddress'
              value={emailAddress}
              onChange={handleInputChange}
            />
            <input
              type='text'
              placeholder='Phone number'
              required
              name='phoneNumber'
              value={phoneNumber}
              onChange={handleInputChange}
            />
            <input
              type='text'
              placeholder='A Short Bio'
              required
              name='bio'
              value={bio}
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
            <input
              type='password'
              placeholder='Confirm Password'
              required
              name='password2'
              value={password2}
              onChange={handleInputChange}
            />
            <button type='submit' className='--btn --btn-primary --btn-block'>
              Register An Account
            </button>
          </form>
          <span className={styles.register}>
            <Link to='/'>Home</Link>
            <p> &nbsp; Already have an account? &nbsp;</p>
            <Link to='/login'>Login</Link>
          </span>
        </div>
      </Card>
    </div>
  );
};

export default Register;
