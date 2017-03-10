import axios from 'axios';
export const ADD_STOCHASTIC_VALUES = 'ADD_STOCHASTIC_VALUES';
export const FETCH_PREDICTION = 'FETCH_PREDICTION';
export const DELETE_PREDICTION = 'DELETE_PREDICTION';

const ROOT_URL = 'http://localhost:3090';

export function addStochasticValues(values, timeFrame) {
  //alert('TEST');
  return {
    type: { type: ADD_STOCHASTIC_VALUES, timeFrame: timeFrame },
    payload: values
  };
}

export function fetchPrediction(symbol) {

  console.log('fetchPrediction called');

  const request = axios.get(`${ROOT_URL}/prediction/${symbol}` );

  return {
    type: { type: FETCH_PREDICTION },
    payload: request
  };
}

export function deletePrediction(symbol) {

  console.log('deletePrediction called');

  const request = axios.delete(`${ROOT_URL}/prediction/${symbol}` );

  return {
    type: { type: DELETE_PREDICTION },
    payload: request
  };
}
