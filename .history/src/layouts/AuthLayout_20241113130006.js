import React from 'react';
import styles from '.styles/';

const AuthLayout = ({ children }) => {
    return (
        <div className={styles.authContainer}>
            {children}
        </div>
    );
};

export default AuthLayout;
