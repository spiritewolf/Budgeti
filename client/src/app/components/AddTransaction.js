import React, {useState, useContext} from 'react';
import Select from 'react-select';
import {BudgetContext} from '../../context/BudgetState';

export const AddTransaction = () => {
  const {addTransaction} = useContext(BudgetContext);
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState([]);

  const handleSubmit = (e) => {
    if(!text || !amount || !category || !date){
      e.preventDefault();
    } else {
      const newTransaction = {text: text, amount: +amount, category: category.value, date: date}
      console.log(newTransaction);
      addTransaction(newTransaction);
    }
    setText('');
    setAmount('');
    setDate('');
  }

  const options = [
    {value: 'income', label: 'Income'},
    {value: 'groceries', label: 'Groceries'},
    {value: 'dining', label: 'Dining Out'},
    {value: 'bill', label: 'Bill'},
    {value: 'pet', label: 'Pet Supplies'},
    {value: 'skincare', label: 'Personal Care'},
    {value: 'nope', label: 'No Buy Day'}
  ]

  return (
    <div className="floaty">
      <h3> Add Transaction </h3>
      <form onSubmit={(e) => {
        e.preventDefault()
        handleSubmit(e)}}>
        <div className="controlling">
          <label htmlFor="date">Date</label>
          <input type="text" value={date} onChange={(e) => setDate(e.target.value)} placeholder="mm/dd/yyy" />
        </div>
        <div className="controlling">
          <label htmlFor="text">Label</label>
          <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Groceries, paycheck, lip filler..." />
        </div>
        <div className="selector">
          <label htmlFor="category">Category </label>
          <Select
            className="selector"
            defaultValue={category}
            onChange={setCategory}
            options={options}
            />
        </div>
        <div className="controlling">
          <label htmlFor="amount">Amount</label>
          <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount..." />
        </div>
        <button type="submit" className="btn" onSubmit={(e) => e.preventDefault()}>Add transaction</button>
      </form>
    </div>
  );
}
