import React from "react";
import { scaleTime } from "d3-scale";
import _ from 'lodash';
import { format } from 'd3-format';
import {timeFormat} from 'd3-time-format';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import { renderTable } from '../actions/index';

import { ChartCanvas, Chart, series, coordinates, tooltip, axes, indicator, helper } from "react-stockcharts";

var { CandlestickSeries, StochasticSeries, BollingerSeries   } = series;
var { XAxis, YAxis } = axes;
var { fitWidth } = helper;
var { CrossHairCursor, MouseCoordinateX, MouseCoordinateY } = coordinates;
var { OHLCTooltip, StochasticTooltip, BollingerBandTooltip } = tooltip;

//heikinAshi, renko,
var { stochasticOscillator, macd, bollingerBand  } = indicator;

class CandleStickChart extends React.Component {

  componentDidUpdate(prevProps, prevState) {
    if (_.last(prevProps.data) !== undefined && _.last(this.props.data) !== undefined) {
      if (_.last(prevProps.data).symbol === _.last(this.props.data).symbol) {
          this.props.renderTable(this.props.timeFrame, true);
      } else {
        this.props.renderTable(this.props.timeFrame, false);
      }
    }
  }

	render() {
	    //console.log("33333333333332");
	    //console.log(this.props);
		var { type, data, fromDate, toDate } = this.props;

    //var ha = heikinAshi();

    //var renkoCalculator = renko();

    var fastSTO = stochasticOscillator()
			.windowSize(6)
			.kWindowSize(1)
			.merge((d, c) => {d.fastSTO = c})
			.accessor(d => d.fastSTO);

    var fullSTO = stochasticOscillator()
			.windowSize(6)
			.kWindowSize(3)
			.dWindowSize(3)
			.merge((d, c) => {d.fullSTO = c})
			.accessor(d => d.fullSTO);

    var macdCalculator = macd()
                .fast(20)
                .slow(50)
                .signal(9)
                .merge((d, c) => {d.macd = c;})
                .accessor(d => d.macd);

    var bb = bollingerBand()
                .merge((d, c) => {d.bb = c})
                .accessor(d => d.bb);

    //console.log(data);
    //

    if (_.isEmpty(data)) {
      return < div/>; 
    }

		return (
			<ChartCanvas ratio={200} width={700}  height={700}
					margin={{ left: 50, right: 50, top: 10, bottom: 30 }} type={type}
				    seriesName="MSFT"
					data={data}
					calculator={[fullSTO, fastSTO, macdCalculator, bb]}
					xAccessor={d => d.date} xScale={scaleTime()}
					xExtents={[fromDate, toDate ]}>

				<Chart id={1} height={500} yExtents={[d => [d.high, d.low],  bb.accessor()]}>
					<XAxis axisAt="bottom" orient="bottom" ticks={6}/>
					<YAxis axisAt="left" orient="left" ticks={5} />
          <MouseCoordinateY
						at="right"
						orient="right"
            displayFormat={format(".2f")}/>
					<CandlestickSeries fill={d => d.close === d.open ? "blue" : d.close > d.open ? "#6BA583" : "#FF0000"}/>
          <BollingerSeries calculator={bb} />
          <OHLCTooltip forChart={1} origin={[-40, 0]}/>
          <BollingerBandTooltip origin={[-38, 60]} calculator={bb} />
				</Chart>
        <Chart id={2}
            yExtents={fullSTO.domain()}
            height={125} origin={(w, h) => [0, h - 125]} padding={{ top: 10, bottom: 10 }} >
          <XAxis axisAt="bottom" orient="bottom" ticks={6}/>
					<YAxis axisAt="right" orient="right" ticks={2} tickValues={fullSTO.tickValues()} />

          <MouseCoordinateX
            at="bottom"
            orient="bottom"
            displayFormat={timeFormat("%Y-%m-%d")} />
          <MouseCoordinateY
            at="right"
            orient="right"
            displayFormat={format(".2f")} />

          <StochasticSeries calculator={fullSTO}/>
          <StochasticTooltip calculator={fullSTO} origin={[-38, 15]}>Full STO</StochasticTooltip>
        </Chart>
        <CrossHairCursor />
			</ChartCanvas>
		);
	}
}

CandleStickChart.propTypes = {
	data: React.PropTypes.array.isRequired,
	width: React.PropTypes.number.isRequired,
	ratio: React.PropTypes.number.isRequired,
	type: React.PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

CandleStickChart.defaultProps = {
	type: "svg",
};
CandleStickChart = fitWidth(CandleStickChart);

function mapDispatchToProps(dispatch) {
  return bindActionCreators({renderTable}, dispatch);
}

export default connect(null, mapDispatchToProps)(CandleStickChart);
