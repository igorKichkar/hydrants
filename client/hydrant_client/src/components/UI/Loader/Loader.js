import React from 'react';
import styles from './loader.module.css';

const Loader = () => {
    return (
        <div className={styles.loader} style={{marginTop: "150px"}}>Loading...</div>
    );
};

export default Loader;