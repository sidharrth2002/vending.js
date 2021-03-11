import React, { Component, useEffect, useState } from 'react';
import { UserOutlined, SolutionOutlined, LoadingOutlined, SmileOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import ChatBot from 'react-simple-chatbot';
import axios from 'axios';
import { Button, Steps, message } from 'antd';

const { Step } = Steps;

function postReq (props) {

  console.log(props)
  let id = props.id
  console.log(id)
  const { steps } = props;
  const { refuelItemRemarksInput, urgencyInput, repairRemarksInput, refuelItemInput, serviceOptions, moneyGoneRemarksInput } = steps;
  let data = {}
  let remarks = ""

  if (moneyGoneRemarksInput) {
    remarks = moneyGoneRemarksInput.value

  } else if(repairRemarksInput){
    remarks = repairRemarksInput.value
  }
  if(refuelItemInput){
    data = {
      vendingMachine: id,
      serviceType: serviceOptions.value,
      urgency: urgencyInput.value,
      body: refuelItemRemarksInput.value,
      itemsToRefill: refuelItemInput.value
    }
  } else{
    data = {
      vendingMachine: id,
      serviceType: serviceOptions.value,
      urgency: urgencyInput.value,
      body: remarks,
    }
  }
  console.log(data)
  let result = await axios.post(`${process.env.REACT_APP_API_URL}/v1/complaint`, data);
    return result.data._id;
}


class Review extends Component {

  constructor(props) {
    super(props);

    this.state = {
      refuelItemInput: 0,
      serviceOptions: 0,
      moneyGoneRemarksInput: 0,
      urgencyInput: 0
    };
  }

  componentDidMount() {
    document.title = 'Vending.js';
  }

  componentWillMount() {
    const { steps } = this.props;
    const { refuelItemRemarksInput, urgencyInput, repairRemarksInput, refuelItemInput, serviceOptions, moneyGoneRemarksInput } = steps;

    this.setState({ refuelItemRemarksInput, urgencyInput, repairRemarksInput, refuelItemInput, serviceOptions, moneyGoneRemarksInput });
  }

  render() {
    const { refuelItemRemarksInput, urgencyInput, repairRemarksInput, refuelItemInput, serviceOptions, moneyGoneRemarksInput  } = this.state;

    return (
      <div style={{ width: '100%' }}>
        <h3 style={{ color: 'white' }}>Summary</h3>
        <ul style={{padding: '0', listStyle: 'none'}}>          
            { refuelItemInput ? <li>{(`Refueling Items : ${refuelItemInput.value}`)}</li> : "" }
            
            { serviceOptions ? <li>{`Service Types Chosen: ${serviceOptions.value}`}</li> : "" }
            
            
            { urgencyInput ? <li>{`Urgency : ${urgencyInput.value}`}</li> : "" }
            
            
            { moneyGoneRemarksInput ? <li>{`Remarks : ${moneyGoneRemarksInput.value}`}</li> : "" }
            
            
              { repairRemarksInput ? <li>{`Remarks : ${repairRemarksInput.value}`}</li> : "" }
            
            
              { refuelItemRemarksInput ? <li>{`Remarks : ${refuelItemRemarksInput.value}`}</li> : "" }
            
              <li>

                <Button onClick={() => this.props.nextStep()} type="dashed">Submit Complaint</Button>

              </li>

            <br></br>


          </ul>
      </div>
    );
  }
}

class FileUploader extends React.Component {
  state = {
    imageUrl: null,
    imageAlt: null
  }

  handleImageUpload = () => {
    const { files } = document.querySelector('input[type="file"]')
    const formData = new FormData();
    formData.append('file', files[0]);
    // replace this with your upload preset name
    formData.append('upload_preset', 'sxfaztga');
    const options = {
      method: 'POST',
      body: formData,
    };
    
    // replace cloudname with your Cloudinary cloud_name
    return fetch('https://api.Cloudinary.com/v1_1/vendingjs/image/upload', options)
      .then(res => res.json())
      .then(res => {
        this.setState({
          imageUrl: res.secure_url,
          imageAlt: `An image of ${res.original_filename}`
        })
      })
      .catch(err => console.log(err));
  }

  render() {
    const { imageUrl, imageAlt } = this.state;

    return (
      <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column', textAlign: 'center'}}>
        <form>
          <input style={{marginBottom: '30px'}} type="file"/>
          <br/>
          <button style={{marginBottom: '30px'}} type="button" className="btn-primary" onClick={this.handleImageUpload}>Submit</button>
        </form>
        {/* <div>{imageUrl}</div> */}
      </div>
    );
  }
}




export default CustomerService;