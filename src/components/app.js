import React from 'react';
import Header from './comman/header';
import ContestList from './contestList';
import Contest from './contest';
import * as api from '../api';

import PropTypes from 'prop-types';

const pushState = (obj, url) => window.history.pushState(obj, '', url);

const onPopState = handler => {
  window.onpopstate = handler;
}; 

class App extends React.Component{
  static propTypes = {
    initData: PropTypes.object.isRequired
  }
  state = this.props.initData;
  componentDidMount(){
    onPopState((event) => {
      this.setState({
        currContId: (event.state || {}).currContId
      });
    });
  }
  componentWillUnmount(){
    onPopState(null);
  }
  fetchContest = (contestId) => {
    pushState(
      { currContId: contestId },
      `/contest/${contestId}`
    );
    api.fetchContest(contestId).then(contest => {
      this.setState({
        currContId: contest._id,
        contests: {
          ...this.state.contests,
          [contest._id]: contest
        }
      });
    });    
  }
  fetchContestList = () => {
    pushState(
      { currContId: null },
      '/'
    );
    api.fetchContestList().then(contests => {
      this.setState({
        currContId: null,
        contests
      });
    });    
  }
  fetchNames = (nameIds) => {
    if(nameIds.length === 0){
      return;
    }
    api.fetchNames(nameIds).then(names=>{
      this.setState({
        names
      });
    });
  }
  currContest() {
    return this.state.contests[this.state.currContId];
  }
  pageHeader(){
    if(this.state.currContId){
      return this.currContest().contestName;
    }
    return 'Naming Contests';
  }
  lookupName = (nameId) => {
    if(!this.state.names || !this.state.names[nameId]){
      return {
        name: '...'
      };
    }
    return this.state.names[nameId];
  }
  addName = (newName, contestId) => {
    api.addName(newName, contestId).then(resp => 
      this.setState({
        contests: {
          ...this.state.contests,
          [resp.updatedContest._id]: resp.updatedContest
        },
        names: {
          ...this.state.names,
          [resp.newName._id]: resp.newName
        }
      })
    ).catch(console.error);
  }
  deleteName = (dName) => {
    api.deleteName(dName).then(resp => 
      this.setState({
        contests: {
          ...this.state.contests
        },
        names: {
          ...this.state.names
        }
      })
    ).catch(console.error);
  }
  currContent() {
    if(this.state.currContId){
      return <Contest
        {...this.currContest()}
        contestListClick={this.fetchContestList}
        fetchNames={this.fetchNames}
        addName={this.addName}
        deleteName={this.deleteName}
        lookupName={this.lookupName} />;
    }
    return <ContestList 
      onContestClick={this.fetchContest}
      contests={this.state.contests} />;
  }
  render(){
    return(
      <div className="App container-fluid">
        <Header msg={this.pageHeader()} />
        {
          this.currContent()
        }
      </div>
    );
  }
}
App.propTypes = {
  initData: PropTypes.object.isRequired
};

export default App;