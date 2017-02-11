import yahooFinance from 'yahoo-finance';

export const FETCH_SYMBOL = 'FETCH_SYMBOL';
export const FETCH_WEEKLY_SYMBOL = 'FETCH_WEEKLY_SYMBOL';
export const CHART_RENDERED = 'CHART_RENDERED';
export const WEEKLY_CHART_RENDERED = 'WEEKLY_CHART_RENDERED';

export function fetchSymbols(symbol, fromDate, toDate) {

  const request = yahooFinance.historical({
    symbol: symbol,
    from: '2012-01-01',
    to: toDate,
    period: 'm'
  });

  return {
    type: { type: FETCH_SYMBOL, fromDate: fromDate, toDate: toDate },
    payload: request
  };
}

export function fetchWeeklySymbols(symbol, fromDate, toDate) {

  const request = yahooFinance.historical({
    symbol: symbol,
    from: '2015-01-01',
    to: toDate,
    period: 'w'
    // period: 'd'  // 'd' (daily), 'w' (weekly), 'm' (monthly), 'v' (dividends only)
  });

  return {
    type: { type: FETCH_WEEKLY_SYMBOL, fromDate: fromDate, toDate: toDate },
    payload: request
  };
}

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
