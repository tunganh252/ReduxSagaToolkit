import { Box, Button, CircularProgress, makeStyles, Paper, Typography } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { authActions } from '../authSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  },
  paper: {
    padding: theme.spacing(3),
  },
}));

const LoginPage = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loginSuccess = useAppSelector((state) => state.auth.isLoggedIn);
  const isLogging = useAppSelector((state) => state.auth.logging);

  const handleLoginPage = () => {
    dispatch(authActions.login({ username: 'aaa', password: 'sdfsf' }));
  };

  useEffect(() => {
    if (!!loginSuccess) navigate('/admin/dashboard');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginSuccess]);

  return (
    <div className={classes.root}>
      <Paper elevation={1} className={classes.paper}>
        <Typography variant="h5" component="h1">
          Student Management
        </Typography>
        <Box mt={4}>
          <Button variant="contained" fullWidth color="primary" onClick={handleLoginPage}>
            {isLogging && <CircularProgress size={20} color="secondary" />} Fake Login
          </Button>
        </Box>
      </Paper>
    </div>
  );
};
export default LoginPage;
