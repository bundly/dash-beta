import React, { useState, useEffect } from 'react';
import {
  Box,
  Divider,
  Card,
  Grid,
  CardContent,
  CardHeader
} from '@material-ui/core';
import ReactMde from 'react-mde';
import { Converter as ShowdownConverter } from 'showdown';
import 'react-mde/lib/styles/css/react-mde-all.css';
import ReactMarkdown from 'react-markdown';

import initData from './data';
import yesterdayNotes from '../../../scripts/notesGenerator';
import { githubQuery } from '../../../scripts/githubAPI';

const converter = new ShowdownConverter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
  emoji: true,
  smoothLivePreview: true,
  ghMentions: true
});

const StandUpNotes = props => {
  const [value, setValue] = useState(initData);

  const [selectedTab, setSelectedTab] = useState('write');
  const currentTime = new Date();
  useEffect(() => {
    githubQuery({ time: currentTime.toISOString() }).then(data => {
      if (!data.errors) {
        setValue(yesterdayNotes(data.data, currentTime.toISOString()));
      }
    });
  }, []);

  return (
    <Box>
      <Card>
        <CardHeader title="Daily Standup" />
        <Divider />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item lg={12} sm={12} xl={12} xs={12}>
              <ReactMde
                value={value}
                onChange={setValue}
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
                minEditorHeight={props.height ?? 650}
                minPreviewHeight={props.height ?? 650}
                generateMarkdownPreview={markdown =>
                  Promise.resolve(converter.makeHtml(markdown))
                }
              />
            </Grid>
            {/* TODO: Add this back in after figuring out cause of the issue */}
            {/* <Grid item lg={6} sm={6} xl={6} xs={12}>
              <Card>
                <CardContent>
                  <ReactMarkdown source={value} />
                </CardContent>
              </Card>
            </Grid> */}
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default StandUpNotes;
