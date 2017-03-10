import React, { Component } from 'react';
import './App.css';
import SearchBar from './components/search_bar';
import SymbolList from './containers/symbol_list';
import SplitterLayout from 'react-splitter-layout';
import StockList from './components/stock_list';


class App extends Component {

  render() {

    return (
      <div className="App">
        {/*<div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>*/}
        <SplitterLayout secondaryInitialSize={1400}>
          <StockList></StockList>
          <div className="App-intro">
            <SearchBar></SearchBar>
          {/*<div>
            <div className="my-prediction-left"><Predictions></Predictions></div>
            <div className="my-prediction-left"><Predictions></Predictions></div>
          </div>
          <Predictions></Predictions>*/}
          <SymbolList></SymbolList>
        </div>
      </SplitterLayout>

      </div>
    );
  }
}

export default App;
