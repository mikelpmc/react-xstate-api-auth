import React, { useContext } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import PrivateRoute from './../utils/PrivateRoute';
import Header from './Header/';
import Dashboard from './Dashboard/';
import Landing from './Landing/';
import Login from './Login/';
import Register from './Register/';
import NotFound from './NotFound/';
import { Context } from '../provider';
import { STATES } from '../machine';

const App = () => {
  const { store } = useContext(Context);

  return (
    <div className="App">
      <Header />

      <Switch>
        <Route exact path="/" component={Landing} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <Route
          path="/login"
          render={() => (store.matches(STATES.LOGIN.SUCCESS) ? <Redirect to="/dashboard" /> : <Login />)}
        />
        <Route
          path="/register"
          render={() => (store.matches(STATES.LOGIN.SUCCESS) ? <Redirect to="/dashboard" /> : <Register />)}
        />
        <NotFound />
      </Switch>
    </div>
  );
};

export default App;
