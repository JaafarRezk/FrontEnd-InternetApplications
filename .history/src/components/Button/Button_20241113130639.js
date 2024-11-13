import React from 'react';
import styles from'../../styles/Input.module.css';

const Button = ({ onClick, children, type = 'button' }) => {
    return (
        <button onClick={onClick} type={type} className={styles.button}>
            {children}
        </button>
    );
};

export default Button;
