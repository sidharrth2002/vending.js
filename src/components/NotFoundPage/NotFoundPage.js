import React from 'react';
import { Button } from 'antd';
import './NotFound.css';

const NotFoundPage = () => {
  return (
    <div className="normal">
      <div className="container">
        <h1 className="title">404</h1>
        <p className="desc">Not Found</p>
        <a href="/"><Button type="primary" style={{ marginTop: 5 }}>Return back home</Button></a>
      </div>
    </div>
  );
};

export default NotFoundPage;
