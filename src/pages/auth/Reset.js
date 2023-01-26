import React, { useState } from 'react';
import { toast } from 'react-toastify';
import styles from './auth.module.scss';
import { resetPassword } from '../../redux/feature/auth/authService';
import Card from '../../components/Card/Card';
import { Link, useParams } from 'react-router-dom';
import { MdPassword } from 'react-icons/md';

const initialState = {
  password: '',
  password2: '',
};

const Reset = () => {
  const [formData, setFormData] = useState(initialState);
  const { password, password2 } = formData;
  const { resetToken } = useParams();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const resetUserPassword = async (e) => {
    e.preventDefault();

    if (password < 4) {
      return toast.error('Password must be more than four letter long');
    }
    if (password !== password2) {
      return toast.error('Confirm Password did not match');
    }
    const resetData = {
      password,
      password2,
    };
    try {
      const res = await resetPassword(resetData, resetToken);
      toast.success(res.message);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <div className='--flex-center'>
            <MdPassword size={35} color='#999' />
          </div>
          <h2>Reset Password</h2>

          <form onSubmit={resetUserPassword}>
            <input
              type='password'
              placeholder='New Password'
              required
              name='password'
              value={password}
              onChange={handleInputChange}
            />
            <input
              type='password'
              placeholder='Confirm New Password'
              required
              name='password2'
              value={password2}
              onChange={handleInputChange}
            />

            <button type='submit' className='--btn --btn-primary --btn-block'>
              Reset Password
            </button>
            <div className={styles.links}>
              <p>
                <Link to='/'>- Home</Link>
              </p>
              <p>
                <Link to='/login'>- Login</Link>
              </p>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default Reset;
