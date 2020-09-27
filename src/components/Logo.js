import React from 'react';

const Logo = props => {
  return (
    <img
      alt="Logo"
      src="/static/logowhite.png"
      style={{ width: '42px' }}
      {...props}
    />
  );
};

export default Logo;
