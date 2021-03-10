import React, { Component, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ChatBot from 'react-simple-chatbot';
import axios from 'axios';
import { Button } from 'antd';

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
        <h3>Summary</h3>
        <table>
          <tbody>
          
            <tr>
              { refuelItemInput ? `<td>`+`Refueling Items : `+`</td>`+`
              <td>`+`${refuelItemInput.value}`+`</td>` : "" }
            </tr>
            <tr>
            { serviceOptions ? `<td>`+`Service Types Chosen : `+`</td>`+`
              <td>`+`${serviceOptions.value}`+`</td>` : "" }
            </tr>
            <tr>
            { urgencyInput ? `<td>`+`Urgency : `+`</td>`+`
              <td>`+`${urgencyInput.value}`+`</td>` : "" }
            </tr>
            <tr>
            { moneyGoneRemarksInput ? '<td>'+`Remarks : `+`</td>`+`
              <td>`+`${moneyGoneRemarksInput.value}`+`</td>` : "" }
            </tr>
            <tr>
              { repairRemarksInput ? '<td>'+`Remarks : `+`</td>`+`
              <td>`+`${repairRemarksInput.value}`+`</td>` : "" }
            </tr>
            <tr>
              { refuelItemRemarksInput ? '<td>'+`Remarks : `+`</td>`+`
              <td>`+`${refuelItemRemarksInput.value}`+`</td>` : "" }
            </tr>

            <br></br>

            <tr>

              <Button onClick={ () => {postReq(this.props)} } type="dashed">Submit Complaint</Button>

            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

const CustomerService = props => {

    const [machine, setMachine] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let id = props.match.params.id;
        axios.post(`${process.env.REACT_APP_API_URL}/v1/vendingmachines/${id}`, {
            dummyAuth: 'corneliuspang'
        })
        .then(response => {
            if(response.status == 200) {
                setMachine(response.data);
                setLoading(false);
            }
        })
    }, [props.match.params.id])

    return (
    <div style={{display: 'flex', minHeight: '100vh', justifyContent: 'center', alignItems: 'center', minWidth: '450px !important'}}>
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
              component: <Review id = {props.match.params.id}/>,
              asMessage: true,
            },
            //   {
            //     id: 'name',
            //     user: true,
            //     trigger: '3',
            //   },
            //   {
            //     id: '3',
            //     message: 'Hi {previousValue}! What is your gender?',
            //     trigger: 'gender',
            //   },
            //   {
            //     id: 'gender',
            //     options: [
            //       { value: 'male', label: 'Male', trigger: '5' },
            //       { value: 'female', label: 'Female', trigger: '5' },
            //     ],
            //   },
            //   {
            //     id: '5',
            //     message: 'How old are you?',
            //     trigger: 'age',
            //   },
            //   {
            //     id: 'age',
            //     user: true,
            //     trigger: '7',
            //     validator: (value) => {
            //       if (isNaN(value)) {
            //         return 'value must be a number';
            //       } else if (value < 0) {
            //         return 'value must be positive';
            //       } else if (value > 120) {
            //         return `${value}? Come on!`;
            //       }

            //       return true;
            //     },
            //   },
            //   {
            //     id: '7',
            //     message: 'Great! Check out your summary',
            //     trigger: 'review',
            //   },
            //   {
            //     id: 'review',
            //     component: <Review />,
            //     asMessage: true,
            //     trigger: 'update',
            //   },
            //   {
            //     id: 'update',
            //     message: 'Would you like to update some field?',
            //     trigger: 'update-question',
            //   },
            //   {
            //     id: 'update-question',
            //     options: [
            //       { value: 'yes', label: 'Yes', trigger: 'update-yes' },
            //       { value: 'no', label: 'No', trigger: 'end-message' },
            //     ],
            //   },
            //   {
            //     id: 'update-yes',
            //     message: 'What field would you like to update?',
            //     trigger: 'update-fields',
            //   },
            //   {
            //     id: 'update-fields',
            //     options: [
            //       { value: 'name', label: 'Name', trigger: 'update-name' },
            //       { value: 'gender', label: 'Gender', trigger: 'update-gender' },
            //       { value: 'age', label: 'Age', trigger: 'update-age' },
            //     ],
            //   },
            //   {
            //     id: 'update-name',
            //     update: 'name',
            //     trigger: '7',
            //   },
            //   {
            //     id: 'update-gender',
            //     update: 'gender',
            //     trigger: '7',
            //   },
            //   {
            //     id: 'update-age',
            //     update: 'age',
            //     trigger: '7',
            //   },
            //   {
            //     id: 'end-message',
            //     message: 'Thanks! Your data was submitted successfully!',
            //     end: true,
            //   },
            ]}
          />
        }
      </div>
    );
};

export default CustomerService;