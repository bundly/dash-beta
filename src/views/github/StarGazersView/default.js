import { getUsername } from 'src/scripts/githubAPI';

const owner = getUsername();

export const options = {
  owner,
  name: 'fifa-api',
  limit: 100
};

export const initialNode = {
  data: {
    id: `${owner}-${options.name}`,
    generation: 0
  }
};
