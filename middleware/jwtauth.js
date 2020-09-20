const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
  const token = req.header('x-auth-token');
  try {
    if (!token){
      console.log('token auth denied');
      return res.status(401).json({success: false,  error: 'No token, authorization denied' });
  }else{
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    // Add user from payload
    console.log('authenticated');
    req.user = decoded;
    next();
  }
} catch (err) {
    if(err) console.log(err);
    res.status(400).json({success: false, error: 'Token is not valid' });
  }
};
