import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import CandleStickChart from '../lib/CandleStickChart';
import SymbolTable from './symbol_table';


class SymbolList extends Component {

  //componentDidUpdate(prevProps, prevState) {
  //}

  //shouldComponentUpdate(nextProps, nextState) {
  //}

  renderHeader() {
    return (
      <thead>
        <tr>
          <th>Date</th>
          <th>Close</th>
          <th>Open</th>
          <th>High</th>
          <th>Low</th>
          <th>%</th>
          <th>D</th>
          <th>K</th>
        </tr>
      </thead>
    );
  }

  getWeeklyFromDate(shift) {
    var fromDate = new Date();
    fromDate.setFullYear(fromDate.getFullYear() - shift);
    return fromDate;
  }

  render() {
    var type = "svg";

    return (
      <div className="foDiv">
        <div>
          <div className="my-table">
            <table className="table table-striped">
              {this.renderHeader()}
              <SymbolTable
                symbolValues={this.props.weekly_symbols.payload}
                chartRendered={this.props.weeklyChartRendered}
                timeFrame={1}></SymbolTable>
            </table>
          </div>
            <div className="my-table">
            <table className="table table-striped">
              {this.renderHeader()}
              <SymbolTable
                symbolValues={this.props.symbols.payload}
                chartRendered={this.props.chartRendered}
                timeFrame={2}></SymbolTable>
            </table>
          </div>
        </div>
        <div>
          <div className="left-div">
            <CandleStickChart
              data={this.props.weekly_symbols.payload}
              type={type}
              timeFrame={1}
              fromDate={this.getWeeklyFromDate(1)}
              toDate={this.props.weekly_symbols.toDate}>
            </CandleStickChart>
          </div>

        <div className="right-div">
          <CandleStickChart
            data={this.props.symbols.payload}
            type={type}
            timeFrame={2}
            fromDate={this.getWeeklyFromDate(4)}
            toDate={this.props.symbols.toDate}>
          </CandleStickChart>
        </div>
      </div>
    </div>
    );
  }
}

function mapStateToProps({symbols}) {
  return { symbols: symbols.all, weekly_symbols: symbols.weekly, chartRendered: symbols.chartRendered, weeklyChartRendered: symbols.weeklyChartRendered };
}

export default connect(mapStateToProps)(SymbolList);
