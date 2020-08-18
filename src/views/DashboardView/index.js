import React from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import LatestOrders from './LatestOrders';
import { StandUpNotesGen } from '../github/StandUpNotesView';
import ToDo from './ToDo';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Dashboard">
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item lg={12} md={12} xl={12} xs={12}>
            <LatestOrders />
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <StandUpNotesGen />
          </Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}>
            <ToDo />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Dashboard;
