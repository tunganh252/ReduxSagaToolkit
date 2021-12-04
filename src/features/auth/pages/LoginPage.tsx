import { Box, Button, makeStyles, Paper, Typography } from '@material-ui/core';
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

  const handleLoginPage = () => {
    dispatch(authActions.login({ username: 'aaa', password: 'sdfsf' }));
  };

  const handleLogoutPage = () => {
    dispatch(authActions.logout());
  };

  useEffect(() => {
    console.log(111, loginSuccess);
    if (!!loginSuccess) navigate('/admin');

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginSuccess]);

  return (
    <>
      <Button variant="contained" fullWidth color="primary" onClick={handleLogoutPage}>
        Logout
      </Button>
      <div className={classes.root}>
        <Paper elevation={1} className={classes.paper}>
          <Typography variant="h5" component="h1">
            Student Management
          </Typography>
          <Box mt={4}>
            <Button variant="contained" fullWidth color="primary" onClick={handleLoginPage}>
              Fake Login
            </Button>
          </Box>
        </Paper>
      </div>
    </>
  );
};
export default LoginPage;
