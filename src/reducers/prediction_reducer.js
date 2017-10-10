import { ADD_STOCHASTIC_VALUES, FETCH_PREDICTION } from '../actions/index';

const INITIAL_STATE = { weeklyValues: [], monthlyValues:[], predictions: [], evolutions_results: [] };

export default function(state = INITIAL_STATE, action) {
  switch(action.type.type) {
    case ADD_STOCHASTIC_VALUES:
      if (action.type.timeFrame === 1) {
        return { ...state, weeklyValues: action.payload };
      } else {
        return { ...state, monthlyValues: action.payload };
      }
    case FETCH_PREDICTION:
      return { ...state, predictions: action.payload.data.predictions, evolutions_results: action.payload.data.evolutions_results }
    default:
      return state;
  }
}
