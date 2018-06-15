import Readout from './Readout.js';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16'
import { configure } from 'enzyme';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';

test('super rate rounds correctly', () => {
	let grossIncome = Math.round(Math.random()*40000);
	let superannuationRate = parseFloat((Math.random()*.12).toFixed(2));
	let superAmount = grossIncome * superannuationRate;
	expect((superAmount * 100) % 1).toBe(0);
})

test('income tax calculator', () => {
	const salary = Math.round(Math.random()*1000000);
	let incomeTax = 0;
    if (salary < 18201){
      ;
    } else if (salary < 37001){
      const taxableSalary = salary - 18200;
      incomeTax = taxableSalary * 0.19;
    } else if (salary < 87001){
      const taxableSalary = salary - 37000;
      incomeTax = 3572 + taxableSalary * 0.325
    } else if (salary < 180001){
      const taxableSalary = salary - 87000;
      incomeTax = 19822 + taxableSalary * 0.37;
    } else {
      const taxableSalary = salary - 180000;
      incomeTax = 54232 + taxableSalary * 0.45;
    }
    expect(incomeTax).toBeLessThan(salary/2);
})