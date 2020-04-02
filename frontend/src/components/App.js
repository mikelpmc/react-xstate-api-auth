import React, { useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Context } from '../provider';
import PrivateRoute from './../utils/PrivateRoute';
import Header from './Header/';
import Dashboard from './Dashboard/';
import Landing from './Landing/';
import Login from './Login/';
import Register from './Register/';
import NotFound from './NotFound/';

const App = () => {
  const { store } = useContext(Context);

  return (
    <div className="App">
      <Header />

      <Switch>
        <Route exact path="/" component={Landing} />
        <PrivateRoute path="/dashboard">
          <Dashboard />
        </PrivateRoute>
        <Route path="/login" render={() => (store.context.isLoggedIn ? <Redirect to="/dashboard" /> : <Login />)} />
        <Route
          path="/register"
          render={() => (store.context.isLoggedIn ? <Redirect to="/dashboard" /> : <Register />)}
        />
        <NotFound />
      </Switch>
    </div>
  );
};

export default App;
