import React from 'react';
import { connect } from 'react-redux';
import ProtectedRoute from '../ProtectedRoute';
import Login from '../Login/Login';
import Dashboard from '../Dashboard/Dashboard';
import './App.css';
import 'antd/dist/antd.css'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { LOGIN, LOGOUT, selectIsAuthenticated, selectUser } from './../../features/counter/authSlice';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      collapsed: false
    };
    this.logout = this.logout.bind(this);
  }

  onCollapse(collapsed) {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  logout() {
    LOGOUT();
  }

  render() {
    const user = selectIsAuthenticated(selectUser);
    const { collapse, collapsed } = this.state
    return (
      <div>
        <Switch>
          <Route exact path='/login'>
            <Login />
          </Route>
          <ProtectedRoute exact path='/dashboard' component={Dashboard} />
        </Switch>
      </div>
      );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  token: state.auth.token
});


const mapDispatchToProps = dispatch => {
  return {
    LOGOUT: () => dispatch(LOGOUT()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);