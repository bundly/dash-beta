const COLORS = {
  purp: '#43447a'
};

const nodeStyles = [
  {
    selector: 'node',
    style: {
      'transition-property': 'background-color border-color',
      'transition-duration': '0.3s',
      'transition-timing-function': 'ease-in-sine',
      'background-image': 'data(avatarUrl)' || COLORS.purp,
      'background-size': 'inherit',
      label: 'data(name)'
    }
  }
];
const edgeStyles = [
  {
    selector: 'edge',
    style: {
      'curve-style': 'bezier',
      'line-color': COLORS.purp
    }
  }
];

export default [...nodeStyles, ...edgeStyles];
