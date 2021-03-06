import React from 'react';
import PropTypes from 'prop-types';

class Description extends React.Component {
  render() {
    const { description, handleChange } = this.props;
    return (
      <label htmlFor="description">
        Descrição:
        <input
          id="description"
          name="description"
          value={ description }
          onChange={ handleChange }
        />
      </label>
    );
  }
}

Description.propTypes = {
  description: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Description;
