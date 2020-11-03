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
import options from './options';
import { getAvatar, getForks, getTopRepo } from '../../../scripts/githubAPI';

const useStyles = makeStyles(theme => ({
  input: {
    margin: theme.spacing(1),
    width: '25vw'
  },
  button: {
    margin: theme.spacing(1)
  }
}));

const Forks = () => {
  const classes = useStyles();

  const [project, setProject] = useState(options);
  const [tempOpt, setTempOpt] = useState(options);
  const [values, setValues] = useState();
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
              id: `${res.owner.login}/${res.name}`,
              avatarUrl: getAvatar(),
              login: res.owner.login,
              name: res.owner.name,
              generation: 0
            }
          }
        ]);
      });
    }
  });

  useEffect(() => {
    if (project.name !== '' && project.owner !== '') {
      getForks({
        name: project.name,
        owner: project.owner,
        limit: project.limit
      }).then(res => {
        if (res.data.data?.repository) {
          const gazers = res.data.data.repository.forks.edges;
          gazers.forEach(ele => {
            const node = {
              data: {
                id: `${ele.node.owner.login}/${ele.node.name}`,
                avatarUrl: ele.node.owner.avatarUrl,
                login: ele.node.owner.login,
                name: ele.node.name,
                generation: 0
              }
            };
            const edge = {
              data: {
                source: `${ele.node.owner.login}/${ele.node.name}`,
                target: `${project.owner}/${project.name}`,
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
        <CardHeader title="Forks" />
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
                    id: `${tempOpt.owner}/${tempOpt.name}`,
                    avatarUrl: getAvatar(),
                    login: tempOpt.owner,
                    name: tempOpt.name,
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
          <Graph elements={values} key={reRender} />
        </CardContent>
      </Card>
    </Box>
  );
};

export default Forks;
