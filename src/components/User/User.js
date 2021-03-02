import React from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Row, Col, Card } from 'antd';
import { message } from 'antd';
import { PhoneOutlined, DribbbleOutlined } from '@ant-design/icons';
import { UPDATE_USER } from './../../features/counter/authSlice';
import axios from 'axios'
import './User.css'
import 'antd/dist/antd.css'
require('dotenv').config();


class User extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      collapse: false,
      project: {}
    };
  }

  componentDidMount() {
    this.indexProject()
  }

  indexProject() {
    axios.post('v1/project', {
      userId: this.props.user.uuid,
    },
      {
        headers: {
          Authorization: 'Bearer ' + this.props.user.Token //the token is a variable which holds the token
        }
      })
      .then((response) => {
        // this.state.project = response.data
        this.setState({ project: response.data[0] })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  updateUser(values) {
    axios.put('v1/user/update', {
      uuid: this.props.user.uuid,
      phone: values.phone,
      website: values.website,
    })
      .then((response) => {
        this.props.UPDATE_USER(response.data)
        this.updateSuccess();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  updateSuccess = () => {
    message.success('Update success');
  };

  updateFailed = () => {
    message.error('Update failed');
  };

  render() {
    const { user } = this.props;

    const username = user.email
    const business_name = user.business_name
    const projectLinkWebsite = process.env.REACT_APP_API_URL + "/v1/game/" + this.state.project.uuid + "/website"
    const projectLinkFacebook = process.env.REACT_APP_API_URL + "/v1/game/" + this.state.project.uuid + "/facebook"

    return (
      <Row type="flex" className="wrapper">
        <Col sm={24} md={16} lg={16}>
          <Card title="My Profile" bordered={true} hoverable={false}>
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{
                // email: user.email,
                // business_name: user.business_name,
                phone: user.phone,
                website: user.website,
              }}
              onFinish={(val) => this.updateUser(val)}
            >
              <p>
                {username}
              </p>
              <p>
                {business_name}
              </p>

              {/* <Form.Item
                name="password"
                // rules={[
                //   {
                //     required: true,
                //     message: 'Enter your password',
                //   },
                // ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item> */}
              {/* <Form.Item
                name="business_name"
                rules={[
                  {
                    required: true,
                    message: 'Enter your business name',
                  },
                ]}
              >
                <Input
                  prefix={<UserSwitchOutlined className="site-form-item-icon" />}
                  placeholder="Business Name"
                />
              </Form.Item> */}
              <Form.Item
                name="website"
                rules={[
                  {
                    required: true,
                    message: 'Enter your website',
                  },
                ]}
              >
                <Input
                  prefix={<DribbbleOutlined className="site-form-item-icon" />}
                  placeholder="Website URL"
                />
              </Form.Item>
              <Form.Item
                name="phone"
                rules={[
                  {
                    required: true,
                    message: 'Enter your phone',
                  },
                ]}
              >
                <Input
                  prefix={<PhoneOutlined className="site-form-item-icon" />}
                  placeholder="Phone"
                />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  Update
                </Button>
              </Form.Item>
            </Form>
          </Card>
          <Card title="How to spread the game?" bordered={true} hoverable={false}>
            <h2>Method 1: Install on website</h2>
            <p>Embbed following code snippet into the below of your website but before body closing tag</p>
            <code>
              {`
              <div id="gamexvx">
                <link src="https://auronex.herokuapp.com/widget.css" />
                <a href="` + projectLinkWebsite + `" id="gamex-float">
                  <img id="gamex-float-img" src="https://auronex.herokuapp.com/rocket.svg" />
                </a>
              </div>`
              }
            </code>
            <h2>Method 2: Spread on Facebook marketing</h2>
            <code>{projectLinkFacebook}</code>
          </Card>
          
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  token: state.auth.token
});


const mapDispatchToProps = dispatch => {
  return {
    UPDATE_USER: (val) => dispatch(UPDATE_USER(val)),

  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User);