import axios from 'axios';
import {
  summaryQuery,
  starGazersQuery,
  forksQuery,
  nestedFollowersQuery,
  topRepositoryQuery
} from './queries';

export function getToken() {
  const bundlyToken = localStorage.getItem('bundly-token');
  let githubToken;
  if (bundlyToken) {
    githubToken = JSON.parse(atob(bundlyToken)).tokens[0].token.accessToken;
  }
  return {
    token: githubToken,
    header: { Authorization: `Token ${githubToken}` }
  };
}

export function getAvatar() {
  const bundlyToken = localStorage.getItem('bundly-token');
  let avatarUrl;
  if (bundlyToken) avatarUrl = JSON.parse(atob(bundlyToken)).avatar;
  return avatarUrl;
}

export function getUsername() {
  const bundlyToken = localStorage.getItem('bundly-token');
  let username;
  if (bundlyToken) username = JSON.parse(atob(bundlyToken)).username;
  return username;
}

export async function getTopRepo() {
  const req = await axios({
    url: 'https://api.github.com/graphql',
    method: 'post',
    data: JSON.stringify({ query: topRepositoryQuery }),
    headers: getToken().header
  });

  let res = { name: '', owner: { login: '' } };
  if (!req.data.errors) {
    // eslint-disable-next-line prefer-destructuring
    res = req.data.data.viewer.topRepositories.nodes[0];
  }
  return res;
}

export function markNotification(id) {
  // console.log(`Using`,  getToken())
  return axios.patch(
    `https://api.github.com/notifications/threads/${id}`,
    {},
    { headers: getToken().header }
  );
}

export function getSummary({ time, limit, username }) {
  // console.log(getToken(), getUsername())

  const targetTime = new Date(time);
  targetTime.setDate(targetTime.getDate() - 1);

  return axios({
    url: 'https://api.github.com/graphql',
    method: 'post',
    data: JSON.stringify({
      query: summaryQuery,
      variables: { from: targetTime.toISOString(), username: [username], limit }
    }),
    headers: getToken().header
  });
}

export function getStarGazers({ name, owner, limit }) {
  return axios({
    url: 'https://api.github.com/graphql',
    method: 'post',
    data: JSON.stringify({
      query: starGazersQuery,
      variables: { name, owner, limit }
    }),
    headers: getToken().header
  });
}

export function getForks({ name, owner, limit }) {
  return axios({
    url: 'https://api.github.com/graphql',
    method: 'post',
    data: JSON.stringify({
      query: forksQuery,
      variables: { name, owner, limit }
    }),
    headers: getToken().header
  });
}

export function getNestedFollowers({ owner, limit1, limit2 }) {
  return axios({
    url: 'https://api.github.com/graphql',
    method: 'post',
    data: JSON.stringify({
      query: nestedFollowersQuery,
      variables: { owner, limit1, limit2 }
    }),
    headers: getToken().header
  });
}

export const githubNotificationFetcher = () =>
  axios.get('https://api.github.com/notifications', {
    headers: getToken().header
  });

export const githubSearch = text =>
  axios.get(
    `https://api.github.com/search/issues?q=${encodeURI(
      text
    )}%20org%3Amlh-Fellowship`,
    { headers: getToken().header }
  );
