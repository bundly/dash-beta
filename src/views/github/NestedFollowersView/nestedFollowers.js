import React, { useState, useEffect } from 'react';
import {
  Box,
  Divider,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  InputLabel,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
  makeStyles,
  Grid
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

import Graph from '../../../components/Graph';
import { options, initialNode, currentNodeFill } from './options';
import { getNestedFollowers } from '../../../scripts/githubAPI';

const useStyles = makeStyles(theme => ({
  box: {
    margin: theme.spacing(1)
  },
  centrality: {
    margin: theme.spacing(1, 0, 1, 0)
  },
  name: {
    margin: theme.spacing(1, 1, 1, 1)
  },
  avatar: {
    width: theme.spacing(14),
    height: theme.spacing(14),
    alignItems: 'center',
    display: 'flex'
  }
}));

const StarGazers = () => {
  const classes = useStyles();

  const [project, setProject] = useState(options);
  const [tempOpt, setTempOpt] = useState(options);
  const [values, setValues] = useState([initialNode]);
  const [currentNode, setCurrentNode] = useState(currentNodeFill);
  const [reRender, triggerRender] = useState(0);
  const [cluster, setCluster] = useState('mcl');

  useEffect(() => {
    getNestedFollowers({
      owner: project.owner,
      limit1: project.limit1,
      limit2: project.limit2
    }).then(res => {
      if (res.data.data?.user) {
        // Build Network Graph
        const followers1g = res.data.data.user.followers.nodes;
        followers1g.forEach(follower1g => {
          const node = {
            data: {
              id: follower1g.login,
              avatarUrl: follower1g.avatarUrl,
              login: follower1g.login,
              generation: 0
            }
          };
          const edge = {
            data: {
              source: project.owner,
              target: follower1g.login,
              generation: 0
            }
          };
          setValues([...values, node, edge]);
          follower1g.followers.nodes.forEach(follower2g => {
            const node2 = {
              data: {
                id: follower2g.login,
                avatarUrl: follower2g.avatarUrl,
                login: follower2g.login,
                generation: 1
              }
            };
            const edge2 = {
              data: {
                source: follower1g.login,
                target: follower2g.login,
                generation: 1
              }
            };
            setValues([...values, node2, edge2]);
          });
        });
      }
    });
    // eslint-disable-next-line
  }, [project]);

  const onGraphUpdate = nodeData => {
    const {
      dcn, ccn, bc, pageRank, login, avatarUrl
    } = nodeData;
    setCurrentNode({
      login,
      avatarUrl,
      dcn,
      ccn,
      bc,
      pageRank
    });
  };

  return (
    <Box>
      <Card>
        <CardHeader title="Protein Relations" />
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
                            id: tempOpt.owner,
                            generation: 0
                          }
                        }
                      ]);
                      setProject({ ...tempOpt });
                    }}
                  >
                    <TextField
                      required
                      className={classes.box}
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
                      className={classes.box}
                      id="limit1"
                      label="1st Gen Limit (last x)"
                      type="text"
                      value={tempOpt.limit1}
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
                      className={classes.box}
                      id="limit2"
                      label="2nd Gen Limit (last x)"
                      type="text"
                      value={tempOpt.limit2}
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
                      className={classes.box}
                      endIcon={<SendIcon />}
                    >
                      Compute
                    </Button>
                  </form>
                  <Graph
                    elements={values}
                    key={reRender}
                    updateGraph={onGraphUpdate}
                    clusterAlgo={cluster}
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xl={2} lg={2} sm={4} xs={12}>
              <Card>
                <CardHeader title="Node Summary" />
                <Divider />
                <CardContent>
                  {/* <Avatar
                    alt={currentNode.login}
                    src={currentNode.avatarUrl}
                    className={classes.avatar}
                  /> */}
                  <Typography className={classes.name} variant="subtitle2">
                    {currentNode.login}
                  </Typography>
                  <TextField
                    className={classes.centrality}
                    id="degree-centrality"
                    label="Degree Centrality"
                    InputProps={{
                      readOnly: true,
                      value: currentNode.dcn
                    }}
                    variant="filled"
                  />
                  <TextField
                    className={classes.centrality}
                    id="closeness-centrality"
                    label="Closeness Centrality"
                    InputProps={{
                      readOnly: true,
                      value: currentNode.ccn
                    }}
                    variant="filled"
                  />
                  <TextField
                    className={classes.centrality}
                    id="betweenness-centrality"
                    label="Betweenness Centrality"
                    InputProps={{
                      readOnly: true,
                      value: currentNode.bc
                    }}
                    variant="filled"
                  />
                  <TextField
                    className={classes.centrality}
                    id="pagerank"
                    label="PageRank"
                    InputProps={{
                      readOnly: true,
                      value: currentNode.pageRank
                    }}
                    variant="filled"
                  />
                  <FormControl fullWidth className={classes.centrality}>
                    <InputLabel id="cluster-label">
                      Clustering Algorithm
                    </InputLabel>
                    <Select
                      className={classes.centrality}
                      labelId="cluster"
                      id="cluster"
                      value={cluster}
                      onChange={e => setCluster(e.target.value)}
                    >
                      <MenuItem value="mcl">Markov</MenuItem>
                      <MenuItem value="kmeans">kMeans</MenuItem>
                      <MenuItem value="kMedoids">kMedoids</MenuItem>
                      <MenuItem value="hca">hierarchical</MenuItem>
                      <MenuItem value="ap">affinityPropagation</MenuItem>
                    </Select>
                  </FormControl>
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
