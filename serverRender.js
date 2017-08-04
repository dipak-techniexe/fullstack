import React from 'react';
import ReactDOMServer from 'react-dom/server';

import App from './src/components/app';

import config from './config';
import axios from 'axios';

const getApiUrl = contestId => {
  if(contestId){
    return `${config.serverUrl}/api/contests/${contestId}`;
  }
  return `${config.serverUrl}/api/contests`;

};

const getInitData = (contestId, apiData) => {
  if(contestId){
    return {
      currContId: apiData._id,
      contests: {
        [apiData._id]: apiData
      }
    };
  }
  return {
    contests: apiData.contests
  };
};

const serverRender = (contestId) => 
  axios.get(getApiUrl(contestId))
    .then(resp => {
      const initData = getInitData(contestId, resp.data)
      return {
        initMark: ReactDOMServer.renderToString(
          <App initData={initData} />
        ),
        initData: resp.data
      };    
    });

export default serverRender;