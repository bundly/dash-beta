import React from 'react';
import { Container, makeStyles } from '@material-ui/core';
import 'react-mde/lib/styles/css/react-mde-all.css';

import Page from 'src/components/Page';
import StandUpNotesGen from './standUpNotes';

export { default as StandUpNotesGen } from './standUpNotes';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const StandUpNotes = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Products">
      <Container maxWidth={false}>
        <StandUpNotesGen />
      </Container>
    </Page>
  );
};

export default StandUpNotes;
