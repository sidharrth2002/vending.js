import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout, Breadcrumb, Table, Modal, Radio, Button} from 'antd';
import axios from 'axios';
import Navbar from '../Navbar/Navbar'
import Map from '../Map/Map'
import './Dashboard.css'
import moment from 'moment';

const { Content, Footer  } = Layout;
moment().format(); 
const Dashboard = (props) => {
    const [collapsed, setCollapsed] = useState(false);
    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);
    const [data2, setData2] = useState([]);
    const [table1, setTable1] = useState(true);
    const [table2, setTable2] = useState(false);
    const [table3, setTable3] = useState(false);
    const [map, showMap] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [appointId, setAppointId] = useState(0);
    const [status, setStatus] = useState();

    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch();
    const accessToken = useSelector(state => state.auth.token);
    const refreshToken = useSelector(state => state.auth.refreshToken);

    const options = [
      { label: 'Pending', value: 'Pending' },
      { label: 'Ongoing', value: 'Ongoing' },
      { label: 'Completed', value: 'Completed' },
    ];

    const columns1 = [
      {
        title: 'Title',
        dataIndex: 'title',
        width: 450,
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
        title: 'Vending Machine Address',
        dataIndex: 'vmId',
        width: 350,
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
      },
      {
        title: 'Status',
        dataIndex: 'status',
        width: 150,
      }
    ];

    const columns3 = [
      {
        title: 'No.',
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
      axios.get(`${process.env.REACT_APP_API_URL}/v1/complaint`, {
        headers: { Authorization: `Bearer ${accessToken}` 
      }
      })
      .then((res) => {
        if(res.status == 200) {
          let i = 0;
          return res.data.map(entry => ({
            key: i++,
            date: moment(entry.createdAt).format("MM-DD-YYYY HH:mm"),
            title: entry.body,
            remarks: entry.remarks,
            urgency: entry.urgency
          }))
        }}
      )
      .then(allentries => {
        setData(allentries);
      })

      axios.get(`${process.env.REACT_APP_API_URL}/v1/appointment`, {
        headers: { Authorization: `Bearer ${accessToken}` 
      }
      })
      .then((res) => {
        //console.log(res)
        if(res.status == 200) {
          let i = 0;
          return res.data.map(entry => ({
            key: i++,
            vmId: entry.vendingMachine.location.address,
            technicians: entry.technician.name,
            servtype: entry.serviceType,
            remarks: entry.remarks,
            deadline: moment(entry.deadline).format("MM-DD-YYYY HH:mm"),
            status: entry.status
          }))
        }}
      )
      .then(allentries => {
        //console.log(allentries)
        setData1(allentries);
      })

      axios.get(`${process.env.REACT_APP_API_URL}/v1/users`, {
        headers: { Authorization: `Bearer ${accessToken}` 
      }
      })
      .then((res) => {
        if(res.status == 200) {
          let i = 0;
          return res.data.results.map(entry => ({
            key: i++,
            user: i,
            name: entry.name,
            email: entry.email
          }))
        }}
      )
      .then(allentries => {
        setData2(allentries);
      })
    }, []);

    const table1Setter = (e) => {
      setTable1(e)
      setTable2(false)
      setTable3(false)
      showMap(false)
    }

    const table2Setter = (e) => {
      setTable2(e)
      setTable3(false)
      setTable1(false)
      showMap(false)
    }

    const table3Setter = (e) => {
      setTable3(e)
      setTable2(false)
      setTable1(false)
      showMap(false)
    }

    const mapShow = (e) => {
      showMap(e)
      setTable1(false)
      setTable2(false)
      setTable3(false)
    }

    const showModal = (record) => {
      setIsModalVisible(true);
      setAppointId(record.vmId)
    };

    const deal = (record) => {

      let config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      }

      let data = {

        vendingMachineId : record.vmId,
        

      }

    }

    const handleOk = () => {
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

  return (     
    <React.Fragment> 
      <Navbar table1={table1Setter} table2={table2Setter} table3={table3Setter} showMap={mapShow}/>
      <Layout>
        <Layout className="site-layout">
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Complaint</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              <Table style={ table1 ? { display: 'block' } : { display: 'none' } } columns={columns1} dataSource={data} pagination={{ pageSize: 5 }} scroll={{ y: 350 }} />
              <Table style={ table2 ? { display: 'block' } : { display: 'none' } } columns={columns2} dataSource={data1} pagination={{ pageSize: 5 }} scroll={{ y: 350 }} />
              <Table style={ table3 ? { display: 'block' } : { display: 'none' } } columns={columns3} dataSource={data2} pagination={{ pageSize: 5 }} scroll={{ y: 350 }} />
              {map ?
                <Map />
                :
                ''
              }
            </div>
          </Content>
          <Footer style={{ textAlign: 'center', margin: '0px' }}>
            <span>Built with ❤️ by Sid, Shaun and Cornelius<br/></span>
            <span>All Rights Reserved<br/></span>
            <span>Vending.js powered by Node.js, React.js, MongoDB and distancematrix.ai<br/></span>
            UI Components by Ant Design
          </Footer>
        </Layout>
      </Layout>   

    </React.Fragment> 

  );

};

export default Dashboard;