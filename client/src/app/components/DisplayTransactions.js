import React, {useContext} from 'react';
import {BudgetContext} from '../../context/BudgetState';
import {numberWithCommas} from '../../utils/format';

export const DisplayTransactions = ({transaction}) => {
  const {deleteTransaction} = useContext(BudgetContext);
  const sign = transaction.amount < 0 ? '-': '+';
  const getClass = () => {
    if(transaction.amount <= 0 ){
      return transaction.category
    } else {
      return 'plus'
    }
  }
  return(
    <li className={getClass()}>
       {transaction.date} | {transaction.text} <span>{sign}${numberWithCommas(Math.abs(transaction.amount))}</span>
       <button onClick={() => deleteTransaction(transaction._id)} className="delete-btn">remove</button>
     </li>
  );
}
