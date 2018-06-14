import React, { Component } from 'react';
import './EmployeeForm.css';
import {Readout} from '../Readout/Readout.js';

export class EmployeeForm extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      annualSalary: 0,
      superannuationRate: 0,
      paymentStartDate: '',
      paymentEndDate: ''
    }
  }
  handleInput = (e) => {
    const state = this.state;
    console.log(e.currentTarget.value);
    state[e.currentTarget.name] = e.currentTarget.value;
    this.setState(state);
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.salaryConvert(this.state.annualSalary);
    this.superConvert(this.state.superannuationRate);
    console.log(this.state);
    if (this.state.firstName == false || this.state.lastName == false || this.state.annualSalary == false || this.state.superannuationRate == false || this.state.paymentStateDate == false || this.state.paymentEndDate == false){
      window.alert("Error: At least one item has an improper value.")
    }
  }
  //below function rounds annual salary to nearest whole number
  salaryConvert = (x) => {
    const state = this.state;
    state.annualSalary = Math.round(x);
    this.setState(state);
  }
  //below function ensures that super rate is 0%-12% inclusive and is saved in state as a decimal
  superConvert = (x) => {
    const state = this.state;
    let superRate = parseFloat(x);
    //below conditionals convert to decimal if super rate entered as a percent in form
    //or empty the field to throw an error if a super rate below 0% or above 12% is entered
    if (0 <= superRate && superRate <= .12){
      ;
    } else if (.12 < superRate && superRate <= 12){
      superRate = superRate/100;
    } else {
      superRate = '';
    }
    state.superannuationRate = superRate;
    this.setState(state);
  }
  render() {
    return (
      <div className="overall">
        <div className="formContainer">
          <form className="payslipInformation">
            <label className="payslipTidbit" id="firstPositionTidbit">First Name:</label>
            <input className="inputBox" id="firstPositionInput" type="text" name="firstName" onChange={this.handleInput}/>
            <br/>
            <label className="payslipTidbit">Last Name:</label>
            <input className="inputBox" type="text" name="lastName" onChange={this.handleInput}/>
            <br/>
            <label className="payslipTidbit">Annual Salary:</label>
            <input className="inputBox" type="number" name="annualSalary" onChange={this.handleInput}/>
            <br/>
            <label className="payslipTidbit">Super Rate:</label>
            <input className="inputBox" type="number" name="superannuationRate" onChange={this.handleInput}/>
            <br/>
            <label className="payslipTidbit">Pay Period Start:</label>
            <input className="inputBox" type="date" name="paymentStartDate" onChange={this.handleInput}/>
            <br/>
            <label className="payslipTidbit">Pay Period End:</label>
            <input className="inputBox" type="date" name="paymentEndDate" onChange={this.handleInput}/>
            <br/>
            <button className="submitButton" onClick={this.handleSubmit}>Submit</button>
          </form>
        </div>
      <Readout firstName={this.state.firstName} lastName={this.state.lastName} annualSalary={this.state.annualSalary} superannuationRate={this.state.superannuationRate} paymentStartDate={this.state.paymentStartDate} paymentEndDate={this.state.paymentEndDate}/>
    </div>
    );
  }
}