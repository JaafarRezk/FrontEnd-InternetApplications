import React from 'react';
import { Button, TextField, Grid } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useFiles } from '../../contexts/FileContext';

const ToolBar = () => {
  const location = useLocation();
  const { handleCheckInFiles, allFiles } = useFiles();


  
  
 

  return (
    <div style={{ padding: '50px', backgroundColor: '#f4f6f9', borderRadius: '8px' }}>
      <Grid container spacing={2} alignItems="center">
        {location.pathname === '/dashboard' ? (
          <>
            {/* Toolbar for Dashboard */}
            <Grid item>
              <Button 
                variant="contained" 
                color="primary" 
                sx={{ width: 150 }}
              >
                Upload Files
              </Button>
            </Grid>
            
            <Grid item>
              <Button 
                variant="outlined" 
                color="secondary" 
                sx={{ width: 150 }}
              >
                Create Group
              </Button>
            </Grid>
            
            <Grid item>
              <Button 
                variant="outlined" 
                color="secondary" 
                sx={{ width: 150 }}
              >
                Add Users
              </Button>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <TextField 
                variant="outlined" 
                fullWidth 
                label="Search..." 
                size="small"
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '5px', 
                  }
                }} 
              />
            </Grid>
          </>
        ) : location.pathname === '/file-management' ? (
          <>
          
          </>
        ) : null}
      </Grid>
    </div>
  );
};

export default ToolBar;
