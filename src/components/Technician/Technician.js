import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout, Menu, Breadcrumb, Table, Modal, Radio } from 'antd';
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
import Navbar from '../Navbar/TechNav'
import '../Dashboard/Dashboard.css'
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const Technician = props => {

    const [data, setData] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [appointId, setAppointId] = useState(0);
    const [status, setStatus] = useState();

    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch();
    const accessToken = useSelector(state => state.auth.token);
    const refreshToken = useSelector(state => state.auth.refreshToken);

    const showModal = (record) => {
      setIsModalVisible(true);
      setAppointId(record.vmId)
    };

    const handleCancel = () => {
      setIsModalVisible(false);
    };

    console.log(`access token ` + accessToken)

    const handleOk = () => {
      setIsModalVisible(false);
      console.log(`this is from state` + status)

      let config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      }

      let data = {

        status: status

      }

      axios.patch(`${process.env.REACT_APP_API_URL}/v1/appointment/${appointId}`, data, config )
      .then((res) => {

        if(res.status == 200){

          console.log('Updated')
          setIsModalVisible(false);
          window.location.reload(true);

        }else{

          console.log('Cannot Update')
          setIsModalVisible(false);

        }

      })
    };

    const options = [
      { label: 'Pending', value: 'Pending' },
      { label: 'Ongoing', value: 'Ongoing' },
      { label: 'Completed', value: 'Completed' },
    ];

    const columns = [
        {
          title: 'Appointment Id',
          dataIndex: 'vmId',
          width: 250,
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
        },{

          title: "Status",
          dataIndex: "status",
          width: 150

        },
        {

          title: "Update",
          dataIndex: "button",
          render: (text, record) => (
            <button onClick={()=> showModal(record)}>
              {"Update"}
            </button>
           ),

        }
    ];

    useEffect(() => {
  
        axios.get(`${process.env.REACT_APP_API_URL}/v1/appointment`, {
          headers: { Authorization: `Bearer ${accessToken}` 
        }
        })
        .then((res) => {
          if(res.status == 200) {
            let i = 0;
            console.log(res.data)
            return res.data.map(entry => ({
              key: i++,
              vmId: entry._id,
              technicians: entry.technician.name,
              servtype: entry.serviceType,
              remarks: entry.remarks,
              deadline: entry.deadline,
              status: entry.status
            }))
          }}
        )
        .then(allentries => {
          setData(allentries);
        })
  
      }, []);

    const handleChange = (value) => {

      console.log(value.target.value)
      setStatus(value.target.value)

    }

    return (
    <React.Fragment> 
      <Navbar />
      <Layout>
        <Layout className="site-layout">
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Complaint</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              <Table columns={columns} dataSource={data} pagination={{ pageSize: 50 }} scroll={{ y: 450 }} />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>   

      <Modal title="Update Status" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Radio.Group
            options={options}
            onChange={ (e) => {handleChange(e)} }
            value={options.value}
            optionType="button"
        />
      </Modal>

    </React.Fragment> 
    );
};

export default Technician;