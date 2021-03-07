import React from 'react';
import { useState, useEffect } from 'react';
import {  useSelector } from 'react-redux';
import { Layout, Breadcrumb, Table, Modal, Radio} from 'antd';
import axios from 'axios';
import Navbar from '../Navbar/TechNav'
import '../Dashboard/Dashboard.css'
const { Content, Footer } = Layout;

const Technician = props => {

    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [appointId, setAppointId] = useState(0);
    const [status, setStatus] = useState();

    const userId = useSelector(state => state.auth.user.id)
    /* setTechId(userId) */
    /* const dispatch = useDispatch(); */
    const accessToken = useSelector(state => state.auth.token);
    /* const refreshToken = useSelector(state => state.auth.refreshToken); */

    const showModal = (record) => {
      setIsModalVisible(true);
      setAppointId(record.AId)
    };

    const handleCancel = () => {
      setIsModalVisible(false);
    };

    const handleOk = () => {

      let config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      }

      let data = {

        status: status

      }

      axios.post(`${process.env.REACT_APP_API_URL}/v1/appointment/${appointId}`, {
        newStatus: status
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
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
          dataIndex: 'AId',
          width: 150,
        },
        {
          title: 'Complaint Id',
          dataIndex: 'CId',
          width: 150,
        },
        {
          title: 'Technicians Id',
          dataIndex: 'techniciansId',
          width: 150,
        },
        {
          title: 'Vending Id',
          dataIndex: 'vmId',
          width: 150,
        },
        {
          title: 'Technicians',
          dataIndex: 'techniciansName',
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
          width: 350,
        },
        {
          title: 'Deadline',
          dataIndex: 'deadline',
          width: 150,
        },{

          title: "Status",
          dataIndex: "status",
          width: 150,

        },
        {

          title: "Update",
          dataIndex: "button",
          render: (text, record) => (
            <button onClick={()=> showModal(record)}>
              {"Update"}
            </button>
           ),
           width: 150,

        },
        {

          title: "Decline",
          dataIndex: "button",
          render: (text, record) => (
            <button onClick={ () => { decline(record) } } >
              {"Decline"}
            </button>
           ),
           width: 150,

        }
    ];

    const columns1 = [
      {
        title: 'Appointment Id',
        dataIndex: 'AId',
        width: 200,
      },
      {
        title: 'Vending Id',
        dataIndex: 'vmId',
        width: 200,
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
        width: 350,
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

        title: "Take Over",
        dataIndex: "button",
        render: (text, record) => (
          <button onClick={ () => { takeover(record, userId) } } >
            {"Take Over"}
          </button>
         ),
         width: 150,
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
/*             return res.data.map(entry => ({
              key: i++,
              vmId: entry._id,
              technicians: entry.technician.name,
              servtype: entry.serviceType,
              remarks: entry.remarks,
              deadline: entry.deadline,
              status: entry.status
            })) */
            return res.data.map(function(entry, i){

              if(entry.technician.id == userId){

                return {
                  key: entry._id,
                  AId: entry._id,
                  vmId: entry.vendingMachine._id,
                  CId: entry.complaint,
                  techniciansName: entry.technician.name,
                  techniciansId: entry.technician.id,
                  servtype: entry.serviceType,
                  remarks: entry.remarks,
                  deadline: entry.deadline,
                  status: entry.status
                }

              }else{

                return null;

              }

            })
          }}
        )
        .then(allentries => {

          for (var propName in allentries) {
            if (allentries[propName] === null || allentries[propName] === undefined) {
              delete allentries[propName];
            }
          }

          setData(allentries);

        })

        axios.get(`${process.env.REACT_APP_API_URL}/v1/appointment`, {
          headers: { Authorization: `Bearer ${accessToken}` 
        }
        })
        .then((res) => {
          if(res.status == 200) {
            let i = 0;
/*             return res.data.map(entry => ({
              key: i++,
              vmId: entry._id,
              technicians: entry.technician.name,
              servtype: entry.serviceType,
              remarks: entry.remarks,
              deadline: entry.deadline,
              status: entry.status
            })) */

            console.log(res.data)

            return res.data.map(function(entry, i){

              if(entry.technician.id != userId){

                return {
                  key: entry._id,
                  AId: entry._id,
                  vmId: entry.vendingMachine._id,
                  technicians: entry.technician.name,
                  servtype: entry.serviceType,
                  remarks: entry.remarks,
                  deadline: entry.deadline,
                  status: entry.status
                }

              }else{

                return null;

              }

            })

          }}
        )
        .then(allentries => {

          for (var propName in allentries) {
            if (allentries[propName] === null || allentries[propName] === undefined) {
              delete allentries[propName];
            }
          }

          setData1(allentries);
        })
  
      }, []);

    const handleChange = (value) => {
      setStatus(value.target.value)
    }

    const takeover = (value, userId) => {
      let tOConfig = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      }

      let tOData = {
        technicianID : userId,
        appointmentID: value.AId
      }

      axios.post(`${process.env.REACT_APP_API_URL}/v1/appointment/takeover`, tOData, tOConfig )
      .then((res) => {

        if(res.status == 200){

          console.log('Updated')
          window.location.reload(true);

        }else{

          console.log('Cannot Update')

        }

      })

    }

    const decline = (record) => {
      console.log(record)
      axios.post(`${process.env.REACT_APP_API_URL}/v1/appointment`, {
        appointmentID: record.AId
/*         vendingMachineID: record.vmId,
        technicianExclude: record.techniciansId,
        complaintId: record.CId, */
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      .then((res) => {
        if(res.status == 200){

          axios.post(`${process.env.REACT_APP_API_URL}/v1/complaint/${record.CId}`, {

            id: record.CId,
            newStatus: "Unsolved"

          }, {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          })
          .then((res) =>{

            if(res.status == 200){

              console.log('Delete and replaced')
              window.location.reload(true);

            }

          })

        }else{
          console.log('Failed Delete')
        }
      })
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
            <div className="site-layout-background" style={{ padding: 24, minHeight: 400 }}>
              <Table columns={columns} dataSource={data} pagination={{ pageSize: 50 }} scroll={{ y: 250 }} />
              <br></br>
              <Table columns={columns1} dataSource={data1} pagination={{ pageSize: 50 }} scroll={{ y: 250 }} />
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
        <br></br>
      </Modal>

    </React.Fragment> 
    );
};

export default Technician;