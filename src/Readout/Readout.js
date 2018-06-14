import React, { Component } from 'react';
import './Readout.css';

export class Readout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      calculationComplete: false,
      payPeriod: 0,
      grossIncome: 0,
      incomeTax: 0,
      superAmount: 0
    }
  }
  //Note: this assumes pay can be prorated, 
  //and that a person receives an equal portion of their monthly pay
  //each day of the month
  payPeriodLength = () => {
    let monthLength = 0;
    let carryoverDays = 0;
    let payPeriodDays = 0;
    let payPeriodMonths = 0;
    //below variables create arrays from start and end dates
    //where year is at position 0, month is at position 1, day is at position 2
    const paymentStartArray = this.props.paymentStartDate.split('-');
    const paymentEndArray = this.props.paymentEndDate.split('-');
    for (let i = 0; i < paymentStartArray.length; i++){
      paymentStartArray[i] = parseFloat(paymentStartArray[i]);
    }
    for (let i = 0; i < paymentEndArray.length; i++){
      paymentEndArray[i] = parseFloat(paymentEndArray[i]);
    }
    const initialMonth = paymentStartArray[1];
    const finalMonth = paymentEndArray[1];
    let daysInitialMonth = 0;
    let daysFinalMonth = 0;
    //conditionals that set amount of days in initialMonth & finalMonth
    if (initialMonth === 2 && paymentStartArray[0] % 4 !== 0){
      daysInitialMonth = 28;
    } else if (initialMonth === 2 && paymentStartArray[0] % 4 === 0) {
      daysInitialMonth = 29;
    } else if (initialMonth === 4 || initialMonth === 6 || initialMonth === 9 || initialMonth === 11){
      daysInitialMonth = 30;
    } else {
      daysInitialMonth = 31;
    }
    if (finalMonth === 2 && paymentStartArray[0] % 4 !== 0){
      daysFinalMonth = 28;
    } else if (finalMonth === 2 && paymentStartArray[0] % 4 === 0) {
      daysFinalMonth = 29;
    } else if (finalMonth === 4 || finalMonth === 6 || finalMonth === 9 || finalMonth === 11){
      daysFinalMonth = 30;
    } else {
      daysFinalMonth = 31;
    }
    console.log(paymentStartArray);
    console.log(paymentEndArray);
    console.log(daysInitialMonth);
    console.log(daysFinalMonth);
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
    if (paymentEndArray[0] > paymentStartArray[0]){
      const yearDif = paymentEndArray[0] - paymentStartArray[0];
      paymentEndArray[1] = paymentEndArray[1] + (yearDif * 12);
    }
    if (paymentEndArray[1] < paymentStartArray[1] || paymentEndArray[0] < paymentStartArray[0]){
      window.alert("Error: Please ensure your start and end dates are correct.")
    }
    //Calculations start here
    //Assuming that all pay periods are inclusive of start and end days
    //Calculation if pay period is within one calendar month
    console.log(paymentStartArray[1]);
    console.log(paymentEndArray[1]);
    if (paymentStartArray[1] === paymentEndArray[1]){
      payPeriodDays = paymentEndArray[2] - paymentStartArray[2] + 1;
      payPeriodMonths = payPeriodDays/daysInitialMonth;
      payPeriodMonths = parseFloat(payPeriodMonths.toPrecision(4));
      const state = this.state;
      state.payPeriod = payPeriodMonths;
      this.setState(state);
      console.log(this.state.payPeriod);
    }
    //Calculation if pay period covers two or more calendar months
    if (paymentEndArray[1] > paymentStartArray[1]){
      if (paymentStartArray[2] === 1){
        payPeriodDays = paymentEndArray[2];
        payPeriodMonths = (paymentEndArray[1] - paymentStartArray[1]) + payPeriodDays/daysFinalMonth;
        payPeriodMonths = parseFloat(payPeriodMonths.toPrecision(5));
        const state = this.state;
        state.payPeriod = payPeriodMonths;
        this.setState(state);
        console.log(this.state.payPeriod);
      } else {
        payPeriodDays = paymentEndArray[2];
        payPeriodMonths = (paymentEndArray[1] - paymentStartArray[1] - 1) + payPeriodDays/daysFinalMonth + carryoverDays/daysInitialMonth;
        payPeriodMonths = parseFloat(payPeriodMonths.toPrecision(5));
        const state = this.state;
        state.payPeriod = payPeriodMonths;
        this.setState(state);
        console.log(this.state.payPeriod);
      }
    }
  }
  grossCalculator = () => {
    const state = this.state;
    console.log(this.props.annualSalary);
    state.grossIncome = parseFloat((this.props.annualSalary * state.payPeriod/12).toFixed(2));
    this.setState(state);
    console.log(this.state.grossIncome);
  }
  incomeTaxCalculator = () => {
    const state = this.state;
    const salary = this.props.annualSalary;
    if (salary < 18201){
      state.incomeTax = 0;
      this.setState(state);
    } else if (salary < 37001){
      const taxableSalary = salary - 18200;
      state.incomeTax = parseFloat((taxableSalary * 0.19 * state.payPeriod/12).toFixed(2));
      this.setState(state);
    } else if (salary < 87001){
      const taxableSalary = salary - 37000;
      state.incomeTax = parseFloat(((3572 + taxableSalary * 0.325) * state.payPeriod/12).toFixed(2));
      this.setState(state);
      console.log(this.state.incomeTax);
    } else if (salary < 180001){
      const taxableSalary = salary - 87000;
      state.incomeTax = parseFloat(((19822 + taxableSalary * 0.37) * state.payPeriod/12).toFixed(2));
      this.setState(state);
    } else {
      const taxableSalary = salary - 180000;
      state.incomeTax = parseFloat(((54232 + taxableSalary * 0.45) * state.payPeriod/12).toFixed(2));
      this.setState(state);
    }
  }
  superannuationCalculator = () => {
    const state = this.state;
    state.superAmount = parseFloat((state.grossIncome * this.props.superannuationRate).toFixed(2));
    this.setState(state);
  }
  calculatePayStub = () => {
    this.payPeriodLength();
    this.grossCalculator();
    this.incomeTaxCalculator();
    this.superannuationCalculator();
    const state = this.state;
    state.calculationComplete = true;
    this.setState(state);
    console.log(this.state);
  }
  render() {
    let paystubData = this.state.payPeriod;
    return (
      <div className="read-container">
        <button onClick={this.calculatePayStub}>
        Complete Calculation
        </button>
        <p>{paystubData}</p>
      </div>
    );
  }
}