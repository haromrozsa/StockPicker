import { CLICK_ON_SYMBOL } from '../actions/index';

const INITIAL_STATE = { choosedStock: '' };

export default function(state = INITIAL_STATE, action) {
  //console.log(action);
  switch(action.type.type) {
    case CLICK_ON_SYMBOL:
      //alert(action.payload);
      return { ...state, choosedStock: action.payload };
    default:
      return state;
  }
}
