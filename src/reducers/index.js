import { combineReducers } from 'redux';
import SymbolsReducer from './reducer_symbols';

const rootReducer = combineReducers({
  symbols: SymbolsReducer,
});

export default rootReducer;
