import React, {useContext, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {GlobalContext} from '../context/GlobalState';
import {Money} from './components/Money';
import {BudgetProgress} from './components/BudgetProgress';
import {Balance} from './components/Balance';
import '../App.css';

export const Dashboard = () => {
  const {user, auth, logout, getUser} = useContext(GlobalContext);
  let history = useHistory();

  useEffect(() => {
    getUser();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(user.username + ' is logged in');

  const handleClick = () => {
    logout();
    history.push("/");
  }

  return (
    <div>
      {(auth) ? (
        <div className="container">
          <Balance />
          <BudgetProgress />
          <Money />
        </div>
      ) : (
        <div className="container">
          <h1>Sorry, you must be logged in to view this page!</h1>
          <button onClick={handleClick}>Take me back home</button>
        </div>
      )}
    </div>
  );
}
