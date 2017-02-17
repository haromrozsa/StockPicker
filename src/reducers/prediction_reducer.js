import { ADD_STOCHASTIC_VALUES } from '../actions/index';

const INITIAL_STATE = { weeklyValues: [], monthlyValues:[] };

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
    default:
      return state;
  }
}
