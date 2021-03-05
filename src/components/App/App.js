import React from 'react';
import { connect } from 'react-redux';
import ProtectedRoute from '../ProtectedRoute';
import Login from '../Login/Login';
import Dashboard from '../Dashboard/Dashboard';
import './App.css';
import 'antd/dist/antd.css'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { LOGOUT } from './../../features/counter/authSlice';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      collapsed: false
    };
  }

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    const { collapse, collapsed } = this.state
    return (
      <Switch>
        <Route exact path='/login'>
          <Login />
        </Route>
        <ProtectedRoute exact path='/dashboard' component={Dashboard} /> 
      </Switch>
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