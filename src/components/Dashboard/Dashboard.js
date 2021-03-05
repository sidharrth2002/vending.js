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
import Navbar from '../Navbar/Navbar'
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const Dashboard = (props) => {
    const [collapsed, setCollapsed] = useState(false);
    const [data, setData] = useState([]);

    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch();
    const accessToken = useSelector(state => state.auth.token);
    const refreshToken = useSelector(state => state.auth.refreshToken);

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

    useEffect(() => {
      axios.get('http://localhost:5000/v1/complaint', {
        headers: { Authorization: `Bearer ${accessToken}` 
      }
      })
    .then((res) => {
      if(res.status == 200) {
        let i = 0;
        return res.data.map(entry => ({
          key: i++,
          date: entry.createdAt,
          title: entry.body,
          remarks: entry.remarks,
        }))
      }}
    )
    .then(allentries => {
      setData(allentries);
    })  
    }, []);

  return (     
    <React.Fragment> 
      <Navbar />
      <Layout>
        <Layout className="site-layout">
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
    </React.Fragment> 

  );

};

export default Dashboard;