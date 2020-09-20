import React, {useState, useContext} from 'react';
import {Alert} from 'reactstrap';
import {validate} from '../utils/validate';
import {GlobalContext} from '../context/GlobalState';
import '../format/Style.css';

export const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [errors, setErrors] = useState([]);
  const [show, setShow] = useState(false);
  const {error, signup} = useContext(GlobalContext);

  const handleSubmit = () => {
    validate(username, password, password2, setErrors);
    if(errors.length > 0){
      console.log(errors);
      setErrors([])
    }
    else {
      const newUser = {username: username, password: password}
      signup(newUser);
      if(!errors && !error){
        console.log(error);
        setShow(true);
      }
    }
}

  return (
    <div className="login-container">
      {(show) ? (
        <div>
          <h1>Your account has been created!</h1>
        </div>
      ) :
        (
          <div>
            <div>
              <Alert color="danger">{error}</Alert>
            </div>
            <div>
              <Alert color="danger">{errors}</Alert>
            </div>
          </div>
        )
      }
        <form onSubmit={handleSubmit}>
          <div className="user-box">
            <input onChange={(e) => setUsername(e.target.value)} type="text" id="username" placeholder=" " autoComplete="off" className="form-control-material" required />
            <label htmlFor="username">Enter your username: </label>
          </div>
          <div className="user-box">
            <input onChange={(e) => setPassword(e.target.value)} type="password" id="password" placeholder=" " autoComplete="off" className="form-control-material" required />
            <label htmlFor="password">Enter your password: </label>
          </div>
          <div className="user-box">
            <input onChange={(e) => setPassword2(e.target.value)} type="password" id="password2" placeholder=" " autoComplete="off" className="form-control-material" required />
            <label htmlFor="password2">Re-enter your password: </label>
          </div>
        </form>
          <button onClick={handleSubmit} className="signup-btn">Create My Account</button>
    </div>

  )
}
