import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';

// Initial state
const initialState = {
  user: [],
  token: localStorage.getItem('token'),
  auth: false,
  transactions: [],
  error: [],
  loading: false
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

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  async function getUser(userData) {
    const tkn = localStorage.token;
    await dispatch({type: 'USER_LOADING'});
    try{
      const res = await axios.get('/api/dashboard', tokenConfig(tkn));
      console.log('getting user ');
      dispatch({
        type: 'USER_LOADED',
        payload: res.data
      });
    }catch(err){
      if(err) console.log(err);
      dispatch({
        type: 'AUTH_ERROR'
      });
    }
  }

  async function signup(user) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const res = await axios.post('/api/users/signup', user, config);
      dispatch({
        type: 'POST_SIGNUP',
        payload: res.data
      });
    } catch (err) {
      if(err) console.log(err);
      dispatch({
        type: 'SIGNUP_ERROR',
        payload: err.response.data.error
      });
    }
  }

  async function login(users) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const res = await axios.post('/api/users/login', users, config);
      console.log('logging in');
      dispatch({
        type: 'POST_LOGIN',
        payload: res.data
      });
    
    } catch (err) {
      if(err) console.log(err);
      dispatch({
        type: 'LOGIN_ERROR',
        payload: err.response.data.error
      });
    }
  }
  async function logout() {
    try{
      console.log('user logged out');
      dispatch({
        type: 'GET_LOGOUT'
      });
    }catch(err){
      if(err) console.log(err);
      dispatch({
        type: 'LOGOUT_ERROR',
        payload: err.response.data.error
      });
    }

  }

  return (<GlobalContext.Provider value={{
    user: state.user,
    auth: state.auth,
    token: state.token,
    transactions: state.transactions,
    error: state.error,
    loading: state.loading,
    signup,
    login,
    logout,
    getUser
  }}>
    {children}
  </GlobalContext.Provider>);
}
