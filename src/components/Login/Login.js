import React from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input, Button, Row, Col, Card } from 'antd';
import { UserOutlined, HeartOutlined, PhoneOutlined } from '@ant-design/icons';
import { LOGINED } from './../../features/counter/authSlice';
import axios from 'axios'
import './Login.css'
import { Redirect } from 'react-router';


export default function Login(){

  const handleSubmit = (values, dispatch) => {
    axios.post('v1/auth/login', {
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

  const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const onSubmit = (e) => {
        console.log(email)
        e.preventDefault();
        axios.post('http://localhost:3001/api/authenticate', {
            email: email,
            password: password
        }).then(response => {
            if (response.status === 200) {
                dispatch(LOGINED(response.data));
                console.log(response.data.token);
                props.history.push('/dashboard');
            } else {
                setError("Incorrect email/password");
                const error = new Error(response.error);
                throw error;
            }
        }).catch(error => {
            console.log(error);
        })
    }

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    if (name === 'email') {
        setEmail(value)
    } else {
        setPassword(value)
    }
  }

  const dispatch = useDispatch();
  return (
    <React.Fragment>
    <h1 className="mb-4">Login</h1>
    <form className="container" onSubmit={onSubmit}>
                {error==="Incorrect email/password" ?
                    <div className="alert alert-danger" role="alert">
                        Incorrect Email/Password
                    </div>
                    :
                    <div></div>
                }
        <div className="row h-100">
        <div className="form-group col-md-6">
            <label for="exampleInputEmail1">Email address</label>
            <input onChange={handleInputChange} name="email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group col-md-6">
            <label for="exampleInputPassword1">Password</label>
            <input onChange={handleInputChange} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
        </div>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
    </form>
    </React.Fragment>
);
}

