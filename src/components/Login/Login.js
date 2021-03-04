import React from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input, Button, Row, Col, Card } from 'antd';
import { UserOutlined, HeartOutlined, PhoneOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { LOGIN } from './../../features/counter/authSlice';
import axios from 'axios'
import './Login.css'
import { Redirect } from 'react-router';

export default function Login(props){
  const dispatch = useDispatch();

  return (<div></div>);
}

