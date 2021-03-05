import React from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input, Button, Row, Col, Card, Checkbox } from 'antd';
import { UserOutlined, HeartOutlined, PhoneOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { LOGIN } from './../../features/counter/authSlice';
import axios from 'axios'
import './Login.css'
import { Redirect } from 'react-router';

import vendingSVG from '../../images/teamwork.png';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 0, span: 16 },
};

const formItemLayout =
{
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
}


export default function Login(props){
  const dispatch = useDispatch();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  async function handleSubmit(e){
    e.preventDefault()
    await axios.post('http://localhost:5000/v1/auth/login', {
      email: email, 
      password: password
    })
    .then(function (res){
      console.log(res)
      dispatch(
        LOGIN({
          access_token : res.data
      })
      )
      console.log('dispatch success')
    })
    .catch((err) => {
      console.log(err);
    })
  }

  return (
    <div className="main-wrapper">
      <div className = "login-wrapper">
      <div className = "left-section">
        <img src={vendingSVG} alt="logo" height="400px" width="300px" />
      </div>
      <div className = "right-section">
          <div className="title-block"> 
            <h2 className="login-title">Login</h2>
          </div>
        <Form
          {...formItemLayout}
          name="basic"
          initialValues={{ remember: true }}
          className = "form"
          onSubmit = {(e) => handleSubmit(e)}
        >
          <Form.Item name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
            <Input placeholder="Email Input" value = {email} onChange = {(e) => setEmail(e.target.value)}/>
          </Form.Item>
          <br></br>
          <Form.Item {...formItemLayout} name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input placeholder="Password Input" value = {password} onChange = {(e) => setPassword(e.target.value)} />
          </Form.Item>
          <Form.Item {...tailLayout} name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" onClick={(e) => handleSubmit(e)}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
    </div>
  );
}