// Host
const host =
  process.env.NODE_ENV === 'production'
    ? 'https://bundly.tech/api'
    : 'http://localhost:5000';

export default host;
