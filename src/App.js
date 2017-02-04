import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import yahooFinance from 'yahoo-finance';

class App extends Component {

  getSockData = () => {
      yahooFinance.historical({
      symbol: 'AAPL',
      from: '2012-01-01',
      to: '2012-12-31',
      // period: 'd'  // 'd' (daily), 'w' (weekly), 'm' (monthly), 'v' (dividends only)
    }, function (err, quotes) {
      console.log(quotes);
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button type="button" onClick={this.getSockData}>Click Me!</button>
      </div>
    );
  }
}

export default App;
