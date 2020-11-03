import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Button,
  Box,
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
import {
  getAvatar,
  getStarGazers,
  getTopRepo
} from '../../../scripts/githubAPI';

const useStyles = makeStyles(theme => ({
  avatar: {
    width: theme.spacing(14),
    height: theme.spacing(14)
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

const StarGazers = () => {
  const classes = useStyles();

  const [project, setProject] = useState(options);
  const [tempOpt, setTempOpt] = useState(options);
  const [totalStars, setTotalStars] = useState(0);
  const [values, setValues] = useState([]);
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
              id: `${res.owner.login}-${res.name}`,
              login: res.owner.login,
              name: res.name,
              avatarUrl: getAvatar(),
              generation: 0
            }
          }
        ]);
        setCurrentNode({
          id: `${res.owner.login}-${res.name}`,
          login: res.owner.login,
          avatarUrl: getAvatar()
        });
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
          const { totalCount } = res.data.data.repository.stargazers;
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
          setTotalStars(totalCount);
        }
      });
    }
    // eslint-disable-next-line
  }, [project]);

  const onGraphUpdate = nodeData => {
    const { login, avatarUrl, id } = nodeData;
    setCurrentNode({
      login,
      avatarUrl,
      id
    });
  };

  return (
    <Box>
      <Card>
        <CardHeader title="Star Gazers" />
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
                            id: `${tempOpt.owner}-${tempOpt.name}`,
                            avatarUrl: getAvatar(),
                            login: tempOpt.owner,
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
                  <Graph
                    elements={values}
                    updateGraph={onGraphUpdate}
                    key={reRender}
                  />
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
                    id="no-of-stars"
                    label="Total no. of stars"
                    InputProps={{
                      readOnly: true,
                      value: totalStars
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
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default StarGazers;
