import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { minExpenses } from '../actions';

class WalletList extends React.Component {
  render() {
    const { expenses, deleteExpense } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={ expense.id }>
              <td>{expense.description}</td>
              <td>{expense.tag}</td>
              <td>{expense.method}</td>
              <td>{expense.value}</td>
              <td>{expense.exchangeRates[expense.currency].name.split('/')[0]}</td>
              <td>{(expense.exchangeRates[expense.currency].ask * 1).toFixed(2)}</td>
              <td>
                {(expense.exchangeRates[expense.currency].ask * expense.value).toFixed(2)}
              </td>
              <td>Real</td>
              <td>
                <button
                  type="button"
                >Editar</button>
                <button
                  type="button"
                  data-testid="delete-btn"
                  onClick={({target}) => deleteExpense(Number(target.id))}
                >Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (payload) => dispatch(minExpenses(payload)),
});


export default connect(mapStateToProps, mapDispatchToProps)(WalletList);