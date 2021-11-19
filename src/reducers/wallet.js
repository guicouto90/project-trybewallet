// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import { SET_WALLET_SUCCESS, SET_EXPENSES, SET_SUM,
  SET_LOADING, SET_CURRENCIES_INFO, MIN_EXPENSES } from '../actions/actionTypes';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  sum: 0,
  isLoading: false,
  currenciesInfo: [],
};

const getWalletResults = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_WALLET_SUCCESS:
    return { ...state,
      currencies: action.payload };

  case SET_EXPENSES:
    return { ...state, expenses: [...state.expenses, action.payload ] };

  case SET_SUM:
    return { ...state, sum: state.sum + action.payload };

  case SET_LOADING:
    return { ...state, isLoading: action.payload };

  case SET_CURRENCIES_INFO:
    return { ...state, currenciesInfo: action.payload };

  case MIN_EXPENSES:
    return { ...state, 
      expenses: state.expenses.filter((expense) => expense.id !== action.payload)
    }

  default:
    return state;
  }
};

export default getWalletResults;
