import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout, Menu, Breadcrumb, Table } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { LOGOUT } from '../../features/counter/authSlice';
import axios from 'axios';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const Dashboard = (props) => {
    const user = useSelector(state => state.auth.user)
    const accessToken = useSelector(state => state.auth.token);
    const [collapsed, setCollapsed] = useState(false)
    const dispatch = useDispatch();
    const refreshToken = useSelector(state => state.auth.refreshToken);
    console.log(`access token ` + accessToken);
    const logout = () => {
        // axios.post('http://localhost:5000/v1/auth/logout', {
        //     refreshToken: refreshToken
        // })
        // .then(response => {
        //     if(response.status == 200) {
        //         dispatch(LOGOUT());
        //     }
        // })
        dispatch(LOGOUT());
    }

    const columns = [
      {
        title: 'Title',
        dataIndex: 'title',
        width: 150,
      },
      {
        title: 'Date Created',
        dataIndex: 'date',
        width: 150,
      },
      {
        title: 'Remarks',
        dataIndex: 'remarks',
      },
      {
        title: 'Urgency',
        dataIndex: 'urgency',
        width: 150,
      }
    ];

  const data = [];
  axios.get('http://localhost:5000/v1/complaint', {
      headers: { Authorization: `Bearer ${accessToken}` 
    }
  })
  .then(function (res){

    console.log(res)

    let i = 0;

    res.data.forEach(el => {
      data.push({
        key: i,
        title: el.body,
        date: el.createdAt,
        remarks: el.remarks,
      });
      i++
    });

    console.log(data);

  })
  .catch(function (err){

    console.log(err)

  })

  return (
      
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)}>
        <div className="logo"> 
            Vending.js
        </div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            Complaints
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            Technicians
          </Menu.Item>
          <Menu.Item key="3" icon={<FileOutlined />}>
            Appointments
          </Menu.Item>
          <Menu.Item key="4" icon={<LogoutOutlined />} onClick={() => logout()}>
              Logout
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <Table columns={columns} dataSource={data} pagination={{ pageSize: 50 }} scroll={{ y: 240 }} />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>    

  );

};

export default Dashboard;