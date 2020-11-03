import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
  Grid,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

import Graph from '../../../components/Graph';
import options from './options';
import { getAvatar, getForks, getTopRepo } from '../../../scripts/githubAPI';

const useStyles = makeStyles(theme => ({
  avatar: {
    width: theme.spacing(14),
    height: theme.spacing(14),
  },
  input: {
    margin: theme.spacing(1),
    width: '20vw'
  },
  button: {
    margin: theme.spacing(1)
  },
  summary: {
    margin: theme.spacing(1, 0, 1, 0)
  }
}));

const Forks = () => {
  const classes = useStyles();

  const [project, setProject] = useState(options);
  const [tempOpt, setTempOpt] = useState(options);
  const [totalForks, setTotalForks] = useState(0);
  const [values, setValues] = useState();
  const [currentNode, setCurrentNode] = useState({});
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
        setCurrentNode({
          id: `${res.owner.login}-${res.name}`,
          login: res.owner.login,
          name: res.name,
          avatarUrl: getAvatar()
        });
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
          const { totalCount } = res.data.data.repository.forks;
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
          setTotalForks(totalCount);
        }
      });
    }
    // eslint-disable-next-line
  }, [project]);

  const onGraphUpdate = nodeData => {
    const {
      login, name, avatarUrl, id
    } = nodeData;
    setCurrentNode({
      login,
      name,
      avatarUrl,
      id
    });
  };

  return (
    <Box>
      <Card>
        <CardHeader title="Forks" />
        <Divider />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xl={10} lg={10} sm={8} xs={12}>
              <Card>
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
                        setTempOpt(prev => ({
                          ...prev,
                          owner: e.target.value
                        }));
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
                  {values && (
                    <Graph
                      elements={values}
                      updateGraph={onGraphUpdate}
                      key={reRender}
                    />
                  )}
                </CardContent>
              </Card>
            </Grid>
            <Grid item xl={2} lg={2} sm={4} xs={12}>
              <Card>
                <CardHeader title="Summary" />
                <Divider />
                <CardContent>
                  <TextField
                    className={classes.summary}
                    id="no-of-forks"
                    label="Total no. of forks"
                    InputProps={{
                      readOnly: true,
                      value: totalForks
                    }}
                    variant="filled"
                  />
                  <Avatar
                    alt={currentNode.login}
                    src={currentNode.avatarUrl}
                    className={classes.avatar}
                  />
                  <Typography className={classes.button} variant="subtitle2">
                    {`Username - ${currentNode.login}`}
                  </Typography>
                  <Typography className={classes.button} variant="subtitle2">
                    {`Fork name - ${currentNode.name}`}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Forks;
