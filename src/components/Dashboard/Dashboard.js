import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout, Breadcrumb, Table, Tag, Modal, Radio, Button, message} from 'antd';
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
    const [progressModalVisible, setProgressVisible] = useState(false);

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
        title: 'Date Created',
        dataIndex: 'date',
        width: 150,
      },
      {
        title: 'Remarks',
        dataIndex: 'remarks',
      },
      {

        title: 'Service Type',
        dataIndex: 'serviceType',
        width: 150,

      },
      {
        title: 'Tags',
        /* dataIndex: 'tags', */
        width: 150,
        render: object => renderTagsCell(object),
      },
      {
        title: 'Urgency',
        dataIndex: 'urgency',
        width: 150,
      },
      {
        title: 'Photo',
        dataIndex: 'photoButton',
        render: (text, record) => (
          <Button onClick={ ()=> viewPhoto(record) }>View Photo</Button>
         ),
        width: 150,
      },
      {
        title: "Deal With It",
        dataIndex: "button",
        render: (text, record) => (
          <Button type="primary" onClick={ ()=> deal(record) }>Deal</Button>
         ),
        width: 150,
      },
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
      document.title = 'Vending.js';
      axios.get(`${process.env.REACT_APP_API_URL}/v1/complaint`, {
        headers: { Authorization: `Bearer ${accessToken}` 
      }
      })
      .then((res) => {
        //console.log(res.data)
        if(res.status == 200) {
/*           return res.data.map(entry => ({
            key: i++,
            date: moment(entry.createdAt).format("MM-DD-YYYY HH:mm"),
            remarks: entry.body,
            urgency: entry.urgency,
            vendingMachine: entry.vendingMachine,
            serviceType: entry.serviceType
          })) */

          return res.data.map(function(entry, i){

            var tags = [];

            var tagsFrmRes = entry.photoTags;

            for(var i = 0; i < tagsFrmRes.length; i++){

              tags.push(tagsFrmRes[i].tag)

            }

            if(entry.status == "Unsolved"){

              return {
                key: entry._id,
                date: moment(entry.createdAt).format("MM-DD-YYYY HH:mm"),
                remarks: entry.body,
                urgency: entry.urgency,
                photoUrl: entry.photo,
                tags: tags,
                vendingMachine: entry.vendingMachine,
                serviceType: entry.serviceType
              }

            }else{

              return null;

            }

          })

        }}
      )
      .then(allentries => {

        var filteredEntries = [];

        for (var propName in allentries) {
          if (allentries[propName] === null || allentries[propName] === undefined) {
            delete allentries[propName];
          }else{

            filteredEntries.push(allentries[propName]);

          }
        }
        setData(filteredEntries);
      })

      axios.get(`${process.env.REACT_APP_API_URL}/v1/appointment`, {
        headers: { Authorization: `Bearer ${accessToken}` 
      }
      })
      .then((res) => {
        //console.log(res)
        if(res.status == 200) {
          let i = 0;
          console.log(res.data);
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

    const renderTagsCell = (object) => {  
      var rows = [];

      for(var i=0; i < object.tags.length; i++){
        rows.push( <li> {object.tags[i]} </li> )
      }

      return (
        <>
          <ul>
            { rows }
          </ul>
        </>
      )
    }

    const deal = (record) => {

      let config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      }
      let data = {
        vendingMachineID : record.vendingMachine,
        serviceType: record.serviceType,
        complaintId: record.key
      }

      setProgressVisible(true);
      const deal = message.loading('System Calculating Best Technician', 0)

      axios.post(`${process.env.REACT_APP_API_URL}/v1/appointment/autoappointment`, data, config)
      .then( (res) => {    
        setProgressVisible(false);
        if(res.status == 200){

          setTimeout(deal, 1);
          message.success('Appointment Made !')
          console.log("Appointment Made")
            window.location.reload(true);
        } else {
          setTimeout(deal, 1);
          message.error("Appointment Not Made !!! ");
        }
      })

    }

    const viewPhoto = (record) => {

      window.open(record.photoUrl)

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
      <>
        <Modal title="Basic Modal" visible={progressModalVisible}>
          <p>Server is Calculating...</p>
        </Modal>
      </>
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