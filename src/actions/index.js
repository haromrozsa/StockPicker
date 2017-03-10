export const CHART_RENDERED = 'CHART_RENDERED';
export const WEEKLY_CHART_RENDERED = 'WEEKLY_CHART_RENDERED';

export { addStochasticValues, fetchPrediction, deletePrediction,
  ADD_STOCHASTIC_VALUES, FETCH_PREDICTION, DELETE_PREDICTION } from './predictionAction';
export { clickOnSymbol, save, fetchSymbols, fetchWeeklySymbols,
  CLICK_ON_SYMBOL, SAVE_SYMBOLS, FETCH_SYMBOL, FETCH_WEEKLY_SYMBOL } from './stockAction';

export function renderTable(timeFrame, rendered) {

  var timeFrameSig = WEEKLY_CHART_RENDERED;
  if (timeFrame === 2) {
    timeFrameSig = CHART_RENDERED;
  }
  return {
    type: { type: timeFrameSig },
    payload: rendered
  };
}
