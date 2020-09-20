import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Login} from './app/Login';
import {SignUp} from './app/SignUp';
import {Dashboard} from './app/Dashboard';
import {NavBar} from './format/NavBar';
import {GlobalProvider} from './context/GlobalState';
import {BudgetProvider} from './context/BudgetState';

function App() {
  return (
    <GlobalProvider>
      <BudgetProvider>
        <Router>
        <NavBar />
          <Switch>
            <Route exact path="/" component={Login}/>
            <Route exact path="/signup" component={SignUp}/>
            <Route exact path="/app" component={Dashboard} />
          </Switch>
        </Router>
      </BudgetProvider>
    </GlobalProvider>
  );
}

export default App;
