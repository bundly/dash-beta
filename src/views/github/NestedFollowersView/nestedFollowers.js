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
  Grid
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

import Graph from '../../../components/Graph';
import { options, initialNode, intialCentrality } from './default';
import { getNestedFollowers } from '../../../scripts/githubAPI';

const useStyles = makeStyles(theme => ({
  input: {
    margin: theme.spacing(1)
  },
  centrality: {
    margin: theme.spacing(1, 0, 1, 0)
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
  const [centralities, setCentrality] = useState(intialCentrality);
  const [reRender, triggerRender] = useState(0);

  useEffect(() => {
    getNestedFollowers({
      owner: project.owner,
      limit1: project.limit1,
      limit2: project.limit2
    }).then(res => {
      if (res) {
        console.log(res);
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
      dcn, ccn, bc, pageRank
    } = nodeData;
    setCentrality({
      dcn,
      ccn,
      bc,
      pageRank
    });
  };

  return (
    <Box>
      <Card>
        <CardHeader title="Follower's Followers" />
        <Divider />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item lg={10} sm={10} xl={10} xs={12}>
              <Card>
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
                        setTempOpt(prev => ({
                          ...prev,
                          owner: e.target.value
                        }));
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
                  <Graph
                    elements={values}
                    key={reRender}
                    updateGraph={onGraphUpdate}
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid item lg={2} sm={2} xl={2} xs={12}>
              <Card>
                <CardHeader title="Live Centralities" />
                <Divider />
                <CardContent>
                  <TextField
                    className={classes.centrality}
                    id="degree-centrality"
                    label="Degree Centrality"
                    InputProps={{
                      readOnly: true,
                      value: centralities.dcn
                    }}
                    variant="filled"
                  />
                  <TextField
                    className={classes.centrality}
                    id="closeness-centrality"
                    label="Closeness Centrality"
                    InputProps={{
                      readOnly: true,
                      value: centralities.ccn
                    }}
                    variant="filled"
                  />
                  <TextField
                    className={classes.centrality}
                    id="betweenness-centrality"
                    label="Betweenness Centrality"
                    InputProps={{
                      readOnly: true,
                      value: centralities.bc
                    }}
                    variant="filled"
                  />
                  <TextField
                    className={classes.centrality}
                    id="pagerank"
                    label="PageRank"
                    InputProps={{
                      readOnly: true,
                      value: centralities.pageRank
                    }}
                    variant="filled"
                  />
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
