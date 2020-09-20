const Transaction = require('../../models/Transaction');

exports.getTransactions = async (req, res, next) => {
  try{
    const transaction = await Transaction.find({ user: req.user.id });
    console.log('checkpoint: getting transactions ');
    return res.status(200).json(transaction);
  }catch (err) {
    if(err) console.log(err);
    return res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
}

exports.addTransaction = async (req, res, next) => {
  const {text, amount, category, date} = req.body;
  console.log(date);
  if(!text || ! amount || !category || !date){
    return res.status(400).json({ error: 'Please ensure all values are filled out'});
  }
  try{
    const transaction = await Transaction.create({
      text: text,
      amount: amount,
      date: date,
      category: category,
      user: req.user.id
    });
    console.log('adding transaction for ID: ' + req.user.id);
    return res.status(201).json(transaction);
  } catch(err){
      return res.status(500).json({
        success: false,
        error: 'Server error'
      });
  }
}

exports.deleteTransaction = async (req, res, next) => {
  try{
    const transaction = await Transaction.findById(req.params.id);
    if(!transaction){
      return res.status(404).json({
        success: false,
        error: 'No transaction found'
      });
    }
    if(transaction.user.toString() !== req.user.id) {
      return res.status(401).json({ error: 'Not authorized' });
    }
    console.log('removing transaction');
    await transaction.remove();

    return res.status(200).json({
      success: true,
      data: {}
    });
  }catch(err) {
    return res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
}
