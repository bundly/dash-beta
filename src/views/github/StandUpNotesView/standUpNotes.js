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

import markdownOverrides from './markdownOverrides';
import initData from './data';
import yesterdayNotes from '../../../scripts/notesGenerator';
import { githubQuery } from '../../../scripts/githubAPI';

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
    githubQuery({ time: currentTime.toISOString() }).then(data => {
      if (!data.errors) {
        setValue(yesterdayNotes(data.data, currentTime.toISOString()));
      }
    });
    // eslint-disable-next-line
  }, []);

  return (
    <Box>
      <Card>
        <CardHeader title="STANDUP NOTES" />
        <Divider />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item lg={6} sm={6} xl={6} xs={12}>
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
            </Grid>
            <Grid item lg={6} sm={6} xl={6} xs={12}>
              <Card>
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
