import React from 'react';
import { Box, makeStyles, Paper, Typography } from '@material-ui/core';

interface StatisticItemProps {
  icon: React.ReactElement;
  label: string;
  value: string | number;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(2),
    border: `1px solid ${theme.palette.divider}`,
  },
}));

const StatisticItem = ({ icon, value, label }: StatisticItemProps) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Box>{icon}</Box>
      <Box>
        <Typography variant="h5" align="right">
          {value}
        </Typography>
        <Typography variant="caption">{label}</Typography>
      </Box>
    </Paper>
  );
};

export default StatisticItem;
