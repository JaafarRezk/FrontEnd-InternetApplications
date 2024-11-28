import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Card, CardContent, CardActions, Button, Box } from '@mui/material';
import Register from '../../components/Auth/Register';

const RegisterPage = () => {
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
            Register
          </Typography>
          <Register />
        </CardContent>
        <CardActions sx={{ justifyContent: 'center', marginTop: 2 }}>
          <Typography variant="body2">
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#1976d2', textDecoration: 'none', fontWeight: 'bold' }}>
              Log in here
            </Link>
          </Typography>
        </CardActions>
      </Card>
    </Box>
  );
};

export default RegisterPage;
