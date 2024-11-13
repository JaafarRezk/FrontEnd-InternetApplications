import React from 'react';
import styles from '../';

const AuthLayout = ({ children }) => {
    return (
        <div className={styles.authContainer}>
            {children}
        </div>
    );
};

export default AuthLayout;
