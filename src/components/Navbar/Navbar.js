import React from 'react';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    HeatMapOutlined
  } from '@ant-design/icons';
import { LOGOUT } from './../../features/counter/authSlice';
import { Layout, Menu, Button } from 'antd';
import { useDispatch } from 'react-redux';
const { Header } = Layout;

const Navbar = ({ table1, table2, table3, showMap }) => {

    const dispatch = useDispatch();

    const logout = (e) => {
        console.log('logout');
        dispatch(LOGOUT());
    }

    return (
        <Header>
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="horizontal">
            <Menu.Item key="1" onClick={() => table1(true) } icon={<PieChartOutlined />}>
                Complaints
            </Menu.Item>
            <Menu.Item key="2" onClick={() => table3(true) } icon={<DesktopOutlined />}>
                Technicians
            </Menu.Item>
            <Menu.Item key="3" onClick={() => table2(true) } icon={<FileOutlined />}>
                Appointments
            </Menu.Item>
            <Menu.Item key="4" onClick={() => showMap(true)} icon={<HeatMapOutlined />}>
                Realtime Map
            </Menu.Item>
            <Button style={{marginLeft: '30px'}} danger onClick={(e) => logout()}>Log Out</Button>
            </Menu>
        </Header>
    );
};

export default Navbar;