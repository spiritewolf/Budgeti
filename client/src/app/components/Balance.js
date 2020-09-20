import React, {useContext} from 'react';
import {BudgetContext} from '../../context/BudgetState';
import {numberWithCommas} from '../../utils/format';

export const Balance = () => {
  const {transactions} = useContext(BudgetContext);
  const amounts = transactions.map(transaction => transaction.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  return (
    <div>
      <h4>DOLLAS IN THE BANK</h4>
      <h1>{numberWithCommas(total)}</h1>
    </div>
  )
}
