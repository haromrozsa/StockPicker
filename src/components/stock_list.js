import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import { clickOnSymbol } from '../actions/index';
import {ExpanderContent} from 'pui-react-expander';
import _ from 'lodash';

class StockList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      dowexpanded: false,
      etfexpanded: false,
      sectorexpanded: false,
      atxexpanded: false};
  }

  showStock = (event) => this.props.clickOnSymbol(event.currentTarget.id);
  //this.props.clickOnSymbol(event.currentTarget.textContent);

  renderTicker = (tickerData) => <div onClick={this.showStock} key={tickerData.ticker} id={tickerData.ticker}><strong>{tickerData.name}</strong></div>;

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

  renderAtxComponents() {

    const tickerATXArray = [
      {ticker: 'ANDR.VI', name: 'Andritz' },
      {ticker: 'BWO.VI', name: 'Buwog' },
      {ticker: 'CAI.VI', name: 'CA Immo' },
      {ticker: 'CWI.VI', name: 'Conwert Immobilien Invest' },
      {ticker: 'DOC.VI', name: 'DO & CO Aktiengesellschaft' },
      {ticker: 'EBS.VI', name: 'Erste Bank' },
      {ticker: 'IIA.VI', name: 'Immofinanz' },
      {ticker: 'LNZ.VI', name: 'Lenzing' },
      {ticker: 'POST.VI', name: 'Oesterreichische Post' },
      {ticker: 'OMV.VI', name: 'OMV' },
      {ticker: 'RBI.VI', name: 'Raiffeisen International' },
      {ticker: 'RHI.VI', name: 'RHI' },
      {ticker: 'SBO.VI', name: 'Schoeller-Bleckmann Oilfield Equipment' },
      {ticker: 'TKA.VI', name: 'Telekom Austria' },
      {ticker: 'UQA.VI', name: 'Uniqa Insurance Group' },
      {ticker: 'VER.VI', name: 'Verbund' },
      {ticker: 'VIG.VI', name: 'Vienna Insurance Group' },
      {ticker: 'VOE.VI', name: 'Voestalpine' },
      {ticker: 'WIE.VI', name: 'Wienerberger' },
      {ticker: 'ZAG.VI', name: 'Zumtobel' }];

    return(
      <div className="stockList">
        {tickerATXArray.map(this.renderTicker)}
      </div>
    )
  }

  renderDowComponents() {

    const tickerDAXArray = [
      {ticker: 'MMM', name: '3M' },
      {ticker: 'AXP', name: 'American Express' },
      {ticker: 'AAPL', name: 'Apple' },
      {ticker: 'BA', name: 'Boeing' },
      {ticker: 'CAT', name: 'Caterpillar' },
      {ticker: 'CVX', name: 'Chevron' },
      {ticker: 'CSCO', name: 'Cisco' },
      {ticker: 'KO', name: 'Coca-Cola' },
      {ticker: 'DIS', name: 'Disney' },
      {ticker: 'DD', name: 'E I du Pont de Nemours and Co' },
      {ticker: 'XOM', name: 'Exxon Mobil' },
      {ticker: 'GE', name: 'General Electric' },
      {ticker: 'GS', name: 'Goldman Sachs' },
      {ticker: 'HD', name: 'Home Depot' },
      {ticker: 'IBM', name: 'IBM' },
      {ticker: 'INTC', name: 'Intel' },
      {ticker: 'JNJ', name: 'Johnson & Johnson' },
      {ticker: 'JPM', name: 'JPMorgan Chase' },
      {ticker: 'MCD', name: 'McDonalds' },
      {ticker: 'MRK', name: 'Merck' },
      {ticker: 'MSFT', name: 'Microsoft' },
      {ticker: 'NKE', name: 'Nike' },
      {ticker: 'PFE', name: 'Pfizer' },
      {ticker: 'PG', name: 'Procter & Gamble' },
      {ticker: 'TRV', name: 'Travelers Companies Inc' },
      {ticker: 'UTX', name: 'United Technologies' },
      {ticker: 'UNH', name: 'UnitedHealth' },
      {ticker: 'VZ', name: 'Verizon' },
      {ticker: 'V', name: 'Visa' },
      {ticker: 'WMT', name: 'Wal-Mart' }];

    return(
      <div className="stockList">
        {tickerDAXArray.map(this.renderTicker)}
      </div>
    )
  }

  renderSectorComponents() {

    const tickerSectorArray = [
      {ticker: 'XLF', name: 'Financial' },
      {ticker: 'XLU', name: 'Utilities' },
      {ticker: 'XLI', name: 'Industrial' },
      {ticker: 'XLE', name: 'Energy' },
      {ticker: 'XLV', name: 'Health Care' },
      {ticker: 'XLK', name: 'Technology' },
      {ticker: 'XLP', name: 'Consumer Staples' },
      {ticker: 'XLB', name: 'Materials' },
      {ticker: 'XLY', name: 'Consumer Discret' }];

    return(
      <div className="stockList">
        {tickerSectorArray.map(this.renderTicker)}
      </div>
    )
  }

  renderETFComponents() {

    const tickerSectorArray = [
      {ticker: 'GLD', name: 'Gold' },
      {ticker: 'TLT', name: 'T-Bond' },
      {ticker: 'MDY', name: 'S&P MidCap 400' },
      {ticker: 'USO', name: 'US Oil' },
      {ticker: 'FEZ', name: 'EURO STOXX 50' },
      {ticker: 'EPP', name: 'Pacific ex Japan' },
      {ticker: 'EEM', name: 'Emerging Markets' },
      {ticker: 'ILF', name: 'Latin America 40' },
      {ticker: 'JPXN', name: 'JPX-Nikkei 400' }];

    return(
      <div className="stockList">
        {tickerSectorArray.map(this.renderTicker)}
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
        <div onClick={() => this.setState({atxexpanded: !this.state.atxexpanded})} className="expander"><strong>ATX</strong></div>
        <ExpanderContent expanded={this.state.atxexpanded}>
          <div className="bg-neutral-2 type-neutral-9">
            {this.renderAtxComponents()}
          </div>
        </ExpanderContent>
        <div onClick={() => this.setState({dowexpanded: !this.state.dowexpanded})} className="expander"><strong>DOW</strong></div>
        <ExpanderContent expanded={this.state.dowexpanded}>
          <div className="bg-neutral-2 type-neutral-9">
            {this.renderDowComponents()}
          </div>
        </ExpanderContent>
        <div onClick={() => this.setState({etfexpanded: !this.state.etfexpanded})} className="expander"><strong>ETF</strong></div>
        <ExpanderContent expanded={this.state.etfexpanded}>
          <div className="bg-neutral-2 type-neutral-9">
            {this.renderETFComponents()}
          </div>
        </ExpanderContent>
        <div onClick={() => this.setState({sectorexpanded: !this.state.sectorexpanded})} className="expander"><strong>SECTOR</strong></div>
        <ExpanderContent expanded={this.state.sectorexpanded}>
          <div className="bg-neutral-2 type-neutral-9">
            {this.renderSectorComponents()}
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
