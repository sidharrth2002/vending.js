import React from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input, Button, Row, Col, Card } from 'antd';
import { UserOutlined, HeartOutlined, PhoneOutlined } from '@ant-design/icons';
import { LOGIN } from '../../features/counter/authSlice';
import axios from 'axios'
import './Register.css'


export default function Register(){

  const dispatch = useDispatch();
  return (<div>Register</div>);
}