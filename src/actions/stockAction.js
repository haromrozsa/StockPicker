import axios from 'axios';
//import yahooFinance from 'yahoo-finance';

export const FETCH_SYMBOL = 'FETCH_SYMBOL';
export const FETCH_WEEKLY_SYMBOL = 'FETCH_WEEKLY_SYMBOL';
export const CLICK_ON_SYMBOL = 'CLICK_ON_SYMBOL';
export const SAVE_SYMBOLS = 'SAVE_SYMBOLS';

const ROOT_URL = 'http://localhost:3090';

export function clickOnSymbol(choosedStock) {
  console.log("clickOnSymbol");
  console.log(choosedStock);
  return {
    type: { type: CLICK_ON_SYMBOL },
    payload: choosedStock
  };
}

export function save(weeklySymbols, monthlySymbols) {
  //console.log('create Symbols ' + weeklySymbols);
  //console.log(monthlySymbols);
  const request = axios.post(`${ROOT_URL}/save`, { weekly_symbols: weeklySymbols, monthly_symbols: monthlySymbols} );
  return {
    type: SAVE_SYMBOLS,
    payload: request
  };
}

export function fetchSymbols(symbol, fromDate, toDate) {

  const request = axios.post(`${ROOT_URL}/symbol`, { symbol: symbol, from: '2012-01-01', to: toDate, period: 'm'} );

  /*const request = yahooFinance.historical({
    symbol: symbol,
    from: '2012-01-01',
    to: toDate,
    period: 'm'
  });*/

  return {
    type: { type: FETCH_SYMBOL, fromDate: fromDate, toDate: toDate },
    payload: request
  };
}

export function fetchWeeklySymbols(symbol, fromDate, toDate) {

  const request = axios.post(`${ROOT_URL}/symbol`, { symbol: symbol, from: '2013-01-01', to: toDate, period: 'w'} );
  /*const request = yahooFinance.historical({
    symbol: symbol,
    from: '2015-01-01',
    to: toDate,
    period: 'w'
    // period: 'd'  // 'd' (daily), 'w' (weekly), 'm' (monthly), 'v' (dividends only)
  });*/

  return {
    type: { type: FETCH_WEEKLY_SYMBOL, fromDate: fromDate, toDate: toDate },
    payload: request
  };
}
