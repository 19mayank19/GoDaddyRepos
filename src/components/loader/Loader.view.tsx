import React from 'react';
import styles from './Loader.module.scss';

const Loader: React.FC = () => {
    
  return (
    <div className={styles.loaderContainer}>
        <div className={styles.loader} />
        <h3>Please wait, your app is loading...</h3>
    </div>
  )
};

export default Loader;