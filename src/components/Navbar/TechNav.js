import React from 'react';
import {
    PieChartOutlined,
  } from '@ant-design/icons';
import { LOGOUT } from './../../features/counter/authSlice';
import { Layout, Menu, Button } from 'antd';
import { useDispatch } from 'react-redux';
const { Header } = Layout;

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
                Appointments
            </Menu.Item>
            <Button danger onClick={(e) => logout()}>Log Out</Button>
            </Menu>
        </Header>
    );
};

export default Navbar;