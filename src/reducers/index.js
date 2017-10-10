import { combineReducers } from 'redux';
import SymbolsReducer from './reducer_symbols';
import StockReducer from './stock_reducer';

const rootReducer = combineReducers({
  symbols: SymbolsReducer,
  stock: StockReducer,
});

export default rootReducer;
