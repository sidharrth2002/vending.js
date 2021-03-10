import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input, Button, Checkbox, message, Alert } from 'antd';
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
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
  const [redirectAdmin, setRedirectAdmin] = useState(false);
  const [redirectTech, setRedirectTech] = useState(false);
  const [error, showError] = useState(false);

  useEffect(() => {
    document.title = 'Vending.js';
  }, [])

  async function handleSubmit(e){
    e.preventDefault()
    const login = message.loading('Logging In', 0);
    await axios.post(`${process.env.REACT_APP_API_URL}/v1/auth/login`, {
      email: email, 
      password: password
    })
    .then(function (res){
      if(res.status == 200) {
        message.success('Logged In')
        setTimeout(login, 1);
        console.log(res)
        dispatch(
          LOGIN({
            access_token : res.data
        })
        )
        console.log('dispatch success')
        if(res.data.user.role == 'user') {
          setRedirectTech(true);
        } else if(res.data.user.role == 'admin') {
          setRedirectAdmin(true);
        }  
      } else {
        showError('Wrong email/password');
      }
    })
    .catch((err) => {
      message.error('Credentials are wrong')
      console.log(err);
      setTimeout(login, 1);
    })
  }

  if(redirectAdmin) {
    return <Redirect to='/dashboard' />
  } else if(redirectTech) {
    return <Redirect to='/technician' />
  }
  else {
  return (
    <div className="main-wrapper">
      <div className = "login-wrapper">
      <div className = "left-section">
        {/* <img src={vendingSVG} alt="logo" height="300px" width="325px" /> */}
        <h2 className="brand" ><span class="brand-first">Vending</span>.<span className="brand-sec">js</span></h2>
        <br></br>
        <h5 className="tagline">Humanising the vending experience</h5>
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
          {
            error ?
            <Alert message="Wrong Credentials" type="error" />
            :
            ''
          }
          <Form.Item name="email" rules={[{ required: true, message: 'Please input your email.' }]}>
            <Input placeholder="Email Input" value = {email} onChange = {(e) => setEmail(e.target.value)}/>
          </Form.Item>
          <br></br>
          <Form.Item {...formItemLayout} type="password" name="password" rules={[{ required: true, message: 'Please input your password.' }]}>
            <Input placeholder="Password Input" type="password" value = {password} onChange = {(e) => setPassword(e.target.value)}  iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}/>
          </Form.Item>
          <Form.Item {...tailLayout} name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" onClick={(e) => handleSubmit(e)}>
              Let's Go
            </Button>
          </Form.Item>
        </Form>

        <div className="footer">

          <p></p>

        </div>

      </div>
    </div>
    </div>
  );
  }
}