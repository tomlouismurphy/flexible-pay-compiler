import React, { Component } from 'react';
import './App.css';
import {EmployeeForm} from './EmployeeForm/EmployeeForm.js';

class App extends Component {
  render() {
    return (
      <div className="container">
        <header className="main-header">
          <h1 className="classification">Payslip Generator - Australian-Based Employees</h1>
        </header>
        <p className="instruction-text">
          Please enter the relevant info in the form below and we will generate a payment form for your employee.
        </p>
        <EmployeeForm />
      </div>
    );
  }
}

export default App;