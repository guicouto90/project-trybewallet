import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrenciesWithThunk, setCurrenciesInfo, setExpenses,
  setLoading, setSum } from '../actions';
import ButtonAdd from '../components/WalletFormsComponents/ButtonAdd';
import Tag from '../components/WalletFormsComponents/Tag';
import Method from '../components/WalletFormsComponents/Method';
import Description from '../components/WalletFormsComponents/Description';
import Value from '../components/WalletFormsComponents/Value';
import HeaderWallet from '../components/HeaderWallet';
import WalletList from '../components/WalletList';
import Currency from '../components/WalletFormsComponents/Currency';
import { getPlanetsFetch } from '../services/WalletAPI';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.updateCurrencies = this.updateCurrencies.bind(this);
    this.submitExpense = this.submitExpense.bind(this);
    this.sumValue = this.sumValue.bind(this);
  }

  componentDidMount() {
    this.fetchCurrencies();
  }

  componentDidUpdate() {
    const { dispatchisLoading } = this.props;
    let { isLoading } = this.props;
    if (isLoading === true) {
      this.fetchCurrencies();
      isLoading = false;
      dispatchisLoading(isLoading);
    }
  }

  // Alterar dados dos campos Inputs
  handleChange({ target }) {
    this.setState({ [target.name]: target.value });
  }

  // Atualizar o estado local exchangeRates
  updateCurrencies() {
    const { currencies } = this.props;
    this.setState({ exchangeRates: currencies });
  }

  // Soma os valores das despesas
  sumValue() {
    const { value, currency, exchangeRates } = this.state;
    let { sum } = this.props;
    const { dispatchSumValue } = this.props;
    this.updateCurrencies();
    Object.entries(exchangeRates).forEach((rate) => {
      if (rate[0] === currency) {
        sum = Math.round((value * Number(rate[1].ask) * 100)) / 100;
      }
    });
    sum = Math.round((sum) * 100) / 100;
    dispatchSumValue(sum);
  }

  // Executa funcoes quando se clica no botao 'Adicionar despesas'
  submitExpense() {
    const { dispatchSetExpenses, dispatchisLoading } = this.props;
    let { isLoading } = this.props;
    const { id } = this.state;
    isLoading = true;
    dispatchisLoading(isLoading);
    this.setState({ id: id + 1 });
    this.updateCurrencies();
    this.sumValue();
    dispatchSetExpenses(this.state);
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  }

  // Chama a funcao assincrona com API onde atualiza o cambio
  async fetchCurrencies() {
    const { getCurrenciesPayload } = this.props;
    await getCurrenciesPayload();
    this.updateCurrencies();
  }

  render() {
    const { value, description, tag, method, currency } = this.state;
    return (
      <div>
        <HeaderWallet />
        <form>
          <Value value={ value } handleChange={ this.handleChange } />
          <Description description={ description } handleChange={ this.handleChange } />
          <Currency currency={ currency } handleChange={ this.handleChange }/>
          <Method method={ method } handleChange={ this.handleChange } />
          <Tag tag={ tag } handleChange={ this.handleChange } />
          <ButtonAdd submitExpense={ this.submitExpense } />
        </form>
        <div>
          <WalletList />
        </div>
      </div>
    );
  }
}

Wallet.propTypes = {
  currencies: PropTypes.arrayOf({}).isRequired,
  sum: PropTypes.number.isRequired,
  dispatchSetExpenses: PropTypes.func.isRequired,
  dispatchSumValue: PropTypes.func.isRequired,
  dispatchisLoading: PropTypes.func.isRequired,
  getCurrenciesPayload: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  expenses: PropTypes.arrayOf({}).isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  sum: state.wallet.sum,
  isLoading: state.wallet.isLoading,
  currenciesInfo: state.wallet.currenciesInfo,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchSetExpenses: (payload) => dispatch(setExpenses(payload)),
  dispatchSumValue: (payload) => dispatch(setSum(payload)),
  dispatchisLoading: (payload) => dispatch(setLoading(payload)),
  dispatchCurrenciesInfo: (payload) => dispatch(setCurrenciesInfo(payload)),
  getCurrenciesPayload: () => dispatch(fetchCurrenciesWithThunk()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
