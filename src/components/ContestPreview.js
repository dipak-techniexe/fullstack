import React from 'react';
import PropTypes from 'prop-types';

class ContestPreview extends React.Component {
  handleClick = () => {
    this.props.onClick(this.props._id);
  };
  render(){
    return (
      <div className="link contestPreview" onClick={this.handleClick}>
        <div className="cateName">
          {
            this.props.categoryName
          }
        </div>
        <div className="contName">
          {
            this.props.contestName
          }
        </div>
      </div>
    );
  }
}

ContestPreview.propTypes = {
  categoryName: PropTypes.string,
  contestName: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  _id: PropTypes.string
};

export default ContestPreview;