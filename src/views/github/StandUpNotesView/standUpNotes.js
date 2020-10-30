import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import {
  Box,
  Divider,
  Card,
  Grid,
  CardContent,
  CardHeader,
  makeStyles
} from '@material-ui/core';
import ReactMde from 'react-mde';
import ReactMarkdown from 'react-markdown';

import initData from './data';
import markdownOverrides from '../../../utils/markdownOverrides';
import yesterdayNotes from '../../../scripts/notesGenerator';
import { getSummary, getUsername } from '../../../scripts/githubAPI';

// TODO: Custom Buttons
// const buttonPropsOptions = {
//   writeButton:
//   previewButton:
//   textArea:
// }

const useStyles = makeStyles(markdownOverrides, {
  name: 'MarkdownElement',
  flip: false
});

const StandUpNotes = ({ className, ...rest }) => {
  const [value, setValue] = useState(initData);
  const classes = useStyles();

  const [selectedTab, setSelectedTab] = useState('write');
  const currentTime = new Date();

  useEffect(() => {
    getSummary({
      time: currentTime.toISOString(),
      limit: 100,
      username: getUsername()
    }).then(data => {
      if (!data.errors) {
        setValue(yesterdayNotes(data.data, currentTime.toISOString()));
      }
    });
    // eslint-disable-next-line
  }, []);

  return (
    <Box>
      <Card>
        <CardHeader title="Daily Standup" />
        <Divider />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item lg={6} sm={6} xl={6} xs={12}>
              <Card>
                <CardContent>
                  <ReactMde
                    value={value}
                    onChange={setValue}
                    selectedTab={selectedTab}
                    onTabChange={setSelectedTab}
                    minEditorHeight={rest.height ?? 480}
                    maxEditorHeight={rest.height ?? 580}
                    disablePreview
                    generateMarkdownPreview={markdown =>
                      Promise.resolve(
                        <ReactMarkdown
                          source={markdown}
                          className={clsx(
                            classes.root,
                            'markdown-body',
                            className
                          )}
                        />
                      )
                    }
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid item lg={6} sm={6} xl={6} xs={12}>
              <Card>
                <CardHeader title="Live Preview" />
                <Divider />
                <CardContent>
                  <ReactMarkdown
                    source={value}
                    className={clsx(classes.root, 'markdown-body', className)}
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

export default StandUpNotes;
