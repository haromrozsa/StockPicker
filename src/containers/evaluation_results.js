import React, { Component } from 'react';
import { connect } from 'react-redux';
import { format } from 'd3-format';


class EvaluationResults extends Component {

  render() {
    return (
      <div>
        <strong className="evaluationResults">STOCHASTIC: { format(".2f")(this.props.percentage.percentage )}</strong>
        {/*<strong className="evaluationResults">NEXT STOCHASTIC: {format(".2f")(this.props.percentage.nextPercentage)}</strong>*/}
        <strong className="evaluationResults">BUY-AND-HOLD: {format(".2f")(this.props.percentage.buyandHold)}</strong>

      </div>

    );
  }

}

function mapStateToProps({predictions}) {
  return { percentage: predictions.evolutions_results };
}

export default connect(mapStateToProps)(EvaluationResults);
