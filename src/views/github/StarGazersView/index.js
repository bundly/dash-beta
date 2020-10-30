import React from 'react';
import { Container, makeStyles } from '@material-ui/core';
// import 'react-mde/lib/styles/css/react-mde-all.css';

import Page from 'src/components/Page';
import StarGazersGen from './starGazers';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const StarGazers = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Star Gazers">
      <Container maxWidth={false}>
        <StarGazersGen />
      </Container>
    </Page>
  );
};

export default StarGazers;
