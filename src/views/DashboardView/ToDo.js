import clsx from 'clsx';
import PropTypes from 'prop-types';
import ReactMde from 'react-mde';
import React, { useState, useEffect } from 'react';
import { Converter as ShowdownConverter } from 'showdown';

import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  makeStyles,
} from '@material-ui/core';
import initData from './data';

const converter = new ShowdownConverter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
  emoji: true,
  smoothLivePreview: true,
  ghMentions: true
});

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  }
}));

const ToDo = ({ className, ...rest }) => {
  const classes = useStyles();
  const [value, setValue] = useState(localStorage.getItem('todo')
  ?? initData);
  localStorage.setItem('todo', value);
  const [selectedTab, setSelectedTab] = useState('write');
  useEffect(() => {
    setValue(localStorage.getItem('todo'));
    const updateStorage = setInterval(() => {
      setValue(localStorage.getItem('todo'));
    }, 1000);

    return () => {
      clearInterval(updateStorage);
    };
  }, []);
  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="To-Do" />
      <Divider />
      <CardContent>
        <Box
          height={300}
          position="relative"
        >
          <ReactMde
            value={value}
            onChange={setValue}
            selectedTab={selectedTab}
            onTabChange={setSelectedTab}
            minEditorHeight={650}
            minPreviewHeight={650}
            generateMarkdownPreview={markdown =>
              Promise.resolve(converter.makeHtml(markdown))}
          />
        </Box>

      </CardContent>
    </Card>
  );
};

ToDo.propTypes = {
  className: PropTypes.string
};

export default ToDo;
