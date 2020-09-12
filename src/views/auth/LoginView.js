import React, { useEffect, useState } from 'react';
import { Typography, makeStyles, colors } from '@material-ui/core';
import clsx from 'clsx';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import AboutImage from '../../assets/Images/abstract-595.png';
import ContributeImage from '../../assets/Images/bundlybox.png';
import host from '../config';
import '../../scss/login.scss';
import { sunsetOrange } from '../../theme/customColors';

const loginUrl = `${host}/auth/github/login`;

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%'
  }
}));

const Login = ({ className, ...rest }) => {
  const classes = useStyles();
  const [isAuthorized, authorize] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      // eslint-disable-next-line no-use-before-define
      const authorized = await isValidated();
      if (authorized) authorize(true);
    };
    fetchData();
  }, []);

  // if user already "authenticated", redirect them to the app
  if (isAuthorized) {
    return <Navigate to="/app" />;
  }

  // TODO: Add responsive resizes
  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <div className="main-container">
        <div className="containerfluid">
          <div className="landing-page-container">
            <div className="content__wrapper">
              <header className="header">
                <Typography

                  variant="h1"
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    fontSize: '5em',
                    letterSpacing: '0.2em',
                    color: colors.blueGrey[600],
                    fontWeight: '200'
                  }}
                >
                  BUNDLY
                </Typography>
              </header>
              <p className="coords" style={{ color: colors.blueGrey[500] }}>
                S 75&deg; 6&apos; 0.027&quot; / E 123&deg; 19&apos; 59.998&quot;
              </p>
              <div className="ellipses-container">
                <div className="greeting" />
                <div className="ellipses ellipses__outer--thin" />
                <div className="ellipses ellipses__outer--thick" />
              </div>
              <div className="scroller" style={{ color: colors.blueGrey[500] }}>
                <p className="page-title">MLH</p>
                <div className="timeline">
                  <span className="timeline__unit" />
                  <span className="timeline__unit timeline__unit--active" />
                  <span className="timeline__unit" />
                </div>
              </div>
              <div className="text-center">
                <div className="login-github">
                  <a
                    className="button btn-effect button--social-login button--github"
                    href={loginUrl}
                  >
                    Login With Github
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="features-container">
          <div className="features slide">
            <div className="text-container">
              <div className="intro-text" style={{ color: colors.blueGrey[500] }}>
                <h1>Generate Standup Notes in markdown automatically</h1>
                <p>
                  Bundly Looks through the Pull Requests Reviewed, Issues
                  inreracted with, Pull requests opened, commits made and even
                  the previous day&#39;s standup and generates standup notes.
                </p>
                <p>
                  Also supports people in multiple pods and shows sugessions
                  from previous day&#39;s standup notes from all pods !
                </p>
              </div>
            </div>
            <div className="gif-card">
              <img
                src="https://user-images.githubusercontent.com/11258286/87809620-50c66a00-c879-11ea-8f1b-b7885c828333.gif"
                alt="gif-Feature"
              />
            </div>
          </div>

          <div className="features slide">
            <div className="text-container">
              <div className="intro-text" style={{ color: colors.blueGrey[500] }}>
                <h1>Access internal discussions instantly</h1>
                <p>
                  Quickly search through MLH Fellowship Org discussions with the
                  search tool.
                </p>
              </div>
            </div>
            <div className="gif-card">
              <img
                src="https://user-images.githubusercontent.com/28642011/87812445-d6e4af80-c87d-11ea-923e-5efeebf950dc.gif"
                alt="gif-Feature"
              />
            </div>
          </div>

          <div className="features slide">
            <div className="text-container">
              <div className="intro-text" style={{ color: colors.blueGrey[500] }}>
                <h1>Never miss out on the important stuff</h1>
                <p>
                  Receive personalized notifications for your repositories
                  including:
                </p>
                <ul>
                  <li>Issues and their comments</li>
                  <li>Pull Requests and their comments</li>
                  <li>Comments on any commits</li>
                </ul>
                Notifications are also sent for conversations in unwatched
                repositories when the user is involved including:
                <ul>
                  <li>@mentions</li>
                  <li>Issue assignments</li>
                  <li>Commits the user authors or commits</li>
                  <li>
                    Any discussion in which the user actively participates
                  </li>
                </ul>
              </div>
            </div>
            <div className="gif-card">
              <img
                src="https://user-images.githubusercontent.com/11258286/87809923-cfbba280-c879-11ea-8364-a0dee9df61e2.gif"
                alt="gif-Feature"
              />
            </div>
          </div>

          <div className="features slide">
            <div className="text-container">
              <div className="intro-text" style={{ color: colors.blueGrey[500] }}>
                <h1>Track tasks easily</h1>
                <p>Add notifications from github to your ToDo list directly</p>
              </div>
            </div>
            <div className="gif-card">
              <img
                src="https://user-images.githubusercontent.com/11258286/87809923-cfbba280-c879-11ea-8364-a0dee9df61e2.gif"
                alt="gif-Feature"
              />
            </div>
          </div>
        </div>

        <div className="about slide">
          <div className="text-container">
            <div className="intro-text" style={{ color: colors.blueGrey[500] }}>
              <h1>What is Bundly?</h1>
              <ul>
                <li>Let Bundly do its work, so you can focus on yours.</li>
                <li>
                  Bundly is a single heaven to find all your information
                  regarding the MLH Fellowship at once place!
                </li>
                <li>
                  It let&#39;s you take your utility tools, a step further.
                  Designed specifically to enhance your Fellowship experience.
                </li>
              </ul>
            </div>
          </div>
          <div className="gif-card">
            <img src={AboutImage} alt="About" />
          </div>
        </div>

        <div className="contribute slide">
          <div className="img-container" style={{ color: colors.blueGrey[500] }}>
            <img src={ContributeImage} alt="ContributeImg" />
            <h2>Let&#39;s set up your developer dashboard</h2>
          </div>
          <div className="btn-container">
            <a href={loginUrl} className="contribute-button">
              Login to Bundly
            </a>
            <a
              href="https://github.com/bundly/dash"
              className="contribute-button"
            >
              Contribute to development
            </a>
          </div>
        </div>

        <div className="copyright" style={{ color: colors.blueGrey[500] }}>Copyright &copy; 2020 Bundly</div>
      </div>
    </div>
  );
};

const isValidated = async () => {
  const base64Enc = localStorage.getItem('bundly-token');
  if (!base64Enc) {
    return false;
  }

  const tokenb64 = JSON.parse(atob(base64Enc));

  const tokens = {};
  tokenb64.tokens.forEach(account => {
    if (account.kind === 'github') {
      tokens.githubToken = account.token.accessToken;
    } else if (account.kind === 'discord') {
      tokens.discordToken = account.token.accessToken;
    }
  });

  // console.log(`${host}/auth/verify`);
  // console.log(JSON.stringify({ username: tokenb64.username, ...tokens }));

  const isAuthorized = await axios.post(`${host}/auth/verify`, {
    username: tokenb64.username,
    ...tokens
  });

  return isAuthorized && isAuthorized.data.success;
};

export default Login;
