import React, { useState } from 'react';
import clsx from 'clsx';
import { v4 as uuid } from 'uuid';
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

const data = {
  lanes: [
    {
      id: uuid(),
      title: 'Planned Tasks',
      label: '2/2',
      cards: [
        {
          id: uuid(),
          title: 'Write Blog',
          description: 'Can AI make memes',
          label: '30 mins'
        },
        {
          id: uuid(),
          title: 'Pay Rent',
          description: 'Transfer via NEFT',
          label: '5 mins',
          metadata: { sha: 'be312a1' }
        }
      ]
    },
    {
      id: uuid(),
      title: 'Completed',
      label: '0/0',
      cards: []
    }
  ]
};

const useStyles = makeStyles(() => ({
  root: {},
  actions: {
    justifyContent: 'flex-end'
  }
}));

const MyTasks = ({ className, ...rest }) => {
  const classes = useStyles();
  const [tasks] = useState(data);

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
          style={{
            backgroundColor: '#ebecf0',
            height: '440px'
          }}
          laneStyle={{
            backgroundColor: colors.common.white
          }}
          cardStyle={{
            backgroundColor: '#ebecf0',
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
