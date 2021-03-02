import React from 'react';
import { connect } from 'react-redux';
import { Form, Space, Button, Card, Select, Input} from 'antd';
// import { message } from 'antd';
// import { PhoneOutlined, DribbbleOutlined } from '@ant-design/icons';
// import axios from 'axios'
import './Home.css'
import 'antd/dist/antd.css'
require('dotenv').config();
const { Option } = Select;

class Home extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      collapse: false,
      project: {}
    };
  }

 
  
  render() {
     
    return (
        <div>
          <Card className="home-card">
              <Form
              labelCol={{
                span: 10,
              }}
              wrapperCol={{
                span: 14,
              }}
              layout="horizontal">
                <br/>
                <Space direction="vertical" size={10}>
                <Form.Item label="Customer">
                    <Input.Group compact>         
                            <Select className="order-insertion" placeholder="Select Customer"  >
                                <Option value="Pending">Pending</Option>
                                <Option value="Active">Active</Option>
                                <Option value="MIA">MIA</Option>
                                <Option value="In Progress">In Progress</Option>
                                <Option value="Renewal">Renewal</Option>         
                            </Select>
                      </Input.Group>
                 </Form.Item>
                 <Form.Item label="Job Type">
                    <Input.Group compact>         
                          <Select className="order-insertion" placeholder="Select Job Type"  >
                              <Option value="JobA">Job A</Option>
                              <Option value="JobB">Job B</Option>
                              <Option value="JobC">Job C</Option>
                              <Option value="JobD">Job D</Option>
                              <Option value="JobE">Job E</Option>
                          </Select>
                    </Input.Group> 
                 </Form.Item>                  
                 <Form.Item label="Staff In Charges">
                    <Input.Group compact>         
                            <Select className="order-insertion" placeholder="Select Staff In Charges"  >
                                <Option value="Pending">Pending</Option>
                                <Option value="Active">Active</Option>
                                <Option value="MIA">MIA</Option>
                                <Option value="In Progress">In Progress</Option>
                                <Option value="Renewal">Renewal</Option>         
                            </Select>
                      </Input.Group>
                  </Form.Item>
                </Space>       
                  <br/>
                  <br/>
                  <Form.Item style={{margin: "0 130px"}  }>
                    <Button  type="primary">Assign</Button>
                  </Form.Item>
            </Form>
          </Card>
         
     </div>  
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  token: state.auth.token
});


const mapDispatchToProps = dispatch => {
  return {
    // UPDATE_USER: (val) => dispatch(UPDATE_USER(val)),

  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);