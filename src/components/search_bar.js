import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import { fetchSymbols, fetchWeeklySymbols, clickOnSymbol, save, deletePrediction } from '../actions/index';
import { Link} from 'react-router';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    console.log('constructor called');

    var fromDate = new Date();
    fromDate.setFullYear(fromDate.getFullYear() - 1);

    this.state = {
      symbol: '',
      errorClass: '',
      lastSymbol: '',
      sameSymbolWarning: false,
      evaluteDisabled: true,
      evaluteShow: true,
      fromDate: fromDate.toISOString().substring(0, 10),
      toDate: new Date().toISOString().substring(0, 10)};

    this.onInputChange = this.onInputChange.bind(this);
    this.onFromDateChange = this.onFromDateChange.bind(this);
    this.onToDateChange = this.onToDateChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.showStock = this.showStock.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    //console.log(nextProps);
    //if (nextProps.notFound === true) {
    //  return;
    //}
    if (nextProps.choosedStock !== '') {
      this.setState({symbol: nextProps.choosedStock}, function() {
        //this.props.choosedStock = '';
        this.onFormSubmit();
      });
    }
    //console.log(nextProps);

  }

  componentWillUpdate(nextProps, nextState) {
    //console.log(nextProps.ticker);
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

  showStock(event) {
    this.setState({symbol: 'RWE.DE'}, function() {
      this.onFormSubmit();
    });
    //alert(this.state.symbol);
    //this.onFormSubmit(event);
  }

  onFormSubmit(event) {


    //console.log(event);
    if (event !== undefined) {
      event.preventDefault();
    }
    this.props.clickOnSymbol('');
    //alert(this.state.symbol);

    if (this.state.symbol === '') {
        this.setState({errorClass: 'has-error'});
    } else {
      this.setState({errorClass: ''});
      if (this.state.lastSymbol === this.state.symbol) {
        this.setState({ sameSymbolWarning: true});
      } else {
        //this.props.deletePrediction(this.state.symbol);
        this.props.fetchSymbols(this.state.symbol, this.state.fromDate, this.state.toDate);
        this.props.fetchWeeklySymbols(this.state.symbol, this.state.fromDate, this.state.toDate);
        this.setState({lastSymbol: this.state.symbol, sameSymbolWarning: false, evaluteDisabled: false});

      }

    }
  }

  onInputTest = (event) => {
    alert(this.state.symbol);
  }

  renderTestButton = () => {

    if(this.state.evaluteShow){
        return  <button className="btn btn-success" disabled={this.state.evaluteDisabled} id="testButton" onClick={this.evaluateSymbol}>Evaluate</button>
    }

    return <Link to={"/test/" + this.state.symbol} className="btn btn-success" id="testButton">Show results</Link>
  }

  evaluateSymbol = (event) => {

    event.preventDefault();
    this.setState({evaluteDisabled: true});

    this.props.save(this.props.weekly_symbols, this.props.symbols)
      .then((data) => {
        console.log(data);
        //setTimeout(() => {
            this.setState({evaluteShow: false});
        //}, 11000);

      });
    //event.preventDefault();
    //window.location.href='/test';
  }

  render() {
    return (
      <div>
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
          {/*this.renderTestButton()}
          {/*<button className="btn btn-secondary" disabled={this.state.testDisabled} id="testButton"><Link to="/test">
             Test
          </Link></button>
          <button type="button" className="btn btn-secondary"  onClick={this.onInputTest} disabled={this.state.testDisabled}>Test</button>*/}
          {this.props.notFound  && <span className="alert alert-danger">Symbol not found. Please add a valid information</span>}
          {this.state.sameSymbolWarning && <span className="alert alert-warning">Same symbol. Please add an other</span>}

      </form>
    </div>

    );
  }
}

function mapStateToProps({symbols, stock}) {
  return {  notFound: symbols.notFound, choosedStock: stock.choosedStock, symbols: symbols.all.payload, weekly_symbols: symbols.weekly.payload };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchSymbols, fetchWeeklySymbols, clickOnSymbol, save, deletePrediction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
