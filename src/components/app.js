import React from 'react';
import PropTypes from 'prop-types';

const val = Math.random();
const color = val > 0.5 ? 'green' : 'red';

const App = (props) => {
  return(
    <h1 style={{color:color}}>{props.msg} -- {val}</h1>
  );
};

App.propTypes = {
  msg: PropTypes.string
};

App.defaultProps = {
  msg: 'Hello !'
};

export default App;