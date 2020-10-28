import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import {
  Box,
  Divider,
  Card,
  Grid,
  CardContent,
  CardHeader,
  makeStyles
} from '@material-ui/core';

import Graph from '../../../components/Graph';
import defaultData from './default';
import { getStarGazers } from '../../../scripts/githubAPI';

const StarGazers = () => {
  const [project, setProject] = useState(defaultData);
  const [values, setValues] = useState([
    { data: { id: 'base-id', generation: 0 } }
  ]);
  //   const classes = useStyles();

  useEffect(() => {
    getStarGazers({
      name: project.name,
      owner: project.owner,
      limit: 100
    }).then(res => {
      if (res) {
        const gazers = res.data.data.repository.stargazers.edges;
        console.log(gazers);
        // setValues(res.data.data.repository.stargazers);
        const elements = gazers.map(ele => {
          return {
            data: {
              id: ele.node.avatarUrl,
              source: 'base-id'
            }
          };
        });
        setValues(prev => [...prev, ...elements]);
      }
    });
  }, [project]);

  return (
    <Box>
      <Card>
        <CardHeader title="Star Gazers" />
        <Divider />
        <CardContent>
          <Graph elements={values} />
        </CardContent>
      </Card>
    </Box>
  );
};

export default StarGazers;
