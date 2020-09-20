import React, {useState, useContext, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {Alert} from 'reactstrap';
import {GlobalContext} from '../context/GlobalState';
import '../format/Style.css';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {auth, error, login} = useContext(GlobalContext);
  let history = useHistory();

  useEffect(() => {
    if(auth){
      console.log('redirecting...');
      history.push("/app");
    }
  }, [auth, history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!username || !password){
      e.preventDefault();
    }else{
      const user = {username: username, password: password};
      login(user);
    }
  }

  return(
    <div className="login-container">
      {(error) ? (
        <div>
          <Alert color="danger">{error}</Alert>
        </div>
      ) : null }
      <h1> Hey girl! Lets get that budget on Track!</h1>
      <div className="login-form">
        <form onSubmit={(e) => handleSubmit(e)} onKeyDown={(e) => {
          if(e.key === "Enter"){
            handleSubmit(e);
          }
        }}>
          <div className="user-box">
            <input onChange={(e) => setUsername(e.target.value)} type="text" id="username" placeholder=" " autoComplete="off" className="form-control-material" required />
            <label htmlFor="username">Please enter a username: </label>
          </div>
          <div className="user-box">
            <input onChange={(e) => setPassword(e.target.value)} type="password" id="password" placeholder=" " autoComplete="off" className="form-control-material" required />
            <label htmlFor="password">Please enter a password: </label>
          </div>
        <button className="loginbtn" type="submit">LogIn</button>
        </form>
        <Link to='/signup'>
          <button type="submit" className="signup-btn">Generate New Account</button>
        </Link>
      </div>
    </div>
  );
}
