import React, { useState } from 'react';
import styles from './auth.module.scss';
import { AiOutlineMail } from 'react-icons/ai';
import Card from '../../components/Card/Card';
import { Link } from 'react-router-dom';
import {
  forgetPassword,
  validateEmail,
} from '../../redux/feature/auth/authService';
import { toast } from 'react-toastify';

const Forget = () => {
  const [emailAddress, setEmailAddress] = useState('');

  const handleForgetPassword = async (e) => {
    e.preventDefault();
    if (!emailAddress) {
      return toast.error('Please enter an email address');
    }
    if (!validateEmail(emailAddress)) {
      return toast.error('Please enter a valid email address');
    }
    // run the request
    const forgetData = {
      emailAddress,
    };
    await forgetPassword(forgetData);
    setEmailAddress('');
  };

  return (
    <div className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <div className='--flex-center'>
            <AiOutlineMail size={35} color='#999' />
          </div>
          <h2>Forgot Password</h2>

          <form onSubmit={handleForgetPassword}>
            <input
              type='email'
              placeholder='Email'
              required
              name='email'
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
            />

            <button type='submit' className='--btn --btn-primary --btn-block'>
              Get Reset Email
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

export default Forget;
