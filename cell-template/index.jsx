import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  Container: {
    background: 'red',
  }
})

const CellTemplate = ({ id, classNames, children }) => {
  const classes = useStyles();

  return (
    <div id={id} classNames={classes.Contaner}>
      {children}
    </div>
  );
};

export default CellTemplate;
