import React, { useState, useEffect } from 'react';
import {
  Box,
  Divider,
  Card,
  CardContent,
  CardHeader,
  Button,
  TextField,
  makeStyles,
  CircularProgress
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

import Graph from '../../../components/Graph';
import options from './options';
import {
  getAvatar,
  getStarGazers,
  getTopRepo
} from '../../../scripts/githubAPI';

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
  const [values, setValues] = useState([]);
  const [reRender, triggerRender] = useState(0);

  useEffect(() => {
    if (project.name === '' || project.owner === '') {
      getTopRepo().then(res => {
        setProject({
          owner: res.owner.login,
          name: res.name,
          limit: options.limit
        });
        setTempOpt({
          owner: res.owner.login,
          name: res.name,
          limit: options.limit
        });
        setValues([
          {
            data: {
              id: `${res.owner.login}-${res.name}`,
              login: res.owner.login,
              avatarUrl: getAvatar(),
              generation: 0
            }
          }
        ]);
      });
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (project.owner && project.name) {
      getStarGazers({
        name: project.name,
        owner: project.owner,
        limit: project.limit
      }).then(res => {
        if (res.data?.data) {
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
                source: `${project.owner}-${project.name}`,
                target: ele.node.avatarUrl,
                generation: 0
              }
            };
            setValues([...values, node, edge]);
          });
        }
      });
    }
    // eslint-disable-next-line
  }, [project]);

  return (
    <Box>
      <Card>
        <CardHeader title="Star Gazers" />
        <Divider />
        <CardContent>
          <form
            autoComplete="off"
            onSubmit={e => {
              e.preventDefault();
              triggerRender(c => c + 1);
              setValues([
                {
                  data: {
                    id: `${tempOpt.owner}-${tempOpt.name}`,
                    generation: 0
                  }
                }
              ]);
              setProject({ ...tempOpt });
            }}
          >
            <TextField
              required
              className={classes.input}
              id="owner"
              label="Owner"
              value={tempOpt.owner}
              onInput={e => {
                e.persist();
                setTempOpt(prev => ({ ...prev, owner: e.target.value }));
              }}
            />
            <TextField
              required
              className={classes.input}
              id="name"
              label="Project Name"
              value={tempOpt.name}
              onInput={e => {
                e.persist();
                setTempOpt(prev => ({ ...prev, name: e.target.value }));
              }}
            />
            <TextField
              required
              className={classes.input}
              id="limit"
              label="Limit (last x)"
              type="text"
              value={tempOpt.limit}
              onInput={e => {
                e.persist();
                setTempOpt(prev => ({
                  ...prev,
                  limit: Number(e.target.value)
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
          {values === [] && <CircularProgress />}
          <Graph elements={values} key={reRender} />
        </CardContent>
      </Card>
    </Box>
  );
};

export default StarGazers;
