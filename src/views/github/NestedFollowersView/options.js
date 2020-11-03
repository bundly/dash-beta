import { getAvatar, getUsername } from 'src/scripts/githubAPI';

const owner = getUsername();
const avatarUrl = getAvatar();

export const options = {
  owner,
  limit1: 5,
  limit2: 5
};

export const initialNode = {
  data: {
    id: owner,
    avatarUrl,
    login: owner,
    generation: 0
  }
};

export const currentNodeFill = {
  login: 'Anonymous',
  avatarUrl: '',
  dcn: 0,
  ccn: 0,
  bc: 0,
  pageRank: '∞'
};
