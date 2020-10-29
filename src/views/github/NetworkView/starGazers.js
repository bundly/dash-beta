import React, { useState, useEffect } from 'react';
import {
  Box,
  Divider,
  Card,
  CardContent,
  CardHeader,
  Button,
  TextField,
  makeStyles
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

import Graph from '../../../components/Graph';
import defaultData from './default';
import { getStarGazers } from '../../../scripts/githubAPI';

const useStyles = makeStyles(theme => ({
  input: {
    margin: theme.spacing(1),
    width: '25vw'
  },
  button: {
    margin: theme.spacing(1)
  }
}));

const StarGazers = () => {
  const classes = useStyles();

  const [project, setProject] = useState(defaultData);
  const [values, setValues] = useState([
    {
      data: {
        id: 'base-id',
        generation: 0,
        style: { 'background-color': '#FFFFF' }
      }
    }
  ]);

  useEffect(() => {
    getStarGazers({
      name: project.name,
      owner: project.owner,
      limit: 100
    }).then(res => {
      if (res) {
        const gazers = res.data.data.repository.stargazers.edges;
        console.log(gazers);
        gazers.forEach(ele => {
          const node = {
            data: {
              id: ele.node.avatarUrl,
              avatarUrl: ele.node.avatarUrl,
              name: ele.node.name,
              generation: 0
            }
          };
          const edge = {
            data: {
              source: 'base-id',
              target: ele.node.avatarUrl,
              generation: 0
            }
          };
          setValues([...values, node, edge]);
        });
      }
    });
  }, [project]);

  return (
    <Box>
      <Card>
        <CardHeader title="Star Gazers" />
        <Divider />
        <CardContent>
          <TextField
            required
            className={classes.input}
            id="standard-basic"
            label="Owner"
            type="search"
            defaultValue="sauravhiremath"
          />
          <TextField
            required
            className={classes.input}
            id="standard-basic"
            label="Project"
            type="search"
            defaultValue="fifa-api"
          />
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            endIcon={<SendIcon />}
          >
            Send
          </Button>
          <Graph elements={values} />
        </CardContent>
      </Card>
    </Box>
  );
};

export default StarGazers;
