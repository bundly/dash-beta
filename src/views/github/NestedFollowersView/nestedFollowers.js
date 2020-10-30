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
import { options, initialNode } from './default';
import { getNestedFollowers } from '../../../scripts/githubAPI';

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

  const [project, setProject] = useState(options);
  const [tempOpt, setTempOpt] = useState(options);
  const [values, setValues] = useState([initialNode]);
  const [reRender, triggerRender] = useState(0);

  useEffect(() => {
    getNestedFollowers({
      owner: project.owner,
      limit1: project.limit1,
      limit2: project.limit2
    }).then(res => {
      if (res) {
        console.log(res);
        const gazers = res.data.data.repository.stargazers.edges;
        gazers.forEach(ele => {
          const node = {
            data: {
              id: ele.node.avatarUrl,
              avatarUrl: ele.node.avatarUrl,
              login: ele.node.login,
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
        <CardHeader title="Follower's Followers" />
        <Divider />
        <CardContent>
          <form
            autoComplete="off"
            onSubmit={e => {
              e.preventDefault();
              console.log(tempOpt);
              triggerRender(c => c + 1);
              setValues([initialNode]);
              setProject({ ...tempOpt });
            }}
          >
            <TextField
              required
              className={classes.input}
              id="owner"
              label="Owner"
              defaultValue="sauravhiremath"
              onInput={e => {
                e.persist();
                setTempOpt(prev => ({ ...prev, owner: e.target.value }));
              }}
            />
            <TextField
              required
              className={classes.input}
              id="limit1"
              label="1st Gen Limit (last x)"
              type="text"
              defaultValue={project.limit1}
              onInput={e => {
                e.persist();
                setTempOpt(prev => ({
                  ...prev,
                  limit1: Number(e.target.value)
                }));
              }}
            />
            <TextField
              required
              className={classes.input}
              id="limit2"
              label="2nd Gen Limit (last x)"
              type="text"
              defaultValue={project.limit2}
              onInput={e => {
                e.persist();
                setTempOpt(prev => ({
                  ...prev,
                  limit2: Number(e.target.value)
                }));
              }}
            />
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              className={classes.button}
              endIcon={<SendIcon />}
            >
              Compute
            </Button>
          </form>
          <Graph elements={values} key={reRender} />
        </CardContent>
      </Card>
    </Box>
  );
};

export default StarGazers;
