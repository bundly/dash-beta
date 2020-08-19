import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

import host from '../config';
import styled from '../../scss/login.module.scss';

const loginUrl = `${host}/auth/github/login`;

const Login = () => {
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

  return (
    <div className="container-fluid">
      <div className={styled['landing-page-container']}>
        <div className={styled.content__wrapper}>
          <header className={styled.header}>
            <h1 className="d-flex justify-content-center display-3">BUNDLY</h1>
          </header>
          <p className={styled.coords}>
            S 75° 6&apos; 0.027&quot; / E 123° 19&apos; 59.998&quot;
          </p>
          <div className={styled['ellipses-container']}>
            <div className={styled.greeting} />
            <div
              className={`${styled.ellipses} ${styled['ellipses__outer--thin']}`}
            />
            <div
              className={`${styled.ellipses} ${styled['ellipses__outer--thick']}`}
            />
          </div>
          <div className={styled.scroller}>
            <p className={styled['page-title']}>MLH</p>
            <div className={styled.timeline}>
              <span className={styled.timeline__unit} />
              <span
                className={`${styled.timeline__unit} ${styled['timeline__unit--active']}`}
              />
              <span className={styled.timeline__unit} />
            </div>
          </div>
          <div className="text-center">
            <div className={styled['login-github']}>
              <a
                className={`${styled.button} ${styled['button--social-login']} ${styled['button--github']}`}
                href={loginUrl}
              >
                Login With Github
              </a>
            </div>
          </div>
        </div>
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
