import React from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input, Button, Row, Col, Card } from 'antd';
import { UserOutlined, HeartOutlined, PhoneOutlined } from '@ant-design/icons';
import { LOGINED } from '../../features/counter/authSlice';
import axios from 'axios'
import './Register.css'


export default function Register(){

  const handleSubmit = (values, dispatch) => {
    axios.post('v1/auth', {
      email: values.email,
      password: values.password
    })
    .then((response) => {
      dispatch(LOGINED(response.data))
    })
    .catch((error) => {
      console.log(error);
    });
  }

  const dispatch = useDispatch();
  return (
    <Row type="flex" justify="space-around" align="middle" className="wrapper">
      <Col sm={24} md={10} lg={6}>
        <Card title="User Register" bordered={true} hoverable={false}>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={(val) => handleSubmit(val, dispatch)}
          >
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Enter your email',
                },
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Password is required',
                },
              ]}
            >
              <Input
                prefix={<PhoneOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            {/* <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
            </Form.Item> */}

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                <HeartOutlined />
                Login
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}