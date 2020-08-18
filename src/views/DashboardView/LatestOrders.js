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
  makeStyles
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
          label: '30 mins',
          draggable: false
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
  },
  reactTrelloBoard: {
    border: 0,
    backgroundColor: 'white'
  }
}));

const LatestOrders = ({ className, ...rest }) => {
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
          draggable
          style={{ backgroundColor: 'light-orange', height: '440px' }}
        />
      </CardContent>
    </Card>
  );
};

LatestOrders.propTypes = {
  className: PropTypes.string
};

export default LatestOrders;
