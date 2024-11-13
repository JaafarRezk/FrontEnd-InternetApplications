import React from 'react';
import styles from '.styles/Auth';

const AuthLayout = ({ children }) => {
    return (
        <div className={styles.authContainer}>
            {children}
        </div>
    );
};

export default AuthLayout;
