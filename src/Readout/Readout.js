import React, { Component } from 'react';
import './Readout.css';

export class Readout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      calculationComplete: false,
      payperiod: 0,
      grossIncome: '',
      incomeTax: '',
      netIncome: '',
      superAmount: ''
    }
  }
  //Note: this assumes pay can be prorated, 
  //and that a person receives an equal portion of their monthly pay
  //each day of the month
  payPeriodLength = (x) => {
    let monthLength = 0;
    let carryoverDays = 0;
    let payPeriodDays = 0;
    let payPeriodMonths = 0;
    const paymentStartArray = this.props.paymentStartDate.split('-');
    const paymentEndArray = this.props.paymentEndDate.split('-');
    const initialMonth = paymentStartArray[1];
    let daysInitialMonth = 0;
    //conditional that sets amount of days in initialMonth
    if (initialMonth === 2 && paymentStartArray[0] % 4 !== 0){
      daysInitialMonth = 28;
    } else if (initialMonth === 2 && paymentStartArray[0] % 4 === 0) {
      daysInitialMonth = 29;
    } else if (initialMonth === 4 || initialMonth === 6 || initialMonth === 9 || initialMonth === 11){
      daysInitialMonth = 30;
    } else {
      daysInitialMonth = 31;
    }
    for (let i = 0; i < paymentStartArray.length; i++){
      paymentStartArray[i] = parseInt(paymentStartArray[i]);
    }
    for (let i = 0; i < paymentEndArray.length; i++){
      paymentEndArray[i] = parseInt(paymentEndArray[i]);
    }
    console.log(paymentStartArray);
    console.log(paymentEndArray);
    //conditional to test if pay period spans more than one calendar month
    if (paymentStartArray[2] !== 1 && paymentStartArray[1] !== paymentEndArray[1]){
      if (paymentStartArray[1] === 2 && paymentStartArray[0] % 4 !== 0){
        carryoverDays = 29 - paymentStartArray[2];
      } else if (paymentStartArray[1] === 2 && paymentStartArray[0] % 4 === 0) {
        carryoverDays = 30 - paymentStartArray[2];
      } else if (paymentStartArray[1] === 4 || paymentStartArray[1] === 6 || paymentStartArray[1] === 9 || paymentStartArray[1] === 11){
        carryoverDays = 31 - paymentStartArray[2];
      } else {
        carryoverDays = 32 - paymentStartArray[2];
      }
    }
    //if pay period spans multiple years
    //mutates end date data so that we can calculate
    //total number of months that are spanned
    if (paymentEndArray > paymentStartArray){
      const yearDif = paymentEndArray - paymentStartArray;
      paymentEndArray[1] = paymentEndArray[1] + (yearDif * 12);
    }
    if (paymentEndArray[1] < paymentStartArray[1] || paymentEndArray[0] < paymentStartArray[0] || paymentEndArray[2] < paymentStartArray[2]){
      window.alert("Error: Please ensure your start and end dates are correct.")
    }
    //Calculations start here
    //Calculation if pay period is within one calendar month
    if (paymentStartArray[1] === paymentEndArray[1]){
      payPeriodDays = paymentEndArray[2] - paymentStartArray[2];
      payPeriodMonths = payPeriodDays/daysInitialMonth;
      payPeriodMonths = parseFloat(payPeriodMonths.toPrecision(4));
    }
  }
  grossCalculator = () => {

  }
  render() {
    return (
      <button className="test" onClick={this.payPeriodLength}>
      Placeholder.
      </button>
    );
  }
}