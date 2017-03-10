import { FETCH_SYMBOL, FETCH_WEEKLY_SYMBOL, CHART_RENDERED, WEEKLY_CHART_RENDERED } from '../actions/index';
import { format } from 'd3-format';
import _ from 'lodash';

const INITIAL_STATE = { all: { payload : [] }, weekly: { payload : [] }, chartRendered: false, weeklyChartRendered: false, notFound: false };

function getDateOneWeekAfter(today) {

  var copiedDate = new Date(today.getTime());
  copiedDate.setDate(copiedDate.getDate()+7);
  return copiedDate;
};

function getDateOneMonthAfter(today) {

  var copiedDate = new Date(today.getTime());
  copiedDate = new Date(copiedDate.getFullYear(), copiedDate.getMonth()+1, 1);
  return copiedDate;
};

function getPrediction(symbol) {
  var prediction = Object.assign({}, _.last(symbol));
  prediction.open = prediction.close;
  prediction.high = format(".2f")(prediction.close * 1.01);
  prediction.low = format(".2f")(prediction.close * 0.99);
  return prediction;
};

function getReturnObject(action, prediction) {

  //console.log(JSON.stringify(action.payload));
  //console.log(action.payload);

  _.map(action.payload, (symbol) => {
    symbol.date = new Date(symbol.date);
    //console.log(symbol.date);
  });

  return {
    //payload : action.payload.data,
    payload : action.payload,
    fromDate: new Date(action.type.fromDate),
    toDate: new Date(prediction.date)
    }
};

export default function(state = INITIAL_STATE, action) {

  //console.log(action);
  //if (action.payload) {
  //  action.payload = action.payload.data;
  //}


  switch(action.type.type) {
    case FETCH_SYMBOL:

      action.payload = action.payload.data;

      if (_.isEmpty(action.payload)) {
        return { ...state, notFound: true };
      }
      //console.log(action);

      var prediction = getPrediction(action.payload);
      prediction.date =  getDateOneMonthAfter(new Date(prediction.date));
      action.payload.push(prediction);
      return { ...state, all: getReturnObject(action, prediction), notFound: false };

    case FETCH_WEEKLY_SYMBOL:

      action.payload = action.payload.data;

      if (_.isEmpty(action.payload)) {
        return { ...state, notFound: true };
      }
      var predictionWeekly = getPrediction(action.payload);
      predictionWeekly.date =  getDateOneWeekAfter(new Date(predictionWeekly.date));
      action.payload.push(predictionWeekly);
      return { ...state, weekly: getReturnObject(action, predictionWeekly) };

    case CHART_RENDERED:
        return { ...state, chartRendered: action.payload };

    case WEEKLY_CHART_RENDERED:
        return { ...state, weeklyChartRendered: action.payload };

    default:
      return state;
  }
}
