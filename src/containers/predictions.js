import React, { Component } from 'react';
import { connect } from 'react-redux';
import { format } from 'd3-format';
import {timeFormat} from 'd3-time-format';
import _ from 'lodash';

class Predictions extends Component {

  renderTableRows(values, type) {
    return(
      <td>{format(".2f")(values.fullSTO[type])}</td>
    );
  }

  renderHeader(values) {
    return(
      <th>{timeFormat("%Y-%m-%d")(values.date)}</th>
    );
  }

  renderPredictionList(symbolList) {

    var weeklyStatus = this.renderPrediction(symbolList.weeklyValues[1]);
    var actualMonthyStatus = this.renderPrediction(symbolList.monthlyValues[1]);
    var beforeMonthlyStatus = this.renderPrediction(symbolList.monthlyValues[2]);
    var actualAction = this.getAction(weeklyStatus, actualMonthyStatus, beforeMonthlyStatus);

    var nextWeeklyStatus = this.renderPrediction(symbolList.weeklyValues[0]);
    var nextMonthlyStatus = this.renderPrediction(symbolList.monthlyValues[0]);
    var predictionStatus = this.getAction(nextWeeklyStatus, nextMonthlyStatus, actualMonthyStatus);

    return(
      <tr key={3}>
        <td></td>
        <td>{weeklyStatus}</td>
        <td>{actualMonthyStatus}</td>
        <td>{beforeMonthlyStatus}</td>
        <td><strong>{actualAction}</strong></td>
        <td>{nextWeeklyStatus}</td>
        <td>{nextMonthlyStatus}</td>
        <td>{actualMonthyStatus}</td>
        <td><strong>{predictionStatus}</strong></td>
      </tr>
    );
  }

  getAction(weeklyStatus, actualMonthyStatus, beforeMonthlyStatus) {

    if (actualMonthyStatus === "LONG" && beforeMonthlyStatus === "LONG") {
      return "LONG HOLD";
    } else if (actualMonthyStatus === "SHORT" && beforeMonthlyStatus === "SHORT") {
      return "SHORT HOLD";
    } else if (actualMonthyStatus === "LONG" && beforeMonthlyStatus === "SHORT") {
      if (weeklyStatus === "LONG") {
        return "BUY";
      } else {
        return "SHORT HOLD";
      }
    } else {
      if (weeklyStatus === "SHORT") {
        return "SELL";
      } else {
        return "LONG HOLD";
      }
    }

  }

  renderPrediction(values) {
    var prediction = '';
    //console.log(values);
    if (values.fullSTO.K >= 80) {
      prediction = "LONG";
    } else if (values.fullSTO.K <= 20) {
      prediction = "SHORT";
    } else {
      if (values.fullSTO.K >= values.fullSTO.D) {
        prediction = "LONG";
      } else {
        prediction = "SHORT";
      }

    }
    return prediction;
  }

  renderTBody() {
    return(
      <tbody className="">
        <tr key={1}>
          <td>K</td>
          {this.renderTableRows(this.props.predictions.weeklyValues[1], 'K')}
          {/*this.renderTableRows(this.props.predictions.weeklyValues[2], 'K')*/}
          {this.renderTableRows(this.props.predictions.monthlyValues[1], 'K')}
          {this.renderTableRows(this.props.predictions.monthlyValues[2], 'K')}
          <td/>
          {this.renderTableRows(this.props.predictions.weeklyValues[0], 'K')}
          {/*this.renderTableRows(this.props.predictions.weeklyValues[2], 'K')*/}
          {this.renderTableRows(this.props.predictions.monthlyValues[0], 'K')}
          {this.renderTableRows(this.props.predictions.monthlyValues[1], 'K')}
          <td/>
        </tr>
        <tr key={2}>
          <td>D</td>
          {this.renderTableRows(this.props.predictions.weeklyValues[1], 'D')}
          {/*this.renderTableRows(this.props.predictions.weeklyValues[2], 'D')*/}
          {this.renderTableRows(this.props.predictions.monthlyValues[1], 'D')}
          {this.renderTableRows(this.props.predictions.monthlyValues[2], 'D')}
          <td/>
          {this.renderTableRows(this.props.predictions.weeklyValues[0], 'D')}
          {/*this.renderTableRows(this.props.predictions.weeklyValues[2], 'D')*/}
          {this.renderTableRows(this.props.predictions.monthlyValues[0], 'D')}
          {this.renderTableRows(this.props.predictions.monthlyValues[1], 'D')}
          <td/>
        </tr>
        {this.renderPredictionList(this.props.predictions)}
      </tbody>
    );
  }

  render() {
    if (_.isEmpty(this.props.predictions.monthlyValues) || _.isEmpty(this.props.predictions.weeklyValues)) {
      return(
        <div></div>
      );
    } else {
      return (
        <div className="">
          <table className="my-prediction-table  table table-striped">
          <thead>
            <tr>
              <th></th>
              {this.renderHeader(this.props.predictions.weeklyValues[1])}
              {/*this.renderHeader(this.props.predictions.weeklyValues[2])*/}
              {this.renderHeader(this.props.predictions.monthlyValues[1])}
              {this.renderHeader(this.props.predictions.monthlyValues[2])}
              <th/>
              {this.renderHeader(this.props.predictions.weeklyValues[0])}
              {this.renderHeader(this.props.predictions.monthlyValues[0])}
              {this.renderHeader(this.props.predictions.monthlyValues[1])}
            </tr>
          </thead>
            {this.renderTBody()}
          </table>
        </div>
      );
    }
  }
}

function mapStateToProps({predictions}) {
  return { predictions: predictions };
}

export default connect(mapStateToProps)(Predictions);
