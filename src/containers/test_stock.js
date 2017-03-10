import React, { Component, PropTypes } from 'react';
import { Link} from 'react-router';
import { connect } from 'react-redux';
import _ from 'lodash';
import { format } from 'd3-format';
import {timeFormat} from 'd3-time-format';
import { save, fetchPrediction, clickOnSymbol } from '../actions/index';
import { bindActionCreators} from 'redux';
//import { browserHistory } from 'react-router';
import EvaluationResults from './evaluation_results';

class TestStock extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

componentWillMount() {
  this.props.fetchPrediction(this.props.params.ticker);
}

backToSearch = (event) => {
   //this.props.clickOnSymbol(this.props.params.ticker);
   console.log(this.props.params.ticker);
   console.log("TEST");
   this.props.clickOnSymbol(this.props.params.ticker);
     //.then(() => {
       //this.context.router.push('/');
     //});
}

saveSymbols = (event) => {
 this.props.save(this.props.weekly_symbols, this.props.symbols)
   .then((data) => {
     console.log(data);
   });
}

renderHeader = () => {
   return (
     <thead>
       <tr>
         <th>Key</th>
         <th>Date</th>
         <th>Close</th>
         <th>Open</th>
         <th>High</th>
         <th>Low</th>
         <th>%</th>
         <th>K</th>
         <th>D</th>
         <th>Date</th>
         <th>Close</th>
         <th>Open</th>
         <th>High</th>
         <th>Low</th>
         <th>%</th>
         <th>K</th>
         <th>D</th>
         <th>Status</th>
         <th>Action</th>
       </tr>
     </thead>
   );
 }

 renderStochasticK = (symbol) => {
   if (!symbol.full_STO) {
     return "";
   }
   return format(".2f")(symbol.full_STO.K);
 }

 renderStochasticD = (symbol) => {
   if (!symbol.full_STO) {
     return "";
   }
   return format(".2f")(symbol.full_STO.D);
 }

 renderTestTable = (symbol) => {

   return (
       <tr key={symbol.date}>
         <td>{symbol.key}</td>
         <td>{timeFormat("%Y-%m-%d")(new Date(symbol.date))}</td>
         <td>{format(".2f")(symbol.close)}</td>
         <td>{format(".2f")(symbol.open)}</td>
         <td>{format(".2f")(symbol.high)}</td>
         <td>{format(".2f")(symbol.low)}</td>
         <td>{format(".2f")(symbol.weekly_change)}</td>
         <td>{this.renderStochasticK(symbol)}</td>
         <td>{this.renderStochasticD(symbol)}</td>
         <td>{symbol.monthy_data.weekly_start_date}-{symbol.monthy_data.weekly_end_date}</td>
         <td>{format(".2f")(symbol.monthy_data.weekly_close)}</td>
         <td>{format(".2f")(symbol.monthy_data.weekly_open)}</td>
         <td>{format(".2f")(symbol.monthy_data.weekly_high)}</td>
         <td>{format(".2f")(symbol.monthy_data.weekly_low)}</td>
         <td>{format(".2f")(symbol.monthy_data.monthy_change)}</td>
         <td>{format(".2f")(symbol.monthy_data.monthly_3_smoothed_K)}</td>
         <td>{format(".2f")(symbol.monthy_data.mondthy_3_smoothed_D)}</td>
         <td>{(symbol.status)}</td>
         <td>{(symbol.action)}</td>
       </tr>
   );
}

render() {
    return(
      <div id="testResultTable">
        <div>
        <Link to="/" className="btn btn-primary">
           Back
          </Link>
          <button className="btn btn-secondary" id="saveButton" onClick={() => this.backToSearch()}>Back</button>
        </div>
        <EvaluationResults />
        <div>
          <table className="table table-striped">
            {this.renderHeader()}
            <tbody className="evaluateTable">
              {(_.sortBy(this.props.predictions, ['date'])).map(this.renderTestTable)}
              {/*this.renderTestTable(this.props.predictions)_.reverse*/}
            </tbody>
            {/*this.renderTestTable(this.props.symbols)*/}
          </table>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({save, fetchPrediction, clickOnSymbol}, dispatch);
}

function mapStateToProps({symbols, predictions}) {
  return { predictions: predictions.predictions  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TestStock);
