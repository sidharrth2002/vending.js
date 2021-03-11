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

  if(moneyGoneRemarksInput){

    remarks = moneyGoneRemarksInput.value

  }else if(repairRemarksInput){

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

  }else{

    data = {

      vendingMachine: id,
      serviceType: serviceOptions.value,
      urgency: urgencyInput.value,
      body: remarks,

    }
    
  }

  console.log(data)

  axios.post(`${process.env.REACT_APP_API_URL}/v1/complaint`, data)
  .then((res) =>{

    if(res.status == 200){

      console.log("Post Succeed")

    }else{

      console.log("Post Not Send")

    }

  })

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

const CustomerService = props => {

    const [machine, setMachine] = useState({});
    const [loading, setLoading] = useState(true);

    const [current, setCurrent] = React.useState(0);

    const next = () => {
      setCurrent(current + 1);
    };
  
    const prev = () => {
      setCurrent(current - 1);
    };

    useEffect(() => {
        let id = props.match.params.id;
        console.log(id)
        axios.post(`${process.env.REACT_APP_API_URL}/v1/vendingmachines/${id}`, {
            dummyAuth: 'corneliuspang'
        })
        .then(response => {
            if(response.status == 200) {
                setMachine(response.data);
                setLoading(false);
                console.log(response.data)
            }
        })
    }, [props.match.params.id])

    const steps = [
      {
        // 'Bla bla bla'
        // title: 'bla bla',
        // content: <button onClick={()=>next()}>Dummy Next</button>
        title: 'Talk with the bot!',
        content: <div style={{display: 'flex', minHeight: '100vh', justifyContent: 'center', alignItems: 'center', minWidth: '450px !important'}}>
        {loading ?
        
          'Loading...'  
        
          :
        
          <ChatBot
            steps={[
            {
                id: '1',
                message: `Hi, welcome to Atlas Customer Service. How may I help you today? You are at ${machine.location.address ? machine.location.address : ''}.`,
                trigger: 'serviceOptions',
            },
            {
                id: 'serviceOptions',
                options: [
                    { value: 'Refuelling', label: 'Refueling', trigger: 'refuelItem' },
                    { value: 'Repair', label: 'Repair', trigger: 'repairRemarks' },
                    { value: 'General', label: 'The Vending Machine Ate My Money 😞', trigger: 'moneyGoneRemarks' }
                ]
            },
            {
                id: 'refuelItem',
                message: 'So what item needs to be refilled?',
                trigger: 'refuelItemInput'
            },
            {
                id: 'refuelItemInput',
                user: true,
                trigger: 'refuelItemRemarks'
            },
            {

              id: 'refuelItemRemarks',
              message: "Any remarks on this?",
              trigger: 'refuelItemRemarksInput'

            },
            {

              id: 'refuelItemRemarksInput',
              user: true,
              trigger: 'urgency'

            },
            {
                id: 'repairRemarks',
                message: 'What seems to be the problem? Briefly describe the issue.',
                trigger: 'repairRemarksInput'
            },
            {

              id: "repairRemarksInput",
              user: true,
              trigger: "urgency"

            },
            {
                id: 'moneyGoneRemarks',
                message: 'Sorry to hear that. We will attempt to resolve the matter ASAP. Please enter remarks if any.',
                trigger: 'moneyGoneRemarksInput'
            },
            {

              id: "moneyGoneRemarksInput",
              user: true,
              trigger: "urgency"

            },
            {

              id: "urgency",
              message: "How urgent is it ?",
              trigger: "urgencyInput"

            },
            {

              id: "urgencyInput",
              options: [
                    { value: 'Very Critical', label: 'Very Critical', trigger: 'summary' },
                    { value: 'Critical', label: 'Critical', trigger: 'summary' },
                    { value: 'Normal', label: 'Normal', trigger: 'summary' }
                ]

            },
            {
              id: 'summary',
              component: <Review nextStep={next} id = {props.match.params.id}/>,
              asMessage: true,
            },
            ]}
          />
        }
        
        {/* <Button onClick={() => next()} type="dashed">Submit Complaint</Button> */}

      </div>,
      },
      {
        title: 'Photo Reference',
        content: <FileUploader />,
      },
      // {
      //   title: 'Last',
      //   content: 'Last-content',
      // },
    ];

    return (
    
      <>
        <Steps style={{padding: '20px 100px', display: 'flex'}} current={current}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">{steps[current].content}</div>

        <div className="steps-action" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          {/* {current < steps.length - 1 && (
            <Button type="primary" >
              Next
            </Button>
          )} */}
          {current === steps.length - 1 && (
            <Button style={{maxWidth: '100px'}} type="primary" onClick={() => message.success('Processing complete!')}>
              Done
            </Button>
          )}
          {/* {current > 0 && (
            <Button style={{ margin: '0 8px' }} type="dashed"  onClick={() => prev()}>
              Previous
            </Button>
          )} */}
        </div>
      </>

    );
};


export default CustomerService;