import React from 'react';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
    LogoutOutlined
  } from '@ant-design/icons';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { LOGIN, LOGOUT, selectIsAuthenticated, selectUser } from './../../features/counter/authSlice';
import { Layout, Menu, Breadcrumb, Table, Col, Row, Button } from 'antd';
import { useDispatch } from 'react-redux';
const { Header, Content, Footer, Sider } = Layout;

const Navbar = () => {

    const dispatch = useDispatch();

    const logout = (e) => {
        console.log('logout');
        dispatch(LOGOUT());
    }

    return (
        <Header>
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="horizontal">
            <Menu.Item key="1" icon={<PieChartOutlined />}>
                Complaints
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
                Technicians
            </Menu.Item>
            <Menu.Item key="3" icon={<FileOutlined />}>
                Appointments
            </Menu.Item>
            <Button danger onClick={(e) => logout()}>Default</Button>
            </Menu>
        </Header>
    );
};

export default Navbar;