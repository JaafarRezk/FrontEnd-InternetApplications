import React from 'react';
import { useLocation } from 'react-router-dom';
import MyFiles from '../../components/Files/MyFiles';
import { Container, Typography, Box, Paper } from '@mui/material';

const Content = () => {
    const location = useLocation();

    return (
        <Container sx={ { paddingTop: '20px' } }>
            <Box sx={ { marginBottom: '20px' } }>
                { location.pathname === '/dashboard' && (
                    <Paper sx={ { padding: '20px', backgroundColor: '#f5f5f5' } }>
                        <Typography variant="h4" component="h2" sx={ { marginBottom: '15px', color: '#333' } }>
                            Welcome to the Dashboard
                        </Typography>
                        
                        <Typography variant="body1" sx={ { color: '#666' } }>
                            Here you can manage your dashboard content, view statistics, and more! Explore all your options
                            from the sidebar and get the latest updates.
                        </Typography>
                    </Paper>
                ) }

                { location.pathname === '/file-management' && (
                    <Paper sx={ { padding: '20px', backgroundColor: '#f5f5f5' } }>
                        <Typography variant="h4" component="h2" sx={ { marginBottom: '15px', color: '#333' } }>
                            File Management
                        </Typography>
                        <MyFiles /> 
                    </Paper>
                ) }
            </Box>
        </Container>
    );
};

export default Content;

