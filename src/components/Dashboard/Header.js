import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
    const { user, logOut } = useAuth();

    const handleLogOut = async () => {
        await logOut();
        alert('Successfully logged out!');
    };

    return (
        <header>
            <div>
                <h1>Dashboard</h1>
            </div>
            <div>
                { user && <p>Welcome, { user.name }!</p> }
                <button onClick={ handleLogOut }>Log Out</button>

            </div>
        </header>
    );
};

export default Header;
