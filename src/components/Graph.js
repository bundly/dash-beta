import * as React from 'react';
import { makeStyles } from '@material-ui/core';
import cytoscape from 'cytoscape';
import cola from 'cytoscape-cola';

import style from './style';

const useStyles = makeStyles(() => ({
  graph: {
    height: '600px',
  }
}));

const Graph = ({ elements }) => {
  const classes = useStyles();

  const container = React.useRef(null);
  const graph = React.useRef();
  const layout = React.useRef();

  React.useEffect(() => {
    if (graph.current) {
      if (layout.current) {
        layout.current.stop();
      }
      graph.current.add(elements);
      layout.current = graph.current.elements().makeLayout({
        name: 'cola'
      });
      layout.current.run();
    }
  }, [elements]);

  React.useEffect(() => {
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
          container: container.current,
        });
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
