import { ADD_STOCHASTIC_VALUES, FETCH_PREDICTION } from '../actions/index';

const INITIAL_STATE = { weeklyValues: [], monthlyValues:[], predictions: [], evolutions_results: [] };

export default function(state = INITIAL_STATE, action) {
  //console.log(action);
  switch(action.type.type) {
    case ADD_STOCHASTIC_VALUES:
      //alert('itten');
      if (action.type.timeFrame === 1) {
        return { ...state, weeklyValues: action.payload };
      } else {
        return { ...state, monthlyValues: action.payload };
      }
    case FETCH_PREDICTION:
      //console.log(FETCH_PREDICTION);
      //console.log(action.payload.data.evolutions_results);
      return { ...state, predictions: action.payload.data.predictions, evolutions_results: action.payload.data.evolutions_results }
    default:
      return state;
  }
}
