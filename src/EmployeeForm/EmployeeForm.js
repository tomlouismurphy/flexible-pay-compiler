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
  render() {
    return (
      <div>
        <p>Info goes here.</p>
      </div>
    );
  }
}