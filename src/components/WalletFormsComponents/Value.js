import React from 'react';
import PropTypes from 'prop-types';

class Value extends React.Component {
  render() {
    const { value, handleChange } = this.props;
    return (
      <label htmlFor="value">
        Valor:
        <input
          id="value"
          name="value"
          value={ value }
          onChange={ handleChange }
        />
      </label>
    );
  }
}

Value.propTypes = {
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Value;
