import React from 'react';
import PropTypes from 'prop-types';

class Method extends React.Component {
  render() {
    const { method, handleChange } = this.props;
    return (
      <label htmlFor="method">
        Método de pagamento:
        <select
          id="method"
          name="method"
          value={ method }
          onChange={ handleChange }
        >
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
      </label>
    );
  }
}

Method.propTypes = {
  method: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Method;
