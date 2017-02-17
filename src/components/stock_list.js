import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import { clickOnSymbol } from '../actions/index';
import {ExpanderContent} from 'pui-react-expander';
import _ from 'lodash';

class StockList extends Component {
  constructor(props) {
    super(props);
    this.state = {expanded: false};
  }

  showStock = (event) => this.props.clickOnSymbol(event.currentTarget.id);
  //this.props.clickOnSymbol(event.currentTarget.textContent);
  //console.log(event.currentTarget.textContent)

  renderTicker = (tickerData) => <div onClick={this.showStock} key={tickerData.ticker} id={tickerData.ticker}><strong>{tickerData.name}</strong></div>;
  //console.log(tickerData);


  renderDaxComponents() {

    const tickerDAXArray = [
      {ticker: 'ADS.DE', name: 'Adidas' },
      {ticker: 'ALV.DE', name: 'Allianz' },
      {ticker: 'BAS.DE', name: 'Basf' },
      {ticker: 'BAYN.DE', name: 'Bayer' },
      {ticker: 'BEI.DE', name: 'Beiersdorf' },
      {ticker: 'BMW.DE', name: 'BMW' },
      {ticker: 'CBK.DE', name: 'Commerzbank' },
      {ticker: 'CON.DE', name: 'Continental' },
      {ticker: 'DAI.DE', name: 'Daimler' },
      {ticker: 'DB1.DE', name: 'Deutsche Boerse' },
      {ticker: 'DBK.DE', name: 'Deutsche Bank' },
      {ticker: 'DPW.DE', name: 'Deutsche Post' },
      {ticker: 'DTE.DE', name: 'Deutsche Telekom' },
      {ticker: 'EOAN.DE', name: 'E.ON' },
      {ticker: 'FME.DE', name: 'Fresenius Medical Care' },
      {ticker: 'FRE.DE', name: 'Fresenius' },
      {ticker: 'HEI.DE', name: 'HeidelbergCement' },
      {ticker: 'HEN3.DE', name: 'Henkel' },
      {ticker: 'IFX.DE', name: 'Infineon Technologies' },
      {ticker: 'LHA.DE', name: 'Deutsche Lufthansa' },
      {ticker: 'LIN.DE', name: 'Linde' },
      {ticker: 'MRK.DE', name: 'Merck' },
      {ticker: 'MUV2.DE', name: 'Munich Re' },
      {ticker: 'RWE.DE', name: 'RWE' },
      {ticker: 'SAP.DE', name: 'SAP' },
      {ticker: 'SDF.DE', name: 'K+S' },
      {ticker: 'SIE.DE', name: 'Siemens' },
      {ticker: 'TKA.DE', name: 'ThyssenKrupp' },
      {ticker: 'VNA.DE', name: 'Vonovia' },
      {ticker: 'VOW3.DE', name: 'Volkswagen Group' }];

    return(
      <div className="stockList">
        {tickerDAXArray.map(this.renderTicker)}
      </div>
    )
  }

  render() {
    return(
      <div>
      {/*<button className="btn btn-primary" onClick={() => this.setState({expanded: !this.state.expanded})}>
        DAX
      </button>*/}
      <div onClick={() => this.setState({expanded: !this.state.expanded})} className="expander"><strong>DAX</strong></div>
      <ExpanderContent expanded={this.state.expanded}>
        <div className="bg-neutral-2 type-neutral-9">
          {this.renderDaxComponents()}
        </div>
      </ExpanderContent>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ clickOnSymbol }, dispatch);
}

export default connect(null, mapDispatchToProps)(StockList);
