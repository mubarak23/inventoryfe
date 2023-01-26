import React from 'react';
import { logoutUser } from '../../redux/feature/auth/authService';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { SET_LOGIN, selectName } from '../../redux/feature/auth/authSlice';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const name = useSelector(selectName);
  console.log(name);
  const logout = async () => {
    await logoutUser();
    await dispatch(SET_LOGIN(false));
    navigate('/login');
  };
  return (
    <div className='--pad header'>
      <div className='--flex-between'>
        <h3>
          <span className='--fw-thin'>Welcome, </span>
          <span className='--color-danger'>{name}</span>
        </h3>
        <button className='--btn --btn-danger' onClick={logout}>
          Logout
        </button>
      </div>
      <hr />
    </div>
  );
};

export default Header;
