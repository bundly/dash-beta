import clsx from 'clsx';
import PropTypes from 'prop-types';
import ReactMde from 'react-mde';
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  makeStyles
} from '@material-ui/core';

import markdownOverrides from '../../utils/markdownOverrides';
import { todoData as initData } from '../../utils/placeHolder';

const useStyles = makeStyles(markdownOverrides, {
  name: 'MarkdownElement',
  flip: false
});

const ToDo = ({ className, ...rest }) => {
  const classes = useStyles();
  const [value, setValue] = useState(localStorage.getItem('todo') ?? initData);
  const [selectedTab, setSelectedTab] = useState('write');
  localStorage.setItem('todo', value);

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
    <Box>
      <Card>
        <CardHeader title="To-Do" />
        <Divider />
        <CardContent>
          <Card>
            <CardContent>
              <ReactMde
                value={value}
                onChange={setValue}
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
                minEditorHeight={rest.height ?? 650}
                minPreviewHeight={rest.height ?? 650}
                generateMarkdownPreview={markdown =>
                  Promise.resolve(
                    <ReactMarkdown
                      source={markdown}
                      className={clsx(classes.root, 'markdown-body', className)}
                    />
                  )
                }
              />
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </Box>
  );
};

ToDo.propTypes = {
  className: PropTypes.string
};

export default ToDo;
