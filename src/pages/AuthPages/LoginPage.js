import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Card, CardContent, CardActions, Button, Box } from '@mui/material';
import LogIn from '../../components/Auth/LogIn';

const LogInPage = () => {
  return (
    <Box 
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f4f6f9',
      }}
    >
      <Card sx={{ width: 400, padding: '20px' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom align="center">
            Log In
          </Typography>
          <LogIn />
        </CardContent>
        <CardActions sx={{ justifyContent: 'center', marginTop: 2 }}>
          <Typography variant="body2">
            Don't have an account?{' '}
            <Link to="/register" style={{ color: '#1976d2', textDecoration: 'none', fontWeight: 'bold' }}>
              Register here
            </Link>
          </Typography>
        </CardActions>
      </Card>
    </Box>
  );
};

export default LogInPage;
