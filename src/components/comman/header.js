import React from 'react';
import PropTypes from 'prop-types';

const Header = (props) => {
  return(
    <header className="Header row">
      <div className="container">
        <h2>{props.msg}</h2>
      </div>
    </header>
  );
};

Header.propTypes = {
  msg: PropTypes.string
};

export default Header;