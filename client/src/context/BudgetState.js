import React, { createContext, useReducer } from 'react';
import BudgetReducer from './BudgetReducer';
import axios from 'axios';

// Initial state
const initialState = {
  transactions: [],
  error: [],
  loading: true
}

const tokenConfig = (token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  if (token) {
    config.headers['x-auth-token'] = token;
  }else{
    console.log('no token');
  }

  return config;
}

export const BudgetContext = createContext(initialState);

export const BudgetProvider = ({ children }) => {
  const [state, dispatch] = useReducer(BudgetReducer, initialState);

  async function getTransactions() {
    const token = localStorage.token;
    try {
      const res = await axios.get('/api/transactions', tokenConfig(token));
      dispatch({
        type: 'GET_TRANSACTIONS',
        payload: res.data
      });
    } catch (err) {
      if(err) console.log(err);
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response.data.error
      });
    }
  }
  async function addTransaction(transaction) {
    const token = localStorage.token;
    try {
      const res = await axios.post('/api/transactions', transaction, tokenConfig(token));
      console.log(res.data);
      dispatch({
        type: 'ADD_TRANSACTION',
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response.data.error
      });
    }
  }

  async function deleteTransaction(id) {
    const token = localStorage.token;
    try {
      await axios.delete(`/api/transactions/${id}`, tokenConfig(token));
      dispatch({
        type: 'DELETE_TRANSACTION',
        payload: id
      });
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response.data.error
      });
    }
  }

  return (<BudgetContext.Provider value={{
    transactions: state.transactions,
    error: state.error,
    loading: state.loading,
    getTransactions,
    addTransaction,
    deleteTransaction
  }}>
    {children}
  </BudgetContext.Provider>);
}
