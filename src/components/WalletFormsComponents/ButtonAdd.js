import React from 'react';
import PropTypes from 'prop-types';

class ButtonAdd extends React.Component {
  render() {
    const { submitExpense } = this.props;
    return (
      <button
        type="button"
        onClick={ submitExpense }
      >
        Adicionar despesas
      </button>
    );
  }
}

ButtonAdd.propTypes = {
  submitExpense: PropTypes.func.isRequired,
};

export default ButtonAdd;
