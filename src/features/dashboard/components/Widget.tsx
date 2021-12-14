import { Box, Paper, Typography, makeStyles } from '@material-ui/core';
import React from 'react';

interface WidgetProps {
  title: string;
  children: React.ReactElement;
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    border: `1px solid ${theme.palette.divider}`,
  },
}));

const Widget = ({ title, children }: WidgetProps) => {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Typography variant="button">{title}</Typography>
      <Box mt={2}>{children}</Box>
    </Paper>
  );
};

export default Widget;
