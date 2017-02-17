import { combineReducers } from 'redux';
import SymbolsReducer from './reducer_symbols';
import PredictionReducer from './prediction_reducer';
import StockReducer from './stock_reducer';

const rootReducer = combineReducers({
  symbols: SymbolsReducer,
  predictions: PredictionReducer,
  stock: StockReducer,
});

export default rootReducer;
