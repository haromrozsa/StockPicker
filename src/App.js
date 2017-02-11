import React, { Component } from 'react';
import './App.css';
import SearchBar from './components/search_bar';
import SymbolList from './containers/symbol_list';


class App extends Component {
  componentWillMount() {
      //console.log('this would be a good time to call an action creator');
      //this.props.fetchPosts();
    //  var parseDate = d3.timeParse("%Y-%m-%d %H:%M:%S");
      /*d3["tsv"]("//rrag.github.io/react-stockcharts/data/MSFT.tsv", (err, data) => {
      	data.forEach((d, i) => {
      		//d.date = new Date(d3.timeParse("%Y-%m-%d")(d.date).getTime());
      		d.open = +d.open;
      		d.high = +d.high;
      		d.low = +d.low;
      		d.close = +d.close;
      		d.volume = +d.volume;
      		// console.log(d);
      	});*/
      	/* change the type from hybrid to svg to compare the performance between svg and canvas */
      /*});*/
  }

  render() {

    return (
      <div className="App">
        {/*<div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>*/}
        <div className="App-intro">
          <SearchBar></SearchBar>
          <SymbolList></SymbolList>
          {/*}<CandleStickChart data={data} type={type}></CandleStickChart>*/}
        </div>
      </div>
    );
  }
}

export default App;
