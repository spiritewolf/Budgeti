const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');

exports.getUser = async (req, res, next) => {
  try{
    const user = await User.findById(req.user.id).select('-password');
    console.log('user is authenticated: ');
    res.status(200).json(user);
  }catch (err) {
    if(err) console.log(err);
    return res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
}
