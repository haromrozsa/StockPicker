import { CLICK_ON_SYMBOL } from '../actions/index';
import { browserHistory } from 'react-router';

const INITIAL_STATE = { choosedStock: '' };

export default function(state = INITIAL_STATE, action) {
  switch(action.type.type) {
    case CLICK_ON_SYMBOL:
      browserHistory.push('/');
      return { ...state, choosedStock: action.payload };
    default:
      return state;
  }
}
