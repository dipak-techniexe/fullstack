import React from 'react';
import PropTypes from 'prop-types';


class Contest extends React.Component {
  componentDidMount() {
    this.props.fetchNames(this.props.nameIds);
  }
  handleSubmit = (event) => {
    event.preventDefault();
    let newN = this.refs.newNameInput.value;
    if (/\S/.test(newN)) {
      this.props.addName( newN, this.props._id);
      newN = '';
    }
  }
  deleteName = (e) => {
    e.preventDefault();
    var result = confirm('Are You Sure. You want to delete?');
    if (result) {
      this.props.deleteName(this.refs.key.value);
    }    
  }
  render() {
    return (
      <div className="Contest">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Contest Description</h3>
          </div>
          <div className="panel-body">
            <div className="contest-description">
              {this.props.description}
            </div>
          </div>
        </div>
        {
          this.props.nameIds.length > 0 ? <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">Proposed Names</h3>
            </div>
            <div className="panel-body">
              <ul className="list-group">
                {
                  this.props.nameIds.map( nameId => 
                    <li key={nameId} className="list-group-item">
                      { this.props.lookupName(nameId).name }
                      <form onSubmit={this.deleteName}>
                        <button type="submit" className="btn btn-info">
                          X
                        </button>
                        <input ref="key" type="hidden" value={nameId} />
                      </form>
                    </li>
                  )
                }              
              </ul>
            </div>
          </div> : null
        }
        <div className="panel panel-info">
          <div className="panel-heading">
            <h3 className="panel-title">Propose a New Name</h3>
          </div>
          <div className="panel-body">
            <form onSubmit={this.handleSubmit}>
              <div className="input-group">
                <input type="text"
                  placeholder="New Name Here..."
                  ref="newNameInput"
                  className="form-control" />
                <span className="input-group-btn">
                  <button type="submit" className="btn btn-info">
                    Sumbit
                  </button>
                </span>
              </div>
            </form>
          </div>
        </div>
        <div className="homeLink link"
          onClick={this.props.contestListClick}>
          Contest List
        </div>
      </div>
    );
  }
}

Contest.propTypes = {
  _id: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  contestListClick: PropTypes.func.isRequired,
  fetchNames: PropTypes.func.isRequired,
  nameIds: PropTypes.array.isRequired,
  lookupName: PropTypes.func.isRequired,
  addName: PropTypes.func.isRequired,
  deleteName: PropTypes.func.isRequired,
};

export default Contest;