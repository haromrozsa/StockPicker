import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import { fetchSymbols, fetchWeeklySymbols } from '../actions/index';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    var fromDate = new Date();
    fromDate.setFullYear(fromDate.getFullYear() - 1);

    this.state = {
      symbol: '',
      errorClass: '',
      lastSymbol: '',
      sameSymbolWarning: false,
      fromDate: fromDate.toISOString().substring(0, 10),
      toDate: new Date().toISOString().substring(0, 10)};

    this.onInputChange = this.onInputChange.bind(this);
    this.onFromDateChange = this.onFromDateChange.bind(this);
    this.onToDateChange = this.onToDateChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChange(event) {
    this.setState({symbol: event.target.value.toUpperCase()});
  }

  onFromDateChange(event) {
    this.setState({fromDate: event.target.value});
  }

  onToDateChange(event) {
    this.setState({toDate: event.target.value});
  }

  componentWillUpdate(nextProps, nextState) {
    //console.log(nextProps);
  }

  onFormSubmit(event) {
    event.preventDefault();

    if (this.state.symbol === '') {
        this.setState({errorClass: 'has-error'});
    } else {
      this.setState({errorClass: ''});
      if (this.state.lastSymbol === this.state.symbol) {
        this.setState({ sameSymbolWarning: true});
      } else {
        this.props.fetchSymbols(this.state.symbol, this.state.fromDate, this.state.toDate);
        this.props.fetchWeeklySymbols(this.state.symbol, this.state.fromDate, this.state.toDate);
        this.setState({lastSymbol: this.state.symbol, sameSymbolWarning: false});
      }

    }
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit} className="my-input-group form-inline">
        <div className={`form-group ${this.state.errorClass}` }>
          <label>Ticker:</label>
          <input
            id="symbolInput"
            placeholder="Search for symbols"
            className="form-control"
            value={this.state.symbol}
            onChange={this.onInputChange} />
       </div>
      {/* <div className="form-group">
         <label>From:</label>
        <input
            placeholder="From Date"
            className="form-control"
            type="date"
            value={`${this.state.fromDate}`}
            onChange={this.onFromDateChange}/>
        </div>
        <div className="form-group">
          <label>To:</label>
         <input
             placeholder="To Date"
             className="form-control"
             type="date"
             value={`${this.state.toDate}`}
             onChange={this.onToDateChange}/>
         </div>*/}
          <button type="submit" className="btn btn-secondary">Submit</button>
          {this.props.notFound  && <span className="alert alert-danger">Symbol not found. Please add a valid information</span>}
          {this.state.sameSymbolWarning && <span className="alert alert-warning">Same symbol. Please add an other</span>}
      </form>

    );
  }
}

function mapStateToProps({symbols}) {
  return {  notFound: symbols.notFound };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchSymbols, fetchWeeklySymbols }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
