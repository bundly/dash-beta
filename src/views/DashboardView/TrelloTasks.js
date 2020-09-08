import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Board from 'react-trello';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  makeStyles,
  colors
} from '@material-ui/core';

import { loadTrelloState, saveTrelloState } from '../../utils/localStorage';

const useStyles = makeStyles(() => ({
  root: {},
  actions: {
    justifyContent: 'flex-end'
  }
}));

const MyTasks = ({ className, ...rest }) => {
  const classes = useStyles();
  const [tasks, updateTasks] = useState(loadTrelloState);

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader title="My Tasks" />
      <Divider />
      <CardContent>
        <Board
          data={tasks}
          editable
          canAddLanes
          cardDraggable
          editLaneTitle
          onDataChange={updatedData => {
            updateTasks(updatedData);
            saveTrelloState(updatedData);
          }}
          style={{
            backgroundColor: '#ebecf0',
            height: '500px'
          }}
          laneStyle={{
            backgroundColor: colors.common.white,
            maxHeight: '480px'
          }}
          cardStyle={{
            backgroundColor: colors.blueGrey[50],
            primaryColor: 'white !important' // TODO: my sad attempt to make text white
          }}
        />
      </CardContent>
    </Card>
  );
};

MyTasks.propTypes = {
  className: PropTypes.string
};

export default MyTasks;
