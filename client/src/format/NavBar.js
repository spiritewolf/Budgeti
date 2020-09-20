import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {GlobalContext} from '../context/GlobalState';
import './Style.css';

export const NavBar = () => {
  const {auth, user, logout} = useContext(GlobalContext);

  const handleClick = () => {
    logout();
  }
  return(
    <div>
      <nav>
        <ul>
          <li><Link to="/"><p>Home</p></Link></li>
          <li><Link to="/" onClick={handleClick}><p>Logout</p></Link></li>
          {(auth) ? (
            <h1>Welcome, {user.username}!</h1>
          ) : null}
        </ul>
      </nav>
    </div>

  )
}
