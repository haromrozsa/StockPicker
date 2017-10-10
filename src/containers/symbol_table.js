import React, { Component } from 'react';
import _ from 'lodash';
import { format } from 'd3-format';
import {timeFormat} from 'd3-time-format';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import {addStochasticValues} from '../actions';

class SymbolTable extends Component {
  constructor(props) {
    super(props);

    this.renderWeather = this.renderWeather.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (_.last(this.props.symbolValues) !== undefined && _.last(this.props.symbolValues).fullSTO !== undefined) {
      return true;
    }

    return false;
  }

  componentDidUpdate(prevProps, prevState) {
    this.props.addStochasticValues(_.reverse(_.takeRight(this.props.symbolValues, 3)), this.props.timeFrame);
    //_.reverse(_.takeRight(this.props.symbolValues, 3)).map((symbol) => {
    //});
  }

  renderWeather(symbol) {
    return (
        <tr key={symbol.date}>
          <td>{timeFormat("%Y-%m-%d")(symbol.date)}</td>
          <td>{symbol.close}</td>
          <td>{symbol.open}</td>
          <td>{symbol.high}</td>
          <td>{symbol.low}</td>
          <td>{format(".2f")(100*(symbol.close - symbol.open)/symbol.open)}</td>
          <td>{format(".2f")(symbol.fullSTO.D)}</td>
          <td>{format(".2f")(symbol.fullSTO.K)}</td>
        </tr>
    );
  }

  render() {
    if (_.last(this.props.symbolValues) === undefined || _.last(this.props.symbolValues).fullSTO === undefined) {
      return(
        <tbody className="my-table-padding">
        </tbody>
      );
    } else {
      return (
        <tbody className="my-table-padding">
          {(_.reverse(_.takeRight(this.props.symbolValues, 5))).map(this.renderWeather)}
        </tbody>
      );
    }
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({addStochasticValues}, dispatch);
}

export default connect(null, mapDispatchToProps)(SymbolTable);
