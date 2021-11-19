import React from 'react';
import PropTypes from 'prop-types';
import { connect} from 'react-redux';

class Currency extends React.Component {
  constructor() {
    super();

    this.renderCurrency = this.renderCurrency.bind(this);
  }

  renderCurrency() {
    const { currencies, currency, handleChange } = this.props;
    const selectCur = [];
    Object.entries(currencies).map((currencie) => {
      if (currencie[0] !== 'USDT') {
        selectCur.push(currencie[0]);
        return selectCur;
      }
      return selectCur;
    });
    return (
      <label htmlFor="currency">
        Moeda:
        <select
          id="currency"
          name="currency"
          value={ currency }
          onChange={ handleChange }
        >
          {selectCur.map((curr) => <option key={ curr }>{ curr }</option>)}
        </select>
      </label>
    );
  }

  render() {
    return (
      <span>
        { this.renderCurrency()}
      </span>
      
    );
  }
}

Currency.propTypes = {
  currency: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});


export default connect(mapStateToProps)(Currency);