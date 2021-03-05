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
import './Dashboard.css'
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const Dashboard = (props) => {
    const [collapsed, setCollapsed] = useState(false);
    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);
    const [data2, setData2] = useState([]);
    const [table1, setTable1] = useState(true);
    const [table2, setTable2] = useState(false);
    const [table3, setTable3] = useState(false);

    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch();
    const accessToken = useSelector(state => state.auth.token);
    const refreshToken = useSelector(state => state.auth.refreshToken);

    const columns1 = [
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

    const columns2 = [
      {
        title: 'Vending Machine Id',
        dataIndex: 'vmId',
        width: 150,
      },
      {
        title: 'Technicians',
        dataIndex: 'technicians',
        width: 150,
      },
      {
        title: 'Service Type',
        dataIndex: 'servtype',
        width: 150,
      },
      {
        title: 'Remarks',
        dataIndex: 'remarks',
      },
      {
        title: 'Deadline',
        dataIndex: 'deadline',
        width: 150,
      }
    ];

    const columns3 = [
      {
        title: 'User Id',
        dataIndex: 'user',
        width: 150,
      },
      {
        title: 'Name',
        dataIndex: 'name',
        width: 175,
      },
      {
        title: 'Email',
        dataIndex: 'email',
        width: 150,
      }
    ]

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

      axios.get('http://localhost:5000/v1/appointment', {
        headers: { Authorization: `Bearer ${accessToken}` 
      }
      })
      .then((res) => {
        if(res.status == 200) {
          let i = 0;
          return res.data.map(entry => ({
            key: i++,
            vmId: entry.vendingMachine,
            technicians: entry.technician,
            servtype: entry.serviceType,
            remarks: entry.remarks,
            deadline: entry.deadline
          }))
        }}
      )
      .then(allentries => {
        setData1(allentries);
      })

      axios.get('http://localhost:5000/v1/users', {
        headers: { Authorization: `Bearer ${accessToken}` 
      }
      })
      .then((res) => {
        if(res.status == 200) {
          let i = 0;
          return res.data.results.map(entry => ({
            key: i++,
            user: entry.id,
            name: entry.name,
            email: entry.email
          }))
        }}
      )
      .then(allentries => {
        console.log(allentries)
        setData2(allentries);
      })

    }, []);

    const table1Setter = (e) => {

      setTable1(e)
      setTable2(false)
      setTable3(false)

    }

    const table2Setter = (e) => {

      setTable2(e)
      setTable3(false)
      setTable1(false)

    }

    const table3Setter = (e) => {

      setTable3(e)
      setTable2(false)
      setTable1(false)

    }

  return (     
    <React.Fragment> 
      <Navbar table1={table1Setter} table2={table2Setter} table3={table3Setter} />
      <Layout>
        <Layout className="site-layout">
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Complaint</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              <Table style={ table1 ? { display: 'block' } : { display: 'none' } } columns={columns1} dataSource={data} pagination={{ pageSize: 50 }} scroll={{ y: 350 }} />
              <Table style={ table2 ? { display: 'block' } : { display: 'none' } } columns={columns2} dataSource={data1} pagination={{ pageSize: 50 }} scroll={{ y: 350 }} />
              <Table style={ table3 ? { display: 'block' } : { display: 'none' } } columns={columns3} dataSource={data2} pagination={{ pageSize: 50 }} scroll={{ y: 350 }} />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>   
    </React.Fragment> 

  );

};

export default Dashboard;