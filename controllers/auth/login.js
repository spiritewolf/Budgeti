const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const auth = require('../../middleware/jwtauth');


exports.login = async (req, res, next) => {
  const {username, password} = req.body
  if(!username || !password){
    return res.status(400).json({success: false, error: 'Please fill in required fields.'});
  }
  try{
    const user = await User.findOne({username: username});
    if(!user){
      console.log('error logging in');
      return res.status(400).json({success: false, error: 'We had trouble finding that username, try again!'});
    }
     bcrypt.compare(password, user.password, (err, result) => {
       if(result){
         const token = jwt.sign({id: user._id}, config.get('jwtSecret'), {expiresIn: 3600});
         if(token){
           console.log('logging in...');
           return res.status(200).json({
             token: token,
             user: {
               id: user.id,
               username: user.username
             }
           });
         }
       }
       else{
         console.log('passwords dont match');
         return res.status(400).json({success: false, error: 'Looks like your password may be incorrect!'});
       }
     });
  }catch(err){
    if(err) console.log(err);
    return res.status(404).json({
      success: false,
      error: 'User already exists'
    });
  }
}
