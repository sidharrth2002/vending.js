import React from 'react';
import { connect } from 'react-redux';
// import { Router, IndexRoute, browserHistory } from 'react-router';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Login from '../Login/Login';
import { Menu, Layout, Affix } from 'antd';
import {
  // PieChartOutlined,
  LogoutOutlined,
  HistoryOutlined,
  FormOutlined,
  DashboardOutlined,
  DesktopOutlined,
  ContainerOutlined,
  UserOutlined,
} from '@ant-design/icons';
import './App.css';
import 'antd/dist/antd.css'
import { LOGOUT } from './../../features/counter/authSlice';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      collapse: false
    };
  }

  render() {
    const { isAuthenticated } = this.props;
    // const { user } = this.props;
    // const dispatch = useDispatch();

    // console.log(isAuthenticated)
    return (
      <div>
        ATLAS
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
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