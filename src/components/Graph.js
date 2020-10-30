import React, { useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import cytoscape from 'cytoscape';
import cola from 'cytoscape-cola';

import style from './style';

const useStyles = makeStyles(() => ({
  graph: {
    height: '600px'
  }
}));

const Graph = ({ elements, updateGraph }) => {
  const classes = useStyles();

  const container = useRef(null);
  const graph = useRef();
  const layout = useRef();

  useEffect(() => {
    if (graph.current) {
      if (layout.current) {
        layout.current.stop();
      }
      graph.current.add(elements);
      layout.current = graph.current.elements().makeLayout({
        name: 'cola'
      });

      // Calculate centrality
      const dcn = graph.current.elements().dcn();
      const ccn = graph.current.elements().ccn();
      const bc = graph.current.elements().bc();

      graph.current.nodes().forEach(n => {
        n.data({
          dcn: dcn.degree(n),
          ccn: ccn.closeness(n),
          bc: bc.betweenness(n)
        });
      });
      console.log(graph.current.nodes());

      layout.current.run();
    }
  }, [elements]);

  useEffect(() => {
    if (!container.current) {
      return;
    }
    try {
      if (!graph.current) {
        cytoscape.use(cola);
        graph.current = cytoscape({
          elements,
          style,
          maxZoom: 1,
          wheelSensitivity: 0.2,
          container: container.current
        });

        if (updateGraph) {
          graph.current.on('select', 'node', e => {
            updateGraph(e.target.data());
          });
        }
      }
      // eslint-disable-next-line consistent-return
      return () => {
        // eslint-disable-next-line no-unused-expressions
        graph.current && graph.current.destroy();
      };
    } catch (error) {
      console.error(error);
    }
  }, []);

  return <div className={classes.graph} ref={container} />;
};

export default Graph;
