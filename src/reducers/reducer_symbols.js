import { FETCH_SYMBOL, FETCH_WEEKLY_SYMBOL, CHART_RENDERED, WEEKLY_CHART_RENDERED } from '../actions/index';
import { format } from 'd3-format';
import _ from 'lodash';

const INITIAL_STATE = { all: { payload : [] }, weekly: { payload : [] }, chartRendered: false, weeklyChartRendered: false };

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
  return {
    payload : action.payload,
    fromDate: action.type.fromDate,
    toDate: prediction.date
    }
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type.type) {
    case FETCH_SYMBOL:
      var prediction = getPrediction(action.payload);
      prediction.date =  getDateOneMonthAfter(prediction.date);
      action.payload.push(prediction);
      return { ...state, all: getReturnObject(action, prediction) };

    case FETCH_WEEKLY_SYMBOL:
      var predictionWeekly = getPrediction(action.payload);
      predictionWeekly.date =  getDateOneWeekAfter(predictionWeekly.date);
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
