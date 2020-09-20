import React, {useContext, useEffect} from 'react';
import {DisplayTransactions} from './DisplayTransactions'
import {AddTransaction} from './AddTransaction';
import {BudgetContext} from '../../context/BudgetState';

export const Money = () => {
  const {getTransactions, transactions} = useContext(BudgetContext);
  useEffect(() => {
    getTransactions();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="float-container">
      <div className="floater">
        <h3>Previous Transactions</h3>
          <div className="overflow">
            <ul className="list">
              {transactions.map(transaction => <DisplayTransactions key={transaction.id} transaction={transaction} />)}
            </ul>
          </div>
      </div>
      <AddTransaction />
    </div>
  );
}
