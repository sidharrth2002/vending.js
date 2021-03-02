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


// import HomePage from '../HomePage/HomePage';
import Players from '../Players/Players';
import User from '../User/User';
// import CampaignCreatePage from '../Campaign/Create/Create';
import Staff from '../Staff/Staff';
import Customer from '../Customer/Customer';
import Manager from '../Manager/Manager';
import Order from '../Order/Order';
import AssignOrder from '../AssignOrder/AssignOrder';
import UserLog from '../UserLog/UserLog';
import MyTask from '../MyTask/MyTask';
import Home from '../Home/Home';

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
        {isAuthenticated ?
          <Router>
            <Layout>
              <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={broken => {
                  // console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                  // console.log(collapsed, type);
                }}
              >
                <div className="logo" ><h1 style={{color:"white", textAlign:"center"}}>LOGO</h1></div>
                    {this.props.user.role === "admin" ? 
                      <Menu
                      defaultSelectedKeys={['1']}
                      defaultOpenKeys={['sub1']}
                      mode="inline"
                      theme="dark"
                      inlineCollapsed={this.state.collapsed}
                    >
                       <SubMenu title="User" icon={<DashboardOutlined />} >
                          <Menu.Item key="1">
                            <Link to={`/`} activeClassName="active">
                            <span>Manager</span>
                            </Link>
                          </Menu.Item>
                          <Menu.Item key="2">
                            <Link to={`/staff`} activeClassName="active">
                            <span>Staff</span>
                            </Link>
                          </Menu.Item>
                          <Menu.Item key="3">
                            <Link to={`/customer`} activeClassName="active">
                            <span>Customer</span>
                            </Link>
                          </Menu.Item>
                      </SubMenu>
                      <Menu.Item key="4">
                        <Link to={`/order`} activeClassName="active">
                        <FormOutlined />
                          <span>Order</span>
                        </Link>
                      </Menu.Item>
                      <Menu.Item key="5">
                        <Link to={`/assignOrder`} activeClassName="active">
                          <UserOutlined />
                          <span>Assign Order</span>
                        </Link>
                      </Menu.Item>
                      <Menu.Item key="6">
                        <Link to={`/userLog`} activeClassName="active">
                        <HistoryOutlined />
                          <span>Log</span>
                        </Link>
                      </Menu.Item>
                      <Menu.Item key="7">
                        <Link to={`/`} activeClassName="active" forceRefresh={true} onClick={ () => this.props.LOGOUT()}>
                        <LogoutOutlined />
                          <span>Logout{isAuthenticated}</span>
                        </Link>
                      </Menu.Item>
                     </Menu>
                    : this.props.user.role === "manager" ? 
                    <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                    inlineCollapsed={this.state.collapsed}
                  >
                    <SubMenu title="User" icon={<DashboardOutlined />} >
                      <Menu.Item key="1">
                        <Link to={`/`} activeClassName="active">
                        <span>Staff</span>
                        </Link>
                      </Menu.Item>
                      <Menu.Item key="2">
                        <Link to={`/customer`} activeClassName="active">
                        <span>Customer</span>
                        </Link>
                      </Menu.Item>
                    </SubMenu>
                    <Menu.Item key="3">
                      <Link to={`/order`} activeClassName="active">
                      <FormOutlined />
                        <span>Order</span>
                      </Link>
                    </Menu.Item>
                    <Menu.Item key="4">
                      <Link to={`/`} activeClassName="active" forceRefresh={true} onClick={ () => this.props.LOGOUT()}>
                      <LogoutOutlined />
                        <span>Logout{isAuthenticated}</span>
                      </Link>
                    </Menu.Item>
                   </Menu>  
                    :this.props.user.role === "staff" ? 
                    <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                    inlineCollapsed={this.state.collapsed}
                  >
                        <SubMenu title="User" icon={<DashboardOutlined />} >
                        <Menu.Item key="1">
                          <Link to={`/`} activeClassName="active">
                          <span>Customer</span>
                          </Link>
                        </Menu.Item>
                    </SubMenu>
                    <Menu.Item key="2">
                      <Link to={`/myTask`} activeClassName="active">
                      <FormOutlined />
                        <span>My Task</span>
                      </Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                      <Link to={`/`} activeClassName="active" forceRefresh={true} onClick={ () => this.props.LOGOUT()}>
                      <LogoutOutlined />
                        <span>Logout{isAuthenticated}</span>
                      </Link>
                    </Menu.Item>
                   </Menu>  
                    :this.props.user.role === "customer" ? 
                    <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                    inlineCollapsed={this.state.collapsed}
                  >
                    <Menu.Item key="1">
                      <Link to={`/`} activeClassName="active">
                      <DashboardOutlined />
                        <span>Home</span>
                      </Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                      <Link to={`/payment`} activeClassName="active">
                      <FormOutlined />
                        <span>Payment</span>
                      </Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                      <Link to={`/`} activeClassName="active" forceRefresh={true} onClick={ () => this.props.LOGOUT()}>
                      <LogoutOutlined />
                        <span>Logout{isAuthenticated}</span>
                      </Link>
                    </Menu.Item>
                   </Menu> 
                   : ""
                  }              
              </Sider>
              <Layout>
                <Header className="site-layout-sub-header-background" style={{ padding: 0 }} >
                 {this.props.user.role === "admin" ? 
                    <h1 style={{ float: 'right', margin: '0 25px' }} >Admin</h1>
                   : this.props.user.role === "manager" ? 
                   <h1 style={{ float: 'right', margin: '0 25px' }} >Manager</h1>
                   : this.props.user.role === "staff" ? 
                   <h1 style={{ float: 'right', margin: '0 25px' }} >Staff</h1>
                   : this.props.user.role === "customer" ? 
                   <h1 style={{ float: 'right', margin: '0 25px' }} >Customer</h1>
                   : ""
                  }
                  </Header>
                {/* <Breadcrumb className="antd-breadcrumb">
                  <Breadcrumb.Item>Home</Breadcrumb.Item>
                </Breadcrumb> */}

                <Content style={{ margin: '24px 16px 0' }}>
                  <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                    {/* {this.props.children} */}
                    {this.props.user.role === "admin" ? 
                        <Switch>
                        <Route exact path="/">
                          <Manager/>
                        </Route>
                        <Route exact path="/staff">
                          <Staff />
                        </Route>
                        <Route exact path="/customer">
                          <Customer />
                        </Route>
                        <Route exact path="/order">
                          <Order/>
                        </Route>
                        <Route exact path="/assignOrder">
                          <AssignOrder />
                        </Route>
                        <Route exact path="/userLog">
                          <UserLog />
                        </Route>
                        <Route exact path="/campaign/create">
                          {/* <CampaignCreatePage /> */}
                        </Route>
                      </Switch>
                    : this.props.user.role === "manager"?
                    <Switch>
                    <Route exact path="/">
                      <Staff />
                    </Route>
                    <Route exact path="/customer">
                      <Customer />
                    </Route>
                    <Route exact path="/Order">
                      <Order/>
                    </Route>                  
                  </Switch>
                    : this.props.user.role === "staff"?
                    <Switch>
                    <Route exact path="/">
                      {/* customer detail */}
                      <Customer />
                    </Route>
                    <Route exact path="/myTask">
                      {/* my task */}
                      <MyTask/>
                    </Route>                  
                  </Switch>
                    : this.props.user.role === "customer"?
                  <Switch>
                    <Route exact path="/">
                      {/* payment detail */}
                      <Home/>
                      
                    </Route>
                    <Route exact path="/Order">
                      {/* payment */}
                      <Order/>
                    </Route>
                                    
                  </Switch>
                  : ""
                    }
                   
                  </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>C&I Dashboard © 2020</Footer>
              </Layout>
            </Layout>
          </Router>
          :
          <Login />
        }
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