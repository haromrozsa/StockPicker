export const ADD_STOCHASTIC_VALUES = 'ADD_STOCHASTIC_VALUES';

export function addStochasticValues(values, timeFrame) {
  //alert('TEST');
  return {
    type: { type: ADD_STOCHASTIC_VALUES, timeFrame: timeFrame },
    payload: values
  };
}
