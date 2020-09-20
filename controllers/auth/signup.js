const User = require('../../models/User');
const bcrypt = require('bcryptjs');

exports.signup = async (req, res, next) => {
  try{
    const {username, password} = req.body;
    console.log(req.body);
    if (!username || !password) {
      return res.status(400).json({ error: 'Please enter all fields' });
    }
    const user = await User.findOne({username: username});
    if(user){
      console.log('user exists');
      return res.status(400).json({
        success: false,
        error: 'User already exists'
      });
    }else{
      const newUser = await User.create({username: req.body.username, password: req.body.password});
      console.log('user created');
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) =>{
          if(err){
            res.sendStatus(500);
          }else {
            newUser.password = hash;
            newUser.save();
            res.status(201).json({
              success: true,
              user: {
                id: newUser.id,
                username: newUser.username
              }
            })
          }
        });
      });
    }
  }catch(err){
    console.log('err');
    return res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
}
