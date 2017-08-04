import axios from 'axios';

export const fetchContest = contestId => {
  return axios.get(`/api/contests/${contestId}`)
    .then(resp => resp.data);
};

export const fetchContestList = () => {
  return axios.get('/api/contests')
    .then(resp => resp.data.contests);
};

export const fetchNames = Ids => {
  return axios.get(`/api/names/${Ids.join(',')}`)
    .then(resp => resp.data.names);
};

export const addName = (newName, contestId) => {
  return axios.post('/api/names', { newName, contestId})
    .then(resp=> resp.data);
};

export const deleteName = (dName) => {
  return axios.get(`/api/names/${dName}`)
    .then(resp=> resp.data.names);
};

