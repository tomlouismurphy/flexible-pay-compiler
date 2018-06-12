import React, { Component } from 'react';
import './EmployeeForm.css';

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
    console.log(this.state);
  }
  render() {
    return (
      <div className="formContainer">
        <form className="payslipInformation">
          <label className="payslipTidbit">First Name:</label>
          <input className="inputBox" type="text" name="firstName" onChange={this.handleInput}/>
          <br/>
          <label className="payslipTidbit">Last Name:</label>
          <input className="inputBox" type="text" name="lastName" onChange={this.handleInput}/>
          <br/>
          <label className="payslipTidbit">Annual Salary:</label>
          <input className="inputBox" type="text" name="annualSalary" onChange={this.handleInput}/>
          <br/>
          <label className="payslipTidbit">Super Rate:</label>
          <input className="inputBox" type="text" name="superannuationRate" onChange={this.handleInput}/>
          <br/>
          <label className="payslipTidbit">Pay Period Start:</label>
          <input className="inputBox" type="text" name="paymentStartDate" onChange={this.handleInput}/>
          <br/>
          <label className="payslipTidbit">Pay Period End:</label>
          <input className="inputBox" type="text" name="paymentEndDate" onChange={this.handleInput}/>
          <br/>
          <button className="submitButton" onClick={this.handleSubmit}>Submit</button>
        </form>
      </div>
    );
  }
}