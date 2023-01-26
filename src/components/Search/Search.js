import React from 'react';
import { BiSearch } from 'react-icons';
import styles from './Search.module.scss';

const Search = ({ value, onChange }) => {
  return (
    <div className={styles.Search}>
      <BiSearch size={18} className={styles.icon} />
      <input
        type='text'
        placeholder='Search products'
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Search;
