import React, { useEffect} from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import styled from 'styled-components';

import Navbar from './components/layout/Navigation/Navbar';
import Home from './components/layout/Home';

import Login from './containers/auth/Login';
import Register from './containers/auth/Register';

import PrivateRoute from './containers/Routes/PrivateRoute';

import history from './utils/history';
import Dashboard from './containers/dashboard/Dashboard';

import { connect } from 'react-redux';
import { loadUser } from './actions/authActions';

import Spinners from './giphy.gif';

const SpinnerImg = styled.img`
      max-width : 10rem;
      max-height : 10rem;
      position: absolute;
      top: 50%;
      left : 50%;
      transform : translate(-50%,-50%);
`;
const WrapperSpinner =  styled.div`
      position: relative;
      width: 100vw;
      height: 100vh;
`;

function App({ loadUser,isLoading }) {
  useEffect(() => {
    loadUser();
  },[loadUser]);
  return isLoading ? (
    <WrapperSpinner> 
    <SpinnerImg src={Spinners} alt="loading"/>
    </WrapperSpinner>
    ) :(
    <>
    <Router history={history}>
        <Navbar />
        <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/dashboard"  component={Dashboard} />
        <Route render={() => <h1>Not Found 404</h1>} />
        </Switch>
    </Router>
    </>
  );
}

const mapStateToProps = state => ({
  isLoading : state.auth.isLoading
})

export default connect(mapStateToProps, { loadUser })(App);
